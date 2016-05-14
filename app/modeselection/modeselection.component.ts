import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav>
      <a [routerLink]="['/child']" class="selection-button">Child Device</a>
      <a [routerLink]="['/parent']" class="selection-button">Parent Device</a>
      <a [routerLink]="['/singledevice']" class="selection-button">Single Device</a>
    </nav>
    <div class="explanatory-text">
        Feel the Sound helps parents stay closer to their sleeping children.<br>
        The app monitors the sound around a device put near a baby and broadcasts it to another one. If a child starts crying, the parent device will flash and vibrate (this helps people with hearing impairments).
    </div>
    `
})
export class ModeSelection {}