import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class VoiceService {
    
    listening: boolean;
    timerSubscription;
    audioContext;
    mediaStreamSource;
    stream;
    
    constructor() {
        this.audioContext = new AudioContext();
    }
    
    isListening() {
        return this.listening;
    }
    
    listen(processor, errorHandler, period: number) {
        if (this.listening) {
            this.shutdown();
        }
        this.getUserMedia(
            {
                "audio": {
                    "mandatory": {
                        "googEchoCancellation": "false",
                        "googAutoGainControl": "false",
                        "googNoiseSuppression": "false",
                        "googHighpassFilter": "false"
                    },
                    "optional": []
                },
            }, (stream) => {
                this.gotStream(stream, processor, period);
            }, errorHandler);
        this.listening = true;
    }
    
    shutdown() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }
        if (this.mediaStreamSource) {
            this.mediaStreamSource.disconnect();
            this.mediaStreamSource = null;
        }
        if (this.stream) {
            this.stream.getTracks()[0].stop();
            this.stream = null;
        }
        this.listening = false;
    }
    
    private getUserMedia(dictionary, callback, errorCallback) {
        var n = <any> navigator;
        var userMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
        userMedia.call(n, dictionary, callback, errorCallback);
    }
    

    private gotStream(stream, processor, period) {
        this.stream = stream;
        this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
        var analyser = this.audioContext.createAnalyser();
        analyser.fftSize = 2048;
        this.mediaStreamSource.connect( analyser );

        var bufferLength = analyser.frequencyBinCount;
        var buffer = new Uint8Array(bufferLength);
        
        let timer = Observable.timer(0, period);
        this.timerSubscription = timer.subscribe(() => {
            analyser.getByteTimeDomainData(buffer);
            processor(buffer);
        });
    }
}