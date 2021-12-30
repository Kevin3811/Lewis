package com.lewis.lewis.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Lobby {

    private String lobbyCode;
    private Double roundLength;
    private Integer roundNumber;

    private Set<Player> players = new HashSet<>();
    private String playlist;

    private Integer currentRoundNumber;

}
