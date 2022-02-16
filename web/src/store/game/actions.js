import lobbyApi from "../../api/lobby";
//WAY TO SET STATE FOR INDEX.JS AND PERFOM LOGIC USING STATE
export default {
  resetGame(context) {
    context.commit("setGamemode", "");
    context.commit("setIsGuessing", false);
    context.commit("setShowLobbyAnswers", false);
    context.commit("setIsHost", false);
    context.commit("setRoundLength", undefined);
    context.commit("setRoundCount", undefined);
    context.commit("setUsername", "");
    context.commit("setPlaylists", []);
    context.commit("setClientCode", "");
    context.commit("setGameStarted", false);
    context.commit("clearUsers");
    context.commit("setPlayer", {});
  },
  resetPlayersPreviousRound(context) {
    context.commit("resetPlayersPreviousRound");
  },
  async incrementPlayerScore(context, round) {
    context.commit("incrementPlayerScore", round);
    await lobbyApi.updatePlayer(context.getters.getPlayer);
  },
  addUser(context, user) {
    context.commit("addUser", user);
  },
  clearUsers(context) {
    context.commit("clearUsers");
  },
  setClientCode(context, clientCode) {
    context.commit("setClientCode", clientCode);
  },
  setGamemode(context, gamemode) {
    context.commit("setGamemode", gamemode);
  },
  setIsHost(context, isHost) {
    context.commit("setIsHost", isHost);
  },
  setIsGuessing(context, isGuessing) {
    context.commit("setIsGuessing", isGuessing);
  },
  setShowLobbyAnswers(context, showLobbyAnswers) {
    context.commit("setShowLobbyAnswers", showLobbyAnswers);
  },
  setPlaylists(context, playlists) {
    context.commit("setPlaylists", playlists);
  },
  setVideos(context, videos) {
    context.commit("setVideos", videos);
  },
  setLobbyCode(context, code) {
    context.commit("setLobbyCode", code);
  },
  updateScores(context, scores) {
    console.log("UPDATE SCORES", context, scores);
  },
  setRoundLength(context, roundLength) {
    context.commit("setRoundLength", roundLength);
  },
  setRoundCount(context, roundCount) {
    context.commit("setRoundCount", roundCount);
  },
  setUsername(context, username) {
    context.commit("setUsername", username);
  },
  setCurrentRound(context, currentRound) {
    context.commit("setCurrentRound", currentRound);
  },
  setPlayer(context, player) {
    context.commit("setPlayer", player);
  },
  setUsers(context, users) {
    context.commit("setUsers", users);
  },
  setGameStarted(context, started) {
    context.commit("setGameStarted", started);
  },
  setGameRules(context, rules) {
    context.commit("setGamemode", "multiplayer");
    context.commit("setVideos", rules.videos);
    context.commit("setCurrentRound", rules.currentRound);
    context.commit("setRoundCount", rules.roundCount);
    context.commit("setRoundLength", rules.roundLength);
    context.commit("setUsers", rules.players);
    context.commit("setLobbyCode", rules.gameCode);
    context.commit("setGameStarted", rules.gameStarted);
  },
  setGuessed(context, guessed) {
    context.commit("setGuessed", guessed);
  },
  setGuess(context, guess) {
    context.commit("setGuess", guess);
    let player = context.getters.getPlayer;
    //Send player score to server if it's multiplayer and score updated
    lobbyApi.updatePlayer(player);
  },
  setRoundOver(context, roundOver) {
    context.commit("setRoundOver", roundOver);
  },
  setMarkerLat(context, markerLat) {
    context.commit("setMarkerLat", markerLat);
  },
  setMarkerLon(context, markerLon) {
    context.commit("setMarkerLon", markerLon);
  },
  nextRound(context) {
    //If they didn't guess, create an hollow guess object
    if (!context.getters.getPlayer.guessed) {
      let guess = {
        latGuess: undefined,
        lonGuess: undefined,
        score: 0,
        round: context.getters.getCurrentRound,
        runningScore: 0,
        distance: "---",
      };
      context.dispatch("setGuess", guess);
    }
    context.dispatch("incrementPlayerScore", context.getters.getCurrentRound);

    context.dispatch("setRoundOver", false);
    context.dispatch("setMarkerLat", undefined);
    context.dispatch("setMarkerLon", undefined);

    context.dispatch("setIsGuessing", false);
    context.dispatch("resetPlayersPreviousRound");
    context.dispatch("setShowLobbyAnswers", false);
    context.dispatch("setGuessed", false);

    context.dispatch("setCurrentRound", context.getters.getCurrentRound + 1);
  },
};
