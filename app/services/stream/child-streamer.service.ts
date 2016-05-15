import { Injectable } from '@angular/core';
import { GlobalsService } from '../common/globals.service';
import { ApiService } from '../common/api.service';
import { Observable }     from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

export class StreamerState {
    subscriberId: string;
    listenerCount: number;
    subscriberSessionId: string;
}

@Injectable()
export class ChildStreamService {

    private static BUFFER_SIZE: number = 4096;

    private webSocket: WebSocket = undefined;
    private currentStream = undefined;
    private ended: Boolean = false;
    public subscriptionId: string;
    public streamerState: StreamerState;
    private id: String
    private recorder: any;


    constructor(
        private globalsService: GlobalsService,
        private apiService: ApiService) {

        this.apiService.getEvents().map(event => this.streamerState = event).subscribe();
        var n = <any> navigator;
        n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
    }

    toStreamerState(json: any): StreamerState {
        return json;
    }

    getIsStarted(): boolean {
        return !!this.subscriptionId;
    }

    start(id: string, callback: Function) {
        if (!this.getIsStarted()) {
            this.streamerState = undefined;
            this.subscriptionId = id;
            this.webSocket = new WebSocket(`${GlobalsService.WS_URL}/streams/${id}`);
            this.webSocket.onerror = this.onWebsocketError;
            this.webSocket.onopen = () => {
                this.apiService.start(id);
                this.globalsService.getNavigator().getUserMedia({audio: true}, this.initRecorder(), this.errorCallback);
                callback();
            }
      }
    }

    stop() {
      this.currentStream && this.currentStream.getTracks()[0].stop();
      this.webSocket && this.webSocket.close()
      this.apiService.stop();
      this.subscriptionId = undefined;
    }

    private initRecorder() {
        let instance = this;
        return (stream) => {
            instance.currentStream = stream;

            var audioInput = instance.globalsService.getAudioContext().createMediaStreamSource(stream);
            instance.recorder = instance.globalsService.getAudioContext().createScriptProcessor(ChildStreamService.BUFFER_SIZE, 1, 1);
            audioInput.connect(instance.recorder);
            instance.recorder.onaudioprocess = instance.recorderProcess();
            instance.recorder.connect(instance.globalsService.getAudioContext().destination);
        }
    }

    private recorderProcess() {
        let instance = this;
        return (e) => {
            if (instance.getIsStarted()) {
              var left = e.inputBuffer.getChannelData(0);
              var data = left;
              //console.log('sending', data);
              instance.webSocket.send(data);
              //console.log('done');
          }
        }
    }

    private errorCallback(error) {
        this.stop();
        console.log(error);
        throw new Error(error);
    }

    private onWebsocketError(error) {
        this.stop();
        console.log(error);
        throw new Error(error);
    }

    private handleHttpError (error: any) {
        this.stop();
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
