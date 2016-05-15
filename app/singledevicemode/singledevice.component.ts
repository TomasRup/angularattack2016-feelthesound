import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { VoiceService } from '../services/voice/voice.service';
import { VoiceRecognitionService } from '../services/voice/voicerecognition.service';
import { MobileService } from '../services/mobile/mobile.service';


@Component({
  providers: [VoiceService, VoiceRecognitionService, MobileService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="" data-uk-scrollspy="{cls:'uk-animation-fade'}">
        <div class="header">Single device mode</div>
        <div class="content">
            <button [ngClass]="{unsubscribed: feelingToggledOn, subscribed: !feelingToggledOn}" (click)="toggleFeeling()">{{feelingButtonText}}</button>
            <div>
                <canvas id="canvas"></canvas>
            </div>
        </div>
        <div class="footer"><a (click) ="shutdown()" [routerLink]="['/modeselection']">Back</a></div>
    </div>
    `
})
export class SingleDevice {
    
    canvas;
    private feelingToggledOn: boolean = false;
    private feelingButtonText: string = 'Start feeling';    
    constructor(
        private voiceService: VoiceService, 
        private voiceRecognitionService: VoiceRecognitionService,
        private mobileService: MobileService) {        
    }
    
    toggleFeeling() {
        if (this.feelingToggledOn) {
            this.feelingButtonText = 'Start feeling';
            this.shutdown();
        } else {
            this.feelingButtonText = 'Stop feeling';
            this.listen();
        }
        this.feelingToggledOn = !this.feelingToggledOn;
   }
    
    private listen() {
        var self = this;
        if (!this.voiceService.isListening()) {
            this.canvas = document.getElementById("canvas");
            this.voiceService.listen((data) => {
                let crying = this.voiceRecognitionService.isBabyCrying(data);
                self.visualiseVoice(data, 400, 200, crying);
                if (crying) {
                    this.mobileService.vibratePhone([100]);
                }        
            }, this.handleListenError, 200);
        }
    }

   private shutdown() {
        if (this.voiceService.isListening()) {
            this.voiceService.shutdown();
        }
    }
    
    private visualiseVoice(data, width, height, crying) {           
      let canvasCtx = this.canvas.getContext("2d");
      canvasCtx.fillStyle = 'rgb(220, 220, 220)';
      canvasCtx.fillRect(0, 0, width, height);

      canvasCtx.lineWidth = 1;
      canvasCtx.strokeStyle = crying ? 'rgb(200, 0, 0)' : 'rgb(0, 200, 0)';

      canvasCtx.beginPath();

      var sliceWidth = width * 1.0 / data.length;
      var x = 0;

      for(var i = 0; i < data.length; i++) {
        var v = data[i];
        var y = height / 2 + v * height / 2;
        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(this.canvas.width, this.canvas.height/2);
      canvasCtx.stroke();
    }
    
    private handleListenError(error) {
        console.log('Failed to start listener');
        console.log(error);
    }
}