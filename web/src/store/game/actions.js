//WAY TO SET STATE FOR INDEX.JS AND PERFOM LOGIC USING STATE
export default {
  resetGame(context) {
    context.commit("setPlaying", false);
    context.commit("setGamemode", "");
    context.commit("setIsGuessing", false);
    context.commit("setGuessLat", 0);
    context.commit("setGuessLon", 0);
    context.commit("setRoundLat", 0);
    context.commit("setRoundLon", 0);
    context.commit("setHasGuessed", false);
    context.commit("setShowLobbyAnswers", false);
    context.commit("setIsHost", false);
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
  setGuessLat(context, lat) {
    context.commit("setGuessLat", lat);
  },
  setGuessLon(context, lon) {
    context.commit("setGuessLon", lon);
  },
  setRoundLat(context, lat) {
    context.commit("setRoundLat", lat);
  },
  setRoundLon(context, lon) {
    context.commit("setRoundLon", lon);
  },
  setHasGuessed(context, hasGuessed) {
    context.commit("setHasGuessed", hasGuessed);
  },
  setShowLobbyAnswers(context, showLobbyAnswers) {
    context.commit("setShowLobbyAnswers", showLobbyAnswers);
  },
};
