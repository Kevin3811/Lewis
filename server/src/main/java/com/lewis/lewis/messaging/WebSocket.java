package com.lewis.lewis.messaging;

import com.lewis.lewis.game.Game;
import com.lewis.lewis.game.GameInstances;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WebSocket {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private GameInstances gameInstances = GameInstances.getGameInstances();

    @MessageMapping("/scores")
    @SendTo("/topic/scores")
    public void test(String message){
//        log.info("TEST");
//        messagingTemplate.convertAndSend("/topic/scores", "testMessage");
        //Only send to specific lobbies
        messagingTemplate.convertAndSend("/topic/scores/123", "lobby123 message");
    }

//    @Scheduled(fixedRate = 2000)
//    public void test2(){
//        test("message");
//    }

    @SendTo("/topic/players")
    public void sendPlayerList(String gameCode){
        Game game = gameInstances.getGame(gameCode);
        messagingTemplate.convertAndSend("/topic/players/" + game.getGameCode(), game.getPlayers());
    }
}
