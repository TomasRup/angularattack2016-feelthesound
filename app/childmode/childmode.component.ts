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
            <input [ngClass]="{disabled: entryDisabled}" type="text" placeholder="Enter Subscription ID" [disabled]="entryDisabled" [(value)]="subscriptionId">
            <button [ngClass]="{unsubscribed: service.getIsStarted(), subscribed: !service.getIsStarted()}"
                    (click)="toggleStreaming()">{{streamingButtonText}}</button>
        </div>
        <div class="footer"><a [routerLink]="['/modeselection']">Back</a></div>
    </div>
    `
})
export class ChildMode {
    private subscriptionId: string = '';
    private entryDisabled: boolean = false;
    private streamingToggledOn: boolean = false;
    private streamingButtonText: string = 'Start capturing sounds';
    private toggleInProgress: boolean = false;

    constructor(private service: ChildStreamService) {
        // TODO: Auto toggle based on url
    }

    toggleStreaming() {
        this.startToggle();
        if (this.service.getIsStarted()) {
            this.service.stop();
            this.finishedToggle('Start capturing sounds')
        } else {
            this.service.start(this.subscriptionId, () => this.finishedToggle('Stop capturing sounds'));
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
