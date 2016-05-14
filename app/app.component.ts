import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { ModeSelection } from './modeselection/modeselection.component'

@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/modeselection', component: ModeSelection}
])
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/modeselection']);
  }
}