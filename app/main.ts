import { bootstrap }    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { provide } from '@angular/core';
import { GlobalsService } from './services/common/globals.service';
import { ApiService } from './services/common/api.service';
import { ListenService } from './services/listen/listen.service';
import { AppComponent } from './app.component';

enableProdMode();
bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy,
         {useClass: HashLocationStrategy}),
    GlobalsService,
    ListenService,
    ApiService]);
