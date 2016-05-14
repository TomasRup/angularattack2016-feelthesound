import { Injectable } from '@angular/core';

@Injectable()
export class VoiceRecognitionService {
    
    isBabyCrying(buffer) { //TODO: implement more sophisticated cry detection
        var chunksCount = 4;
        var length = buffer.length / chunksCount;        
        var cryingSum = 0;        
        for(var chunk = 0; chunk < chunksCount; chunk++) {
            var sum = 0;
            var max = -128;
            var min = 128;
            
            for(var i = chunk * length; i < (chunk + 1) * length; i++) {
                sum += buffer[i];
                if (buffer[i] > max) {
                    max = buffer[i];
                }
                if (buffer[i] < min) {
                    min = buffer[i];
                }
            }
            var mean = sum / length;
            
            sum = 0;
            for(var i = chunk * length; i < (chunk + 1) * length; i++) {
                sum += (buffer[i] - mean) * (buffer[i] - mean);
            }

            var amplitude = (max - min);
            var deviation = Math.sqrt(sum / length);
            var ratio = deviation / (amplitude + 1);
            var crying = ratio > 0.1 && amplitude > 50;
            
            
            
            cryingSum += crying ? 1 : -1;
        }
        console.log(cryingSum);
        return cryingSum > 0;
    }
}