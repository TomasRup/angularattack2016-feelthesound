package feelthesound.api.endpoint.ws;

import feelthesound.api.service.ApiWebSocketRegistry;
import feelthesound.api.service.ListenerRegistry;
import feelthesound.api.service.StreamerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
public class ApiWebSocket extends TextWebSocketHandler {

    @Autowired
    private ApiWebSocketRegistry registry;

    @Autowired
    private StreamerService streamerService;
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.debug("Connecting Api socket {}", ListenerRegistry.getSubscriberId(session));
        super.afterConnectionEstablished(session);
        registry.register(session);
        streamerService.onListenerChange(ListenerRegistry.getSubscriberId(session));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //No api messages yet for server side
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.debug("Disconnecting Api socket {}", ListenerRegistry.getSubscriberId(session));
        super.afterConnectionClosed(session, status);
        registry.remove(ListenerRegistry.getSubscriberId(session));
    }
}
