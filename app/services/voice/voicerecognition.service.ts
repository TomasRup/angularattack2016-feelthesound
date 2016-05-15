import { Injectable } from '@angular/core';

@Injectable()
export class VoiceRecognitionService {
      
    isBabyCrying(buffer, sensitivity = 0.75) { // TODO: implement more sophisticated and accurate cry detection
        if (sensitivity == 0) {
            return false;
        }
        var chunkSize = 10;
        var chunksCount = Math.floor(buffer.length / chunkSize);
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
            var crying = deviation > (1 - sensitivity) / 100.0 && amplitude > (1 - sensitivity) / 10;

            cryingSum += crying ? 1 : -1;            
        }
        return cryingSum > 0;
    }
}