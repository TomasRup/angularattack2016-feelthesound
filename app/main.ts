import { bootstrap }    from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { GlobalsService} from './services/common/globals.service'
import { AppComponent } from './app.component';


bootstrap(AppComponent, [ROUTER_PROVIDERS, GlobalsService]);
