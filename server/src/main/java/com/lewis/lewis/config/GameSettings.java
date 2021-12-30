package com.lewis.lewis.config;

import com.lewis.lewis.entity.PlaylistEntity;
import com.lewis.lewis.entity.VideoEntity;
import com.lewis.lewis.repository.PlaylistRepository;
import com.lewis.lewis.repository.VideoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class GameSettings {

    private Playlists playlists;
    private Videos videos;
    private PlaylistRepository playlistRepository;
    private VideoRepository videoRepository;

    @Autowired
    public GameSettings(Playlists playlists, Videos videos,
                        PlaylistRepository playlistRepository, VideoRepository videoRepository){
        this.playlists = playlists;
        this.videos = videos;
        this.playlistRepository = playlistRepository;
        this.videoRepository = videoRepository;
    }

    @PostConstruct
    public void init(){
        initPlaylists();
        initVideos();
    }

    /**
     * Add playlists from application.yml to database
     */
    private void initPlaylists(){
        log.info("Initializing playlists");
        for(String playlist : playlists.getPlaylists()){
            PlaylistEntity playlistEntity = PlaylistEntity.builder()
                    .name(playlist)
                    .build();
            playlistRepository.save(playlistEntity);
            log.info("Added playlist [{}] to database", playlist);
        }
    }

    /**
     * Add videos from application.yml to database
     */
    private void initVideos(){
        log.info("Initializing videos");
        for(Videos.Video video : videos.getVideos()){
            VideoEntity videoEntity = VideoEntity.builder()
                    .url(video.getUrl())
                    .startTime(video.getStartTime())
                    .latitude(video.getLatitude())
                    .longitude(video.getLongitude())
                    .playlists(video.getPlaylists())
                    .build();
            videoRepository.save(videoEntity);
            log.info("Added video [{}] to database", video.getUrl());
        }
    }

}
