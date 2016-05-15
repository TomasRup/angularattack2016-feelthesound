import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="uk-grid">
        <div class="uk-width-large-1-2" data-uk-scrollspy="{cls:'uk-animation-fade'}">
            <a [routerLink]="['/childdevice']" class="uk-panel uk-panel-hover uk-text-small">
                <h3 class="uk-panel-title">Child Device</h3>
                Use one device near your child and another one near each of parents - track the sounds easily.<br>
            </a>
        </div>
        <div class="uk-width-large-1-2">
            <a [routerLink]="['/parentdevice']" class="uk-panel uk-panel-hover uk-text-small" data-uk-scrollspy="{cls:'uk-animation-fade'}">
                <h3 class="uk-panel-title">Parent Device</h3>
                Use device near you to listen to your child.<br>
            </a>
        </div>
    </div>
    <div class="uk-grid uk-align-center">
        <a class="uk-button-link" [routerLink]="['/modeselection']"><i class="uk-icon-arrow-left"></i> Back</a>
    </div>
    `
})
export class ModeSelectionMultipleDevices {}