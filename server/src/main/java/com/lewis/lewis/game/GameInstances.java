package com.lewis.lewis.game;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Data
public class GameInstances {

    //Singleton
    private GameInstances gameInstances;

    private Map<String, Game> games = new HashMap<>();

    private GameInstances(){}

    public GameInstances getGameInstances(){
        if(gameInstances == null){
            gameInstances = new GameInstances();
        }
        return gameInstances;
    }

    public Game getGame(String gameCode){
        return games.get(gameCode);
    }

    public void addGame(Game game){
        games.put(game.getGameCode(), game);
    }

    public void deleteGame(String gameCode){
        games.remove(gameCode);
    }

}
