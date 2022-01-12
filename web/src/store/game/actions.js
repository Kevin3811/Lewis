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
  incrementPlayersScore(context) {
    context.commit("incrementPlayersScore");
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
};
