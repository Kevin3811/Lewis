package com.lewis.lewis.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class GameSettings {

    private Playlists playlists;
    private Videos videos;

    @Autowired
    public GameSettings(Playlists playlists, Videos videos){
        this.playlists = playlists;
        this.videos = videos;
    }

    @PostConstruct
    public void test(){
        log.info("TEST");
        for(String playlist : playlists.getPlaylists()){
            log.info("playlist: {}", playlist);
        }
        log.info("TEST");
        for(Videos.Video video : videos.getVideos()){
            log.info("videoUrl: {}", video.getUrl());
            log.info("videoStartTime: {}", video.getStartTime());
        }
    }

}
