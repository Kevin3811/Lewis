//ONLY CALL MUTATIONS FROM ACTIONS
export default {
  setPlaying(state, playing) {
    state.playing = playing;
  },
  setGamemode(state, gamemode) {
    state.gamemode = gamemode;
  },
  setIsHost(state, isHost) {
    state.ishost = isHost;
  },
  setIsGuessing(state, isGuessing) {
    state.isguessing = isGuessing;
  },
  setGuessLat(state, lat) {
    state.guesslat = lat;
  },
  setGuessLon(state, lon) {
    state.guesslon = lon;
  },
  setRoundLat(state, lat) {
    state.roundlat = lat;
  },
  setRoundLon(state, lon) {
    state.roundlon = lon;
  },
  setHasGuessed(state, hasGuessed) {
    state.hasguessed = hasGuessed;
  },
  setShowLobbyAnswers(state, showLobbyAnswers) {
    state.showLobbyAnswers = showLobbyAnswers;
  },
};
