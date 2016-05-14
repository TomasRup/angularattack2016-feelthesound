import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { StreamService } from '../services/stream/stream.service';


@Component({
  providers: [StreamService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="mode-container">
        <div class="header">Child mode</div>
        <div class="content">
            <button [ngClass]="{unsubscribed: streamingToggledOn, subscribed: !streamingToggledOn}" (click)="toggleStreaming()">{{streamingButtonText}}</button>
        </div>
        <div class="footer"><a [routerLink]="['/modeselection']">Back</a></div>
    </div>
    `
})
export class ChildMode {
    private streamingToggledOn: boolean = false;
    private streamingButtonText: string = 'Start streaming';
    
    constructor(private streamService: StreamService) {}
    
    toggleStreaming() {
        if (!this.streamingToggledOn) { 
            this.streamService.start();
            this.streamingButtonText = 'Mute the stream';
        } else { 
            this.streamService.stop();
            this.streamingButtonText = 'Start streaming again';
        }
        
        this.streamingToggledOn = !this.streamingToggledOn;
    }
}