package com.lewis.lewis.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Guess {

    private Double latGuess;
    private Double lonGuess;
    private Integer score;
    private Integer round;
    private Integer runningScore;

}
