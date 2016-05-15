import { Injectable } from '@angular/core';
import { GlobalsService } from '../common/globals.service';


@Injectable()
export class ListenService {
    private webSocket: WebSocket;
    private isStarted: boolean = false;

    stop() {
        this.webSocket.close();
        this.isStarted = false;
    }

    start(subscriptionId: string, callback: Function) {
        this.isStarted = true;
        this.webSocket = new WebSocket(`${GlobalsService.WS_URL}/listeners/` + subscriptionId);
        this.webSocket.binaryType = "arraybuffer";

        var self = this;
        this.webSocket.onmessage = function(event) {
            callback(event);
        }
    }
    
    getIsStarted() {
        return this.isStarted;
    }
}
