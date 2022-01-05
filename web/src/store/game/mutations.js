//ONLY CALL MUTATIONS FROM ACTIONS
export default {
  clearUsers(state) {
    state.lobbyUsers.length = 0;
    state.lobbyUsers = [];
  },
  resetPlayersPreviousRound(state) {
    state.lobbyUsers.forEach((user) => {
      user.latGuess = undefined;
      user.lonGuess = undefined;
      user.previousScore = undefined;
    });
  },
  incrementPlayersScore(state) {
    state.lobbyUsers.forEach((user) => {
      if (user.previousScore !== undefined) {
        user.score += user.previousScore;
      } else {
        user.score += 0;
      }
      user.scores.push(user.score);
    });
  },
  addUser(state, user) {
    state.lobbyUsers.push(user);
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
  setClientCode(state, clientCode) {
    state.clientCode = clientCode;
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
