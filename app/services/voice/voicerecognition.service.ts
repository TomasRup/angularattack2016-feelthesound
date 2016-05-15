import { Injectable } from '@angular/core';

@Injectable()
export class VoiceRecognitionService {
    
    isBabyCrying(buffer) { // TODO: implement more sophisticated cry detection              
        var sliceSize = 10;
        var chunksCount = Math.floor(buffer.length / sliceSize);
        var length = Math.floor(buffer.length / chunksCount);       
        var cryingSum = 0;
        for(var chunk = 0; chunk < chunksCount; chunk++) {
            var sum = 0;
            var max = -1;
            var min = 1;
            
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
            var crying = deviation > 0.1 && amplitude > 0.2;
            
//            console.log("deviation:" + deviation + " amplitude:" + amplitude + " min:" + min + " max:" + max);
            
            cryingSum += crying ? 1 : -1;
            
        }
        console.log(cryingSum);
        return cryingSum > 0;
    }
}