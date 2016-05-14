import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav>
      <a [routerLink]="['/child']" class="selection-button">Child</a>
      <a [routerLink]="['/parent']" class="selection-button">Parent</a>
    </nav>
    `
})
export class ModeSelection {}