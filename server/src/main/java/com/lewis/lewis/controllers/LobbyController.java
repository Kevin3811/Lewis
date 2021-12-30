package com.lewis.lewis.controllers;

import com.lewis.lewis.config.Videos;
import com.lewis.lewis.repository.PlaylistRepository;
import com.lewis.lewis.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/lobby")
public class LobbyController {

    private PlaylistRepository playlistRepository;
    private VideoRepository videoRepository;

    @Autowired
    public LobbyController(PlaylistRepository playlistRepository, VideoRepository videoRepository){
        this.playlistRepository = playlistRepository;
        this.videoRepository = videoRepository;
    }

    @GetMapping("/playlists")
    public List<String> getPlaylists(){
        List<String> playlists = new ArrayList<>();
        playlistRepository.findAll().forEach(playlist -> {
            playlists.add(playlist.getName());
        });
        return playlists;
    }

    @GetMapping("/videos")
    public Set<Videos.Video> getVideos(){
        Set<Videos.Video> videos = new HashSet<>();
        videoRepository.findAll().forEach(video -> {
            videos.add(Videos.Video.builder()
                    .latitude(video.getLatitude())
                    .longitude(video.getLongitude())
                    .playlists(video.getPlaylists())
                    .startTime(video.getStartTime())
                    .url(video.getUrl())
                    .build());
        });
        return videos;
    }

}
