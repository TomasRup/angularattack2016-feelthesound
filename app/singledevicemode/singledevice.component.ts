import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { VoiceService } from '../services/voice/voice.service';


@Component({
  providers: [VoiceService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="mode-container">
        <div class="header">Single device mode</div>
        <div class="content">
            <button (click) ="toggleInput()">live input</button>
            <canvas id="canvas"></canvas>
        </div>
        <div class="footer"><a [routerLink]="['/modeselection']">Back</a></div>
    </div>
    `
})
export class SingleDevice {
       
    constructor(private voiceService: VoiceService) {
        
    }

    toggleInput() {
        console.log(this.voiceService);
    }
}