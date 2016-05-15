package feelthesound.api.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Streamer {
    private final String subscriberId;
    private final int listenerCount;
    private final String subscriberSessionId;
}
