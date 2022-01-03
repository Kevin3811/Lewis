package com.lewis.lewis.controllers;

import com.lewis.lewis.config.Videos;
import com.lewis.lewis.repository.PlaylistRepository;
import com.lewis.lewis.repository.VideoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping(path = "/lobby")
@Slf4j
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
        log.info("Playlists: [{}]", playlists);
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
                    .description(video.getDescription())
                    .build());
        });
        log.info("Videos: [{}]", videos);
        return videos;
    }

    @GetMapping("/playlist-videos")
    public Set<Videos.Video> getVideosInPlaylist(String playlist){
        Set<Videos.Video> videos = new HashSet<>();
        videoRepository.findByPlaylists(playlist).forEach(video ->{
            videos.add(Videos.Video.builder()
                    .latitude(video.getLatitude())
                    .longitude(video.getLongitude())
                    .playlists(video.getPlaylists())
                    .startTime(video.getStartTime())
                    .url(video.getUrl())
                    .description(video.getDescription())
                    .build());
        });
        log.info("Videos: [{}]", videos);
        return videos;
    }

    @GetMapping("/playlists-videos")
    public List<Videos.Video> getVideosInPlaylist(@RequestParam(value="playlists") List<String> playlists){
        List<Videos.Video> videos = new ArrayList<>();
        if(playlists == null || playlists.isEmpty()){
            playlists = new ArrayList<>();
            playlists.add("World");
        }
        videoRepository.findByPlaylistsIn(playlists).forEach(video ->{
            videos.add(Videos.Video.builder()
                    .latitude(video.getLatitude())
                    .longitude(video.getLongitude())
                    .playlists(video.getPlaylists())
                    .startTime(video.getStartTime())
                    .url(video.getUrl())
                    .description(video.getDescription())
                    .build());
        });
        log.info("Videos: [{}]", videos);
        //randomize order of videos
        Collections.shuffle(videos);
        return videos;
    }

}
