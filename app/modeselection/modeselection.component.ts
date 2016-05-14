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
    `
})
export class ModeSelection {}