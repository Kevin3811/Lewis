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
  setShowLobbyAnswers(state, showLobbyAnswers) {
    state.showLobbyAnswers = showLobbyAnswers;
  },
  setPlaylists(state, playlists) {
    state.playlists = playlists;
  },
  setVideos(state, videos) {
    state.videos = videos;
  },
  setLobbyCode(state, lobbyCode) {
    state.lobbyCode = lobbyCode;
  },
  setRoundLength(state, roundLength) {
    state.roundLength = roundLength;
  },
  setRoundCount(state, roundCount) {
    state.roundCount = roundCount;
  },
  setUsername(state, username) {
    state.username = username;
  },
  setCurrentRound(state, currentRound) {
    state.currentRound = currentRound;
  },
};
