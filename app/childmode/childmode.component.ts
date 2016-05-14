import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ChildStreamService } from '../services/stream/child-streamer.service';


@Component({
  providers: [ChildStreamService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="mode-container">
        <div class="header">Child mode</div>
        <div class="content">
            <button [ngClass]="{unsubscribed: service.getIsStarted(), subscribed: !service.getIsStarted()}"
                    (click)="toggleStreaming()">{{streamingButtonText}}</button>
            <button>Disconnect all connected parents</button>
        </div>
        <div class="footer"><a [routerLink]="['/modeselection']">Back</a></div>
    </div>
    `
})
export class ChildMode {
    private streamingToggledOn: boolean = false;
    private streamingButtonText: string = 'Start capturing sounds';
    private toggleInProgress: boolean = false;

    constructor(private service: ChildStreamService) {
        //TODO Auto toggle based on url
    }

    toggleStreaming() {
        this.startToggle();
        if (this.service.getIsStarted()) {
            this.service.stop();
            this.finishedToggle('Start capturing sounds')
        } else {
            this.service.start("testStream", () => this.finishedToggle('Stop capturing sounds'));
        }
    }

    private startToggle() {
        this.toggleInProgress = true;
        this.streamingButtonText = 'Loading....'
    }

    private finishedToggle(buttonText: string) {
        this.toggleInProgress = false;
        this.streamingButtonText = buttonText;
    }
}
