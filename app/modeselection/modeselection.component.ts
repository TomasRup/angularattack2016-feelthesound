import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <div class="uk-grid">
        <div class="uk-width-large-1-2">
            <a [routerLink]="['/singledevice']" class="uk-panel uk-panel-hover uk-text-small" data-uk-scrollspy="{cls:'uk-animation-fade'}">
                <h3 class="uk-panel-title">Single Device</h3>
                Use a single device to monitor sounds around it and vibrate accordingly. This especially suits people with hearing impairements.
            </a>
        </div>
        <div class="uk-width-large-1-2" data-uk-scrollspy="{cls:'uk-animation-fade'}">
            <a [routerLink]="['/modeselectionmultipledevices']" class="uk-panel uk-panel-hover uk-text-small">
                <h3 class="uk-panel-title">Multiple Devices</h3>
                Use one device near your child and another one near each of parents - track the sounds easily.
            </a>
        </div>
    </div>
    `
})
export class ModeSelection {}