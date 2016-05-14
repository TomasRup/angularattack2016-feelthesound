import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  directives: [ROUTER_DIRECTIVES],
  template: `
    <nav>
      <a [routerLink]="['/child']">Child</a>
      <a [routerLink]="['/parent']">Parent</a>
    </nav>
    `
})
export class ModeSelection {}