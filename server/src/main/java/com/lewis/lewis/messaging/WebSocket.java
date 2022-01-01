package com.lewis.lewis.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WebSocket {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/scores")
    @SendTo("/topic/scores")
    public void test(String message){
//        log.info("TEST");
        messagingTemplate.convertAndSend("/topic/scores", "testMessage");
    }

    @Scheduled(fixedRate = 2000)
    public void test2(){
        test("message");
    }
}
