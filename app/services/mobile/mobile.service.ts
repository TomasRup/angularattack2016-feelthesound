import { Injectable } from '@angular/core';
import { GlobalsService } from '../common/globals.service';

@Injectable()
export class MobileService {
    
    constructor(
        private globalsService: GlobalsService) {
    }
    
    vibratePhone(pattern) {
        window.navigator.vibrate(pattern);
    }
    
    playSound(data) {
        var array = new Float32Array(data);
        var audioBuffer = this.globalsService.getAudioContext().createBuffer(1, array.length + 1, 44100);
        var source = this.globalsService.getAudioContext().createBufferSource();
        audioBuffer.getChannelData(0).set(array);
        source.buffer = audioBuffer;
        source.connect(this.globalsService.getAudioContext().destination);
        source.start(0);
    }
}