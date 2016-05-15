package feelthesound.api.endpoint.ws;

import java.io.FileNotFoundException;

import feelthesound.api.service.ListenerRegistry;
import feelthesound.api.service.StreamerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

@Slf4j
public class ListenerWebSocket extends BinaryWebSocketHandler {

    @Autowired
    private ListenerRegistry registry;
    @Autowired
    private StreamerService streamerService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws FileNotFoundException {
        session.setBinaryMessageSizeLimit(1000000);
        registry.registerListener(session);
        String id = ListenerRegistry.getSubscriberId(session);
        streamerService.onListenerChange(id);
        log.debug("Connected listener '{}'", id);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        //Does nothing for incoming messages
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("Listener error", exception);
        session.close(CloseStatus.SERVER_ERROR);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        registry.removeClosed();
        String id = ListenerRegistry.getSubscriberId(session);
        streamerService.onListenerChange(id);
        log.debug("Disconnected listener '{}'", id);
    }
}
