import { bootstrap }    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { enableProdMode } from '@angular/core';
import { GlobalsService } from './services/common/globals.service';
import { ListenService } from './services/listen/listen.service';
import { AppComponent } from './app.component';

enableProdMode();
bootstrap(AppComponent, [
    ROUTER_PROVIDERS, 
    GlobalsService,
    ListenService]);
