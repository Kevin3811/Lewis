package com.lewis.lewis.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
@ConfigurationProperties(prefix = "game")
public class Videos {

    private List<Video> videos = new ArrayList<>();

    @Data
    public static class Video{
        private String url;
        private String startTime;
    }

}
