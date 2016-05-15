import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

//    public static WS_URL = "ws://localhost:8080";
//    public static HTTP_URL = "http://localhost:8080"

    public static WS_URL = "wss://stark-river-37161.herokuapp.com";
    public static HTTP_URL = "https://stark-river-37161.herokuapp.com"

    private audioContext: any;
    private navigator: any;

    constructor() {
        var n = <any> navigator;
        this.navigator = n;
        this.navigator.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia;
        this.audioContext = new AudioContext();
    }

    getAudioContext() {
        return this.audioContext;
    }

    getNavigator() {
        return this.navigator;
    }
}
