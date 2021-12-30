package com.lewis.lewis.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@ConfigurationProperties(prefix = "game")
@Data
public class Playlists {
    private List<String> playlists = new ArrayList<>();
}
