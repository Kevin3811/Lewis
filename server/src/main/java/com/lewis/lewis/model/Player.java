package com.lewis.lewis.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Player {

    private String username;
    private String clientCode;
    private Long score;
    private boolean host;
    private boolean guessing;

    private String gameCode;

    private Double latGuess;
    private Double lonGuess;

    private List<Guess> guesses;

}
