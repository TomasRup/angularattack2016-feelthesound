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
            <button (click) ="listen()" >listen</button>
            <button (click) ="shutdown()" >stop listening</button>
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
    constructor(private voiceService: VoiceService) {
        
    }
    
    listen() {
        var self = this;
        if (!this.voiceService.isListening()) {
            this.canvas = document.getElementById("canvas");
            this.voiceService.listen((data) => {
                self.visualiseVoice(data, 400, 200, false);        
            }, this.handleListenError, 200);
        }
    }

    shutdown() {
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
        var v = data[i] / 128;
        var y = v * height / 2;
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
        console.error('Failed to start listener');
        console.error(error);
    }
}