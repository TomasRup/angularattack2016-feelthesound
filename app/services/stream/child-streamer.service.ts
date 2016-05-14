import { Injectable } from '@angular/core';

@Injectable()
export class ChildStreamService {

    private static BUFFER_SIZE: number = 4096;

    private webSocket: WebSocket = undefined;
    private currentStream = undefined;
    private ended: Boolean = false;
    private isStarted: Boolean = false;
    private id: String
    private audioContext: any;
    private navigator: any;
    private recorder: any;

    constructor() {
        var n = <any> navigator;
        n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
        this.audioContext = new AudioContext();
        this.navigator = n;
    }

    getIsStarted() {
      return this.isStarted;
    }

    start(id: String, callback: Function) {
       if (!this.isStarted) {
         this.isStarted = true;

         this.webSocket = new WebSocket(`wss://stark-river-37161.herokuapp.com/streams/${id}`);
         //this.webSocket = new WebSocket(`ws://localhost:8080/streams/${id}`);
         this.webSocket.onerror = this.onWebsocketError;
         this.webSocket.onopen = () => {
            callback();
            this.navigator.getUserMedia({audio: true}, this.initRecorder(), this.errorCallback);
         }
      }
    }

    stop() {
      if (this.isStarted) {
        if (!this.currentStream) return;
        this.currentStream.getTracks()[0].stop();
        this.webSocket.close()
        this.isStarted = false;
      }
    }

    private initRecorder() {
        let instance = this;
        return (stream) => {
            instance.currentStream = stream;
            instance.currentStream.addEventListener('ended', function() {
                instance.isStarted = false;
            });

            var audioInput = instance.audioContext.createMediaStreamSource(stream);
            instance.recorder = instance.audioContext.createScriptProcessor(ChildStreamService.BUFFER_SIZE, 1, 1);
            audioInput.connect(instance.recorder);
            instance.recorder.onaudioprocess = instance.recorderProcess();
            instance.recorder.connect(instance.audioContext.destination);
        }
    }

    private recorderProcess() {
        let instance = this;
        return (e) => {
            if (instance.isStarted) {
              var left = e.inputBuffer.getChannelData(0);
              var data = left;
              console.log('sending', data);
              instance.webSocket.send(data);
              console.log('done');
          }
        }
    }

    private errorCallback(error) {
        console.log(error);
    }

    private onWebsocketError(error) {
        console.log(error);
    }
}
