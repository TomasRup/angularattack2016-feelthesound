import { Injectable } from '@angular/core';

@Injectable()
export class VoiceService {
    
    audioContext;
    
    constructor() {
        this.audioContext = new AudioContext();
    }
    
    listen(analyser, interval: number) {
        this.shutdown();
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
            }, null, null);
    }
    
    shutdown() {
        
    }
    
    private getUserMedia(dictionary, callback, errorCallback) {
        var n = <any> navigator;
        var userMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
        userMedia(dictionary, callback, errorCallback);
    }
    

    private gotStream(stream) {
        console.log('gotStream');

        var mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
        var analyser = this.audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.minD
        mediaStreamSource.connect( analyser );

        var bufferLength = analyser.frequencyBinCount;
        console.log('bufferLenght: ' + bufferLength);
        var buffer = new Uint8Array(bufferLength);


    }
}