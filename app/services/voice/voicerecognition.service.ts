import { Injectable } from '@angular/core';

@Injectable()
export class VoiceRecognitionService {
    
    isBabyCrying(buffer) { //TODO: implement more sophisticated cry detection
        
        var sum = 0;
        var max = -128;
        var min = 128;
        for(var i in buffer) {
            sum += buffer[i];
            if (buffer[i] > max) {
                max = buffer[i];
            }
            if (buffer[i] < min) {
                min = buffer[i];
            }
        }
        var mean = sum / buffer.length;
        
        sum = 0;
        for(var i in buffer) {
            sum += (buffer[i] - mean) * (buffer[i] - mean);
        }

        var amplitude = (max - min);
        var deviation = Math.sqrt(sum / buffer.length);
        var ratio = deviation / (amplitude + 1);
        var crying = ratio > 0.1 && amplitude > 50;

        return crying;
    }
}