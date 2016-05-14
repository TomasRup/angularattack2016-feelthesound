import { Injectable } from '@angular/core';
import { GlobalsService } from '../common/globals.service';

@Injectable()
export class ListenService {
    private webSocket: WebSocket;
    
    constructor(private globalsService: GlobalsService) {
    }
    
    start(subscriptionId: string) {
        this.webSocket = new WebSocket('wss://stark-river-37161.herokuapp.com/listeners/' + subscriptionId);
        this.webSocket.binaryType = "arraybuffer";
        this.globalsService.getAudioContext();
    
        this.webSocket.onmessage = function(event) {
            console.log(event);
            this.playSound(event.data);
        }
    }
    
    private playSound(data) {
        var array = new Float32Array(data);
        var audioBuffer = this.globalsService.getAudioContext().createBuffer(1, array.length + 1, 44100);
        var source = this.globalsService.getAudioContext().createBufferSource();
        audioBuffer.getChannelData(0).set(array);
        source.buffer = audioBuffer;
        source.connect(this.globalsService.getAudioContext().destination);
        source.start(0);
    }
}