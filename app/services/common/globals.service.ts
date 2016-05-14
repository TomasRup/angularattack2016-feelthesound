import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

    private audioContext: any;
    private navigator: any;

    constructor() {
        var n = <any> navigator;
        n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
        this.audioContext = new AudioContext();
        this.navigator = n;
    }

    getAudioContext() {
        return this.audioContext;
    }

    getNavigator() {
        return this.navigator;
    }
}
