//WAY TO SET STATE FOR INDEX.JS AND PERFOM LOGIC USING STATE
export default {
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
