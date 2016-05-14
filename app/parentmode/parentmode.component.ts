import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ListenService } from '../services/listen/listen.service';


@Component({
  providers: [ListenService],
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="mode-container">
        <div class="header">Parent mode</div>
        <div class="content">
            <input [ngClass]="{disabled: entryDisabled}" type="text" placeholder="Subscription ID" [disabled]="entryDisabled" [(ngModel)]="subscriptionId">
            <button [ngClass]="{unsubscribed: subscribingToggledOn, subscribed: !subscribingToggledOn}" (click)="toggleSubscribing()">{{subscribingButtonText}}</button>
        </div>
        <div class="footer"><a [routerLink]="['/modeselection']">Back</a></div>
    </div>
    `
})
export class ParentMode implements OnInit {
    subscriptionId: string = '';
    entryDisabled: boolean = false;
    subscribingButtonText: string = 'Start listening';
    subscribingToggledOn: boolean = false;
    n = <any>navigator;
    
    constructor(private listenService: ListenService) {}
    
    toggleSubscribing() {
        if (this.subscribingToggledOn) {
            this.subscribingButtonText = 'Start listening';
            this.entryDisabled = false;
            this.listenService.stop();
        } else {
            this.subscribingButtonText = 'Stop listening';
            this.entryDisabled = true;
            this.listenService.start(this.subscriptionId)
        }
        
        this.subscribingToggledOn = !this.subscribingToggledOn;
    }
    
    alert() {
        this.n.vibrate(1000);
    }
    
    ngOnInit() {
        this.n.vibrate = this.n.vibrate || this.n.webkitVibrate || this.n.mozVibrate || this.n.msVibrate;
    }
}