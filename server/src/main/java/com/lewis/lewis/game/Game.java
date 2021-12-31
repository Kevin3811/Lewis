package com.lewis.lewis.game;

import com.lewis.lewis.config.Videos;
import com.lewis.lewis.model.Player;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
@Slf4j
@Data
public class Game {

    private String gameCode;
    private Integer roundCount;
    private Integer currentRound;
    private Double roundLength;

    private String playlist;
    private Set<Videos.Video> videos;

    private Map<String, Player> players = new HashMap<>();
}
