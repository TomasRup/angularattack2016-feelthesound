package feelthesound.api;

import feelthesound.api.endpoint.ws.ApiWebSocket;
import feelthesound.api.endpoint.ws.ListenerWebSocket;
import feelthesound.api.endpoint.ws.StreamerWebSocket;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class ContextConfiguration extends SpringBootServletInitializer implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(streamHandler(), "/streams/{subscriberId}").setAllowedOrigins("*");
        registry.addHandler(listenerHandler(), "/listeners/{subscriberId}").setAllowedOrigins("*");
        registry.addHandler(apiHandler(), "/api/{subscriberId}").setAllowedOrigins("*");
    }

    @Bean
    public StreamerWebSocket streamHandler() {
        return new StreamerWebSocket();
    }

    @Bean
    public ListenerWebSocket listenerHandler() {
        return new ListenerWebSocket();
    }

    @Bean
    public ApiWebSocket apiHandler() {
        return new ApiWebSocket();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("*").allowedOrigins("*");
            }
        };
    }
}
