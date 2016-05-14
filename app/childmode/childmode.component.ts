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
            <button (click)="startStreaming()">Start streaming</button>
        </div>
        <div class="footer"><a [routerLink]="['/modeselection']">Back</a></div>
    </div>
    `
})
export class ChildMode {
    constructor(private streamService: StreamService) {}
    
    startStreaming() {
        this.streamService.start();
    }
}