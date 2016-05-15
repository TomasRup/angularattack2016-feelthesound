import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ListenService } from '../services/listen/listen.service';
import { MobileService } from '../services/mobile/mobile.service';
import { VoiceRecognitionService } from '../services/voice/voicerecognition.service';


@Component({
  providers: [ListenService, MobileService, VoiceRecognitionService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="mode-container">
        <div class="header">Parent mode</div>
        <div class="content">
            <input [ngClass]="{disabled: entryDisabled}" type="text" placeholder="Subscription ID" [disabled]="entryDisabled" [(ngModel)]="subscriptionId">
            <button [ngClass]="{unsubscribed: listenService.getIsStarted(), subscribed: !listenService.getIsStarted()}" (click)="toggleSubscribing()">{{subscribingButtonText}}</button>
        </div>
        <div class="footer"><a [routerLink]="['/modeselection']">Back</a></div>
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
                
                if (self.voiceRecognitionService.isBabyCrying(event.data)) { // TODO: make it work
                    this.mobileService.vibratePhone([100]);
                }   
            });
        }
    }
}