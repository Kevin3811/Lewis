package com.lewis.lewis.controllers;

import com.lewis.lewis.config.Videos;
import com.lewis.lewis.game.Game;
import com.lewis.lewis.game.GameInstances;
import com.lewis.lewis.messaging.WebSocket;
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
    private WebSocket webSocket;

    @Autowired
    public LobbyController(PlaylistRepository playlistRepository, VideoRepository videoRepository, WebSocket webSocket){
        this.playlistRepository = playlistRepository;
        this.videoRepository = videoRepository;
        this.gameInstances = GameInstances.getGameInstances();
        this.webSocket = webSocket;
    }

    @GetMapping("/games")
    public ResponseEntity<Map<String, Game>> getGames(){
        return new ResponseEntity<>(gameInstances.getGames(), HttpStatus.OK);
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
        log.info("Add player: {}", player);
        ResponseEntity<Player> response;
        //Make sure Player object has required parameters
        if(player.getUsername() != null && !player.getUsername().isEmpty() &&
            player.getClientCode() != null && !player.getClientCode().isEmpty() &&
            player.getGameCode() != null && !player.getGameCode().isEmpty()
        ){
            Game game = gameInstances.getGame(player.getGameCode());
            if(game != null){
                //Add player
                game.getPlayers().put(player.getClientCode(), player);
                //Publish playerlist over websocket for lobby
                webSocket.sendPlayerList(player.getGameCode());
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

    @PostMapping("/remove-player")
    public ResponseEntity<Player> removePlayerFromLobby(@RequestBody Player player){
        log.info("Remove player: {}", player);
        ResponseEntity<Player> response;
        if(player.getClientCode() != null && !player.getClientCode().isEmpty() &&
                player.getGameCode() != null && !player.getGameCode().isEmpty()
            ){
            //Remove the player from the game
            Game game = gameInstances.getGame(player.getGameCode());
            game.getPlayers().remove(player.getClientCode());
            //Remove the lobby if the players list is empty
            if(game.getPlayers().isEmpty()){
                GameInstances.getGameInstances().deleteGame(player.getGameCode());
                log.info("delete game");
            }
            response = new ResponseEntity<>(player, HttpStatus.OK);
        }else{
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return response;
    }

    @PostMapping("/start-game")
    public ResponseEntity<Boolean> startGame(@RequestBody String lobbyCode){
        if(lobbyCode == null){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        lobbyCode = lobbyCode.replace("=", "");
        ResponseEntity<Boolean> response;
        Game game = gameInstances.getGame(lobbyCode);
        if(game != null){
            webSocket.startGame(lobbyCode);
            response = new ResponseEntity<>(true, HttpStatus.OK);
            log.info("start game: {}", lobbyCode);
        }else{
            response = new ResponseEntity<>(false, HttpStatus.EXPECTATION_FAILED);
        }
        return response;
    }
}
