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
            <form class="uk-form">
                <div class="uk-form-row uk-text-bold">
                    <h3 class="uk-panel-title uk-text-primary">Parent Device</h3>
                    Listen to your child by entering same subscription id as in child's device. 
                </div>
                <div class="uk-form-row">
                    <input class="uk-form-width-medium" [ngClass]="{disabled: entryDisabled}" type="text" placeholder="Enter Subscription ID" [disabled]="entryDisabled" [(ngModel)]="subscriptionId">
                </div>
                <div class="uk-form-row">
                    <button class="uk-button" [ngClass]="{'uk-button-danger': listenService.getIsStarted()}" (click)="toggleSubscribing()">
                        <i *ngIf="toggleInProgress" class="uk-icon-spinner uk-icon-spin"></i>
                        <i *ngIf="!toggleInProgress && listenService.getIsStarted()" class="uk-icon-stop-circle-o"></i> 
                        <i *ngIf="!toggleInProgress && !listenService.getIsStarted()" class="uk-icon-play-circle-o"></i> 
                        &nbsp;{{subscribingButtonText}}
                    </button>
                </div>
                <div class="uk-form-row">
                    <select [(ngModel)]="sensitivity">
                        <option *ngFor="let o of sensitivityOptions" [value]="o">{{o*100}} %</option>
                    </select>
                    <label for="sensitivity">Detection sensitivity</label>
                </div>
                <div class="uk-form-row">
                    <label>
                        <input type="checkbox" [(ngModel)]="mute">
                        Disable sound output, only vibrate you phone if baby cry is detected.
                    </label>
                </div>
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
    private mute: boolean = false;
    private sensitivity = 0.75;
    private sensitivityOptions = [0.00, 0.10, 0.25, 0.50, 0.75, 0.85, 0.95, 0.98, 1.0];

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
                
                if (!self.mute) {
                    self.mobileService.playSound(data);
                }

                if (self.voiceRecognitionService.isBabyCrying(data, self.sensitivity)) {
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
