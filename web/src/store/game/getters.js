//WAY TO ACCESS AND FORMAT STATE VARIABLES
export default {
  getUsername: (state) => {
    return state.player.username;
  },
  getLobbyUsers: (state) => {
    return state.lobbyUsers;
  },
  getLobbyInScoreOrder: (state) => {
    return state.lobbyUsers.sort((a, b) => (a.score < b.score ? 1 : -1));
  },
  getClientCode: (state) => {
    return state.player.clientCode;
  },
  getIsHost: (state) => {
    return state.player.host;
  },
  getIsGuessing: (state) => {
    return state.player.guessing;
  },
  getShowLobbyAnswers: (state) => {
    return state.showLobbyAnswers;
  },
  getPlaylists: (state) => {
    return state.playlists;
  },
  getVideos: (state) => {
    return state.videos;
  },
  getLobbyCode: (state) => {
    return state.lobbyCode;
  },
  getGamemode: (state) => {
    return state.gamemode;
  },
  getRoundCount: (state) => {
    return state.roundCount;
  },
  getCurrentRound: (state) => {
    return state.currentRound;
  },
  getRoundLength: (state) => {
    return state.roundLength;
  },
  getCurrentVideo: (state) => {
    let currentVideo =
      state.videos[(state.currentRound - 1) % state.videos.length];
    return currentVideo;
  },
  getPlayer: (state) => {
    return state.player;
  },
  getGameStarted: (state) => {
    return state.gameStarted;
  },
  getGuess: (state) => {
    let guess = state.player.guesses.find(
      (g) => g.round === state.currentRound
    );
    if (guess === undefined) {
      return {};
    }
    return guess;
  },
  getRoundOver: (state) => {
    return state.roundOver;
  },
  getMarkerLat: (state) => {
    return state.markerLat;
  },
  getMarkerLon: (state) => {
    return state.markerLon;
  },
  getHasGuessed: (state) => {
    return state.guessed;
  },
  getWebsocketError: (state) => {
    return state.websocketError;
  },
};
