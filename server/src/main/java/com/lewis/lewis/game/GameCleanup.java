package com.lewis.lewis.game;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
public class GameCleanup {

    private GameInstances gameInstances;

    public GameCleanup(){
        gameInstances = GameInstances.getGameInstances();
    }


    @Scheduled(fixedDelay = 60000)
    private void removeEmptyGames(){
        Map<String, Game> games = gameInstances.getGames();
        games.forEach((code, game) -> {
            //Remove empty lobbies every 60 seconds
            if(game.getPlayers().isEmpty()){
                games.remove(code);
                log.info("Removed empty lobby: [{}]", code);
            }
        });
    }

}
