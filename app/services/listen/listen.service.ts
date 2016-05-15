import { Injectable, EventEmitter } from '@angular/core';
import { GlobalsService } from '../common/globals.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ListenService {
    private webSocket: WebSocket;
    subscriptionId: string;

    constructor() {
        console.log('created');
    }

    stop() {
        this.webSocket.close();
        this.subscriptionId = undefined;
    }

    start(subscriptionId: string, onConnected: Function, onData: Function) {
        this.subscriptionId = subscriptionId;
        this.webSocket = new WebSocket(`${GlobalsService.WS_URL}/listeners/` + subscriptionId);
        this.webSocket.binaryType = "arraybuffer";

        var self = this;
        this.webSocket.onopen = () => onConnected(event);
        this.webSocket.onmessage = function(event) {
            onData(new Float32Array(event.data));
        }
        this.webSocket.onerror = (event) => {
            console.log('error');
        }
    }

    getIsStarted() {
        return !!this.subscriptionId;
    }
}
