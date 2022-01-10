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
    state.player.host = isHost;
  },
  setIsGuessing(state, isGuessing) {
    state.player.guessing = isGuessing;
  },
  setClientCode(state, clientCode) {
    state.player.clientCode = clientCode;
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
    state.player.username = username;
  },
  setCurrentRound(state, currentRound) {
    state.currentRound = currentRound;
  },
  setPlayer(state, player) {
    state.player = player;
  },
  setUsers(state, users) {
    let lobbyUsers = [];
    Object.values(users).forEach((user) => {
      lobbyUsers.push(user);
    });
    state.lobbyUsers = lobbyUsers;
  },
};
