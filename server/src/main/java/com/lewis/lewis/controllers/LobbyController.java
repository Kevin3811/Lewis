package com.lewis.lewis.controllers;

import com.lewis.lewis.config.Videos;
import com.lewis.lewis.game.Game;
import com.lewis.lewis.game.GameInstances;
import com.lewis.lewis.model.Player;
import com.lewis.lewis.repository.PlaylistRepository;
import com.lewis.lewis.repository.VideoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "/lobby")
@Slf4j
public class LobbyController {

    private PlaylistRepository playlistRepository;
    private VideoRepository videoRepository;
    private GameInstances gameInstances;

    @Autowired
    public LobbyController(PlaylistRepository playlistRepository, VideoRepository videoRepository){
        this.playlistRepository = playlistRepository;
        this.videoRepository = videoRepository;
        this.gameInstances = GameInstances.getGameInstances();
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

    @PostMapping("/create-lobby")
    public ResponseEntity<List<Videos.Video>> createLobby(@RequestBody Game game){
        ResponseEntity<List<Videos.Video>> response;
        log.info("game: [{}]", game);
        //If there aren't any selected playlists, make world the default
        if(game.getIncludedPlaylists().isEmpty()){
            game.getIncludedPlaylists().add("World");
        }
        //Create lobby if the required parameters were provided
        if(game.getGameCode() != null && !game.getGameCode().isEmpty() &&
            game.getRoundCount() != null && game.getRoundLength() != null){
            //Set the videos for the lobby and then add the game object to the game instances
            List<Videos.Video> videos = new ArrayList<>();
            videoRepository.findByPlaylistsIn(game.getIncludedPlaylists()).forEach(video ->{
                videos.add(Videos.Video.builder()
                        .latitude(video.getLatitude())
                        .longitude(video.getLongitude())
                        .playlists(video.getPlaylists())
                        .startTime(video.getStartTime())
                        .url(video.getUrl())
                        .description(video.getDescription())
                        .build());
            });
            game.setVideos(videos);
            gameInstances.addGame(game);
            response = new ResponseEntity<>(videos, HttpStatus.OK);
        }else{
            response = new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PostMapping("/add-user")
    public ResponseEntity<Player> addPlayerToLobby(@RequestBody Player player){
        ResponseEntity<Player> response;
        //Make sure Player object has required parameters
        if(player.getUsername() != null && !player.getUsername().isEmpty() &&
            player.getClientCode() != null && !player.getClientCode().isEmpty() &&
            player.getLobbyCode() != null && !player.getLobbyCode().isEmpty()
        ){
            Game game = gameInstances.getGame(player.getLobbyCode());
            if(game != null){
                game.getPlayers().put(player.getClientCode(), player);
                response = new ResponseEntity<>(player, HttpStatus.OK);
            }else{
                //Game doesn't exist
                response = new ResponseEntity<>(player, HttpStatus.BAD_REQUEST);
            }
        }else{
            response = new ResponseEntity<>(player, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}
