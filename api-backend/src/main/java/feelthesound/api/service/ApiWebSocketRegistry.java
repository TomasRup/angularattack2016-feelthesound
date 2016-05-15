package feelthesound.api.service;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Service
public class ApiWebSocketRegistry {

    private final Map<String, WebSocketSession> SESSIONS = new ConcurrentHashMap<>();

    @Autowired
    private ObjectMapper mapper;

    public void register(WebSocketSession session) {
        SESSIONS.put(ListenerRegistry.getSubscriberId(session), session);
    }

    public WebSocketSession remove(String id) {
        return SESSIONS.remove(id);
    }

    public <T> void notify(String id, T payload) {
        Optional.ofNullable(SESSIONS.get(id)).ifPresent(s -> {
            try {
                s.sendMessage(new TextMessage(mapper.writeValueAsBytes(payload)));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
}
