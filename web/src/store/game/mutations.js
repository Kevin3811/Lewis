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
  incrementPlayerScore(state, round) {
    let guess = state.player.guesses.find((g) => g.round === round);
    if (guess !== undefined) {
      state.player.score += guess.score;
      guess.runningScore = state.player.score;
    }
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
  setGameStarted(state, started) {
    state.gameStarted = started;
  },
  setGuess(state, guess) {
    state.player.guesses.push(guess);
  },
};
