import { Injectable, EventEmitter } from '@angular/core';
import { GlobalsService } from '../common/globals.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ApiService {

    private webSocket: WebSocket;
    private eventsObserver: Observer<any>;
    private subject = new EventEmitter<any>();

    getEvents(): Observable<any> {
        return this.subject;
    }

    start(id: string) {
        this.stop();
        this.webSocket = new WebSocket(`${GlobalsService.WS_URL}/api/${id}`);
        this.webSocket.onmessage = (event) => {
            let json = JSON.parse(event.data);
            console.log(json, 'next')
            this.subject.emit(json);
            console.log('emitted');
        }
    }

    stop() {
        if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = undefined;
        }
    }
}
