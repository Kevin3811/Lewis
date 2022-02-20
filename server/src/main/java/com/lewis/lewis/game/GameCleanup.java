package com.lewis.lewis.game;

import com.lewis.lewis.utils.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Iterator;
import java.util.Map;

@Component
@Slf4j
public class GameCleanup {

    private GameInstances gameInstances;

    public GameCleanup(){
        gameInstances = GameInstances.getGameInstances();
    }


    @Scheduled(fixedDelay = 600000)
    private void removeEmptyGames(){
        Map<String, Game> games = gameInstances.getGames();
        Iterator<Map.Entry<String, Game>> lobbies = games.entrySet().iterator();
        while(lobbies.hasNext()){
            Map.Entry<String, Game> gameEntry = lobbies.next();
            String code = gameEntry.getKey();
            Game game = gameEntry.getValue();
            if(game != null){
                //If a lobby doesn't have any players delete it
                if (game.getPlayers().isEmpty()) {
                    lobbies.remove();
                    log.info("Removed empty lobby: [{}]", code);
                    continue;
                }
                Long minuteDifference = DateUtils.timeBetweenDates(game.getLastUpdate(), Calendar.getInstance().getTime());
                //If the lobby hasn't had any updates in the last 30 minutes delete it
                if(minuteDifference >= 30){
                    lobbies.remove();
                    log.info("Removed inactive lobby: [{}]", code);
                    continue;
                }
            }
        }
    }

}
