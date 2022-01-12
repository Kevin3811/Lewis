package com.lewis.lewis.messaging;

import com.lewis.lewis.game.Game;
import com.lewis.lewis.game.GameInstances;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WebSocket {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private GameInstances gameInstances = GameInstances.getGameInstances();

    @SendTo("/topic/players")
    public void sendPlayerList(String gameCode){
        Game game = gameInstances.getGame(gameCode);
        messagingTemplate.convertAndSend("/topic/players/" + game.getGameCode(), game.getPlayers());
    }

    @SendTo("/topic/game")
    public void startGame(String gameCode){
        Game game = gameInstances.getGame(gameCode);
        game.setGameStarted(true);
        game.setCurrentRound(1);
        messagingTemplate.convertAndSend("/topic/game/" + game.getGameCode(), game);
    }
}
