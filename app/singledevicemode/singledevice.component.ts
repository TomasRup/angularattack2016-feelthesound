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
    
    constructor(private voiceService: VoiceService) {
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
                let crying = this.isCrying(data);
                self.visualiseVoice(data, 400, 200, crying);
                if (crying) {
                    self.vibratePhone([100]);
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
    
    private isCrying(buffer) { //TODO: implement more sophisticated cry detection
        
        var sum = 0;
        var max = -128;
        var min = 128;
        for(var i in buffer) {
            sum += buffer[i];
            if (buffer[i] > max) {
                max = buffer[i];
            }
            if (buffer[i] < min) {
                min = buffer[i];
            }
        }
        var mean = sum / buffer.length;
        
        sum = 0;
        for(var i in buffer) {
            sum += (buffer[i] - mean) * (buffer[i] - mean);
        }

        var amplitude = (max - min);
        var deviation = Math.sqrt(sum / buffer.length);
        var ratio = deviation / (amplitude + 1);
        var crying = ratio > 0.1 && amplitude > 50;

        return crying;
    }
    
    private vibratePhone(pattern) {
        window.navigator.vibrate(pattern);
    }
    
    private handleListenError(error) {
        console.error('Failed to start listener');
        console.error(error);
    }
}