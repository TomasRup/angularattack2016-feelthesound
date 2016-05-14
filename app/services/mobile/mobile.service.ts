import { Injectable } from '@angular/core';

@Injectable()
export class MobileService {
    
    vibratePhone(pattern) {
        window.navigator.vibrate(pattern);
    }

}