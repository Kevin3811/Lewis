package com.lewis.lewis.messaging;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@CrossOrigin(origins = "*")
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        //Updating scores
        registry.addEndpoint("/scores").setAllowedOrigins("*").withSockJS();
        registry.addEndpoint("/scores").setAllowedOrigins("*");
        //Player added to lobby
        registry.addEndpoint("/players").setAllowedOrigins("*").withSockJS();
        registry.addEndpoint("/players").setAllowedOrigins("*");
        //Game starting
        registry.addEndpoint("/game").setAllowedOrigins("*").withSockJS();
        registry.addEndpoint("/game").setAllowedOrigins("*");
        //Next round
        registry.addEndpoint("/round").setAllowedOrigins("*").withSockJS();
        registry.addEndpoint("/round").setAllowedOrigins("*");
    }
}
