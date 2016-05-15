import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ListenService } from '../services/listen/listen.service';
import { MobileService } from '../services/mobile/mobile.service';
import { VoiceRecognitionService } from '../services/voice/voicerecognition.service';


@Component({
  providers: [ListenService, MobileService, VoiceRecognitionService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="uk-grid" data-uk-scrollspy="{cls:'uk-animation-fade'}">
        <div class="uk-width-large-1-1 uk-visible-large">
        <div class="uk-text-large">Parent mode</div><br>
            <div class="uk-text-small">Some explanation here</div><br>       
            <form class="uk-form">
                <input class="uk-form-width-medium" [ngClass]="{disabled: entryDisabled}" type="text" placeholder="Enter Subscription ID" [disabled]="entryDisabled" [(ngModel)]="subscriptionId">
                <button class="uk-button" [ngClass]="{'uk-button-danger': listenService.getIsStarted()}" (click)="toggleSubscribing()"><i *ngIf="toggleInProgress" class="uk-icon-spinner uk-icon-spin"></i> {{subscribingButtonText}}</button>
            </form>
        </div>
    </div>
    <div class="uk-grid">
        <a class="uk-button-link" [routerLink]="['/modeselectionmultipledevices']"><i class="uk-icon-arrow-left"></i> Back</a>
    </div>
    `
})
export class ParentMode {
    private subscriptionId: string = '';
    private entryDisabled: boolean = false;
    private subscribingButtonText: string = 'Start listening';
    private toggleInProgress: boolean = false;
    
    constructor(
        private listenService: ListenService,
        private mobileService: MobileService,
        private voiceRecognitionService: VoiceRecognitionService) {}
    
    toggleSubscribing() {
        this.toggleInProgress = true;
        this.subscribingButtonText = 'Loading...';
        this.entryDisabled = true;
        
        if (this.listenService.getIsStarted()) {
            this.subscribingButtonText = 'Start listening';
            this.entryDisabled = false;
            this.listenService.stop();
            this.toggleInProgress = false;
            
        } else {
            this.entryDisabled = true;
            
            var self = this;
            this.listenService.start(this.subscriptionId, (event) => {
                this.subscribingButtonText = 'Stop listening';
                this.toggleInProgress = false;
                
                self.mobileService.playSound(event.data);
                
                if (self.voiceRecognitionService.isBabyCrying(new Float32Array(event.data))) { // TODO: make it work
                    this.mobileService.vibratePhone([100]);
                }   
            });
        }
    }
}