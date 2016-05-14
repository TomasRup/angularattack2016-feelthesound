import { bootstrap }    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { GlobalsService } from './services/common/globals.service';
import { ListenService } from './services/listen/listen.service';
import { AppComponent } from './app.component';


bootstrap(AppComponent, [
    ROUTER_PROVIDERS, 
    GlobalsService,
    ListenService]);
