package com.lewis.lewis.config;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@Data
@ConfigurationProperties(prefix = "game")
public class Videos {

    private List<Video> videos = new ArrayList<>();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Video{
        private String url;
        private String startTime;
        private String latitude;
        private String longitude;

        private Set<String> playlists;
    }

}
