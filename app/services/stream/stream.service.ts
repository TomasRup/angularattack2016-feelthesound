import { Injectable } from '@angular/core';

@Injectable()
export class StreamService {

    webSocket: WebSocket = undefined;
    currentStream = undefined;
    ended: Boolean = false;
    
    start() {
       this.ended = false;
       this.webSocket = new WebSocket('ws://localhost:8080/hello');
       this.webSocket.binaryType = 'arraybuffer';
       this.webSocket.onopen = this.initWebSocket;
    }
    
    stop() {
        if (!this.currentStream) return;
        this.currentStream.getTracks()[0].stop();
    }
    
    private initWebSocket() {
        var n = <any> navigator;
        n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
        n.getUserMedia({audio: true}, this.initRecorder, this.errorCallback);
    }
    
    private initRecorder(stream) {
        this.currentStream = stream;
        this.currentStream.addEventListener('ended', function() { 
            this.ended = true;
        });

        let audioContext = new AudioContext();
        let sampleRate = audioContext.sampleRate;
        var audioInput = audioContext.createMediaStreamSource(stream);

        var bufferSize = 16384;
        var recorder = audioContext.createScriptProcessor(bufferSize, 1, 1);
        recorder.onaudioprocess = this.recorderProcess;
        audioInput.connect(recorder);
        recorder.connect(audioContext.destination);
    }
    
    private recorderProcess(e) {
        if (this.ended) return;
        var left = e.inputBuffer.getChannelData(0);
        var data = left;
        this.webSocket.send(data);
    }
    
    private errorCallback(error) {
        console.log(error);
    }
}