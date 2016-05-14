import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="mode-container">
        <div class="header">Parent mode</div>
        <div class="content">
            <button (click)="alert()">Lol</button>
        </div>
        <div class="footer"><a [routerLink]="['/modeselection']">Back</a></div>
    </div>
    `
})
export class ParentMode implements OnInit {
    n = <any>navigator;
    
    alert() {
        this.n.vibrate(1000);
    }
    
    ngOnInit() {
        this.n.vibrate = this.n.vibrate || this.n.webkitVibrate || this.n.mozVibrate || this.n.msVibrate;
    }
}