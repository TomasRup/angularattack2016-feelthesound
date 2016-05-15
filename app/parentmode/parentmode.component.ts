import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import { ListenService } from '../services/listen/listen.service';
import { MobileService } from '../services/mobile/mobile.service';
import { VoiceRecognitionService } from '../services/voice/voicerecognition.service';


@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="uk-grid" data-uk-scrollspy="{cls:'uk-animation-fade'}">
        <div class="uk-width-large-1-1">
            <div class="uk-text-large">Parent mode</div><br>
            <div class="uk-text-small">Some explanation here</div><br>
            <form class="uk-form">
                <input class="uk-form-width-medium" [ngClass]="{disabled: entryDisabled}" type="text" placeholder="Enter Subscription ID" [disabled]="entryDisabled" [(ngModel)]="subscriptionId">
                <button class="uk-button" [ngClass]="{'uk-button-danger': listenService.getIsStarted()}" (click)="toggleSubscribing()"><i *ngIf="toggleInProgress" class="uk-icon-spinner uk-icon-spin"></i> {{subscribingButtonText}}</button>
            </form>
        </div>
    </div>
    <div class="uk-grid uk-align-center">
        <a class="uk-button-link" [routerLink]="['/modeselectionmultipledevices']"><i class="uk-icon-arrow-left"></i> Back</a>
    </div>
    `
})
@Routes([
  {path: '/parent', component: ParentMode},
])
export class ParentMode {
    private subscriptionId: string;
    private entryDisabled: boolean = false;
    private subscribingButtonText: string = 'Start listening';
    private toggleInProgress: boolean = false;

    constructor(
        private listenService: ListenService,
        private mobileService: MobileService,
        private voiceRecognitionService: VoiceRecognitionService) {

        this.subscriptionId = listenService.subscriptionId;    
        this.setViewState();
        }

    toggleSubscribing() {
        this.toggleInProgress = true;
        this.setViewState();

        if (this.listenService.getIsStarted()) {
            this.listenService.stop();
            this.toggleInProgress = false;
            this.setViewState();
        } else {
            var self = this;
            this.listenService.start(this.subscriptionId, () => {
                self.toggleInProgress = false;
                self.setViewState();
            }, data => {
                self.mobileService.playSound(data);

                if (self.voiceRecognitionService.isBabyCrying(data)) { // TODO: make it work
                    self.mobileService.vibratePhone([100]);
                }
            });
        }
    }


    setViewState() {
        if (this.toggleInProgress) {
            this.subscribingButtonText = 'Loading...';
            this.entryDisabled = true;
        } else if (this.listenService.getIsStarted()) {
            this.entryDisabled = true;
            this.subscribingButtonText = 'Stop listening';
        } else {
            this.subscribingButtonText = 'Start listening';
            this.entryDisabled = false;
        }
    }
}
