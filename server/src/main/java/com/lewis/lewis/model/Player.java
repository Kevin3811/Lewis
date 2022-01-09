package com.lewis.lewis.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Player {

    private String username;
    private String clientCode;
    private Long score;
    private boolean isHost;
    private boolean isGuessing;

    private String gameCode;

    private Double latGuess;
    private Double lonGuess;

}
