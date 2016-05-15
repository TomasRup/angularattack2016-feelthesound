package feelthesound.api.service;

import java.util.Optional;

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

    public Optional<Streamer> getStreamer(@PathVariable String subscriberId) {
        return listenerRegistry.getStreamer(subscriberId).map(id -> Streamer
                .builder()
                .subscriberId(subscriberId)
                .listenerCount(listenerRegistry.getListeners(subscriberId).size())
                .subscriberSessionId(listenerRegistry.getStreamer(subscriberId).get().getId())
                .build()
        );
    }

    public void onListenerChange(String id) {
        getStreamer(id).ifPresent(s -> apiRegistry.notify(id, s));
    }
}
