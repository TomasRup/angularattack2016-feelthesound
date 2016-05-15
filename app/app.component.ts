import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { ModeSelection } from './modeselection/modeselection.component'
import { ModeSelectionMultipleDevices } from './modeselection/modeselectionmultipledevices.component'
import { ChildMode } from './childmode/childmode.component'
import { ParentMode } from './parentmode/parentmode.component'
import { SingleDevice } from './singledevicemode/singledevice.component'


@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: "<router-outlet></router-outlet>"
})
@Routes([
  {path: '/modeselection', component: ModeSelection},
  {path: '/modeselectionmultipledevices', component: ModeSelectionMultipleDevices},
  {path: '/childdevice', component: ChildMode},
  {path: '/parentdevice', component: ParentMode},
  {path: '/singledevice', component: SingleDevice}
])
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/modeselection']);
  }
}