package feelthesound.api.service;

import feelthesound.api.model.Streamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class StreamerService {

    @Autowired
    private ListenerRegistry listenerRegistry;

    @Autowired
    private ApiWebSocketRegistry apiRegistry;

    public Streamer getStreamer(@PathVariable String subscriberId) {
        if (!listenerRegistry.getStreamer(subscriberId).isPresent()) {
            throw new RuntimeException("Streamer not found");
        }
        return Streamer
                .builder()
                .subscriberId(subscriberId)
                .listenerCount(listenerRegistry.getListeners(subscriberId).size())
                .subscriberSessionId(listenerRegistry.getStreamer(subscriberId).get().getId())
                .build();
    }

    public void onListenerChange(String id) {
        apiRegistry.notify(id, getStreamer(id));
    }
}
