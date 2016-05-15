import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ChildStreamService } from '../services/stream/child-streamer.service';


@Component({
  providers: [ChildStreamService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="uk-grid" data-uk-scrollspy="{cls:'uk-animation-fade'}">
        <div class="uk-width-large-1-1 uk-visible-large">
        <div class="uk-text-large">Child mode</div><br>
            <div class="uk-text-small">Some explanation here</div><br>       
            <form class="uk-form">
                <input class="uk-form-width-medium" [ngClass]="{disabled: entryDisabled}" type="text" placeholder="Enter Subscription ID" [disabled]="entryDisabled" [(ngModel)]="subscriptionId">
                <button class="uk-button" [ngClass]="{'uk-button-danger': service.getIsStarted()}" (click)="toggleStreaming()"><i *ngIf="toggleInProgress" class="uk-icon-spinner uk-icon-spin"></i> {{streamingButtonText}}</button>
            </form>
        </div>
    </div>
    <div class="uk-grid">
        <a class="uk-button-link" [routerLink]="['/modeselectionmultipledevices']"><i class="uk-icon-arrow-left"></i> Back</a>
    </div>
    `
})
export class ChildMode {
    private subscriptionId: string = '';
    private entryDisabled: boolean = false;
    private streamingButtonText: string = 'Start capturing sounds';
    private toggleInProgress: boolean = false;

    constructor(private service: ChildStreamService) {
        // TODO: Auto toggle based on url
    }

    toggleStreaming() {
        this.toggleInProgress = true;
        this.streamingButtonText = 'Loading';
        this.entryDisabled = true;

        if (this.service.getIsStarted()) {
            this.service.stop();
            this.toggleInProgress = false;
            this.streamingButtonText = 'Start capturing sounds';
            this.entryDisabled = false;
            
        } else {
            var self = this;
            this.service.start(this.subscriptionId, () => {
                self.toggleInProgress = false;
                self.streamingButtonText = 'Stop capturing sounds'
                self.entryDisabled = true;
            });
        }
    }
}
