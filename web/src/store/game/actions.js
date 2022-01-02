//WAY TO SET STATE FOR INDEX.JS AND PERFOM LOGIC USING STATE
export default {
  resetGame(context) {
    context.commit("setPlaying", false);
    context.commit("setGamemode", "");
    context.commit("setIsGuessing", false);
    context.commit("setShowLobbyAnswers", false);
    context.commit("setIsHost", false);
    context.commit("setRoundLength", undefined);
    context.commit("setRoundCount", undefined);
    context.commit("setUsername", "");
    context.commit("setPlaylists", []);
  },
  setPlaying(context, playing) {
    context.commit("setPlaying", playing);
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
};
