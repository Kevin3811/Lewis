package com.lewis.lewis.game;

import com.lewis.lewis.config.Videos;
import com.lewis.lewis.model.Player;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Slf4j
@Data
public class Game {

    private String gameCode;
    private Integer roundCount;
    private Integer currentRound;
    private Double roundLength;

    private Boolean gameStarted;

    private List<String> includedPlaylists;
    private List<String> excludedPlaylists;
    private List<Videos.Video> videos;

    //Key: ClientCode, Value: Player Object
    private Map<String, Player> players = new HashMap<>();

    private Date lastUpdate;
}
