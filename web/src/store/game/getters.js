//WAY TO ACCESS AND FORMAT STATE VARIABLES
export default {
  getPlayerUsername: (state) => {
    return state.playerUsername;
  },
  getLobbyUsers: (state) => {
    return state.lobbyUsers;
  },
  getLobbyInScoreOrder: (state) => {
    return state.lobbyUsers.sort((a, b) => (a.score < b.score ? 1 : -1));
  },
  getClientCode: (state) => {
    return state.clientCode;
  },
  getPlaying: (state) => {
    return state.playing;
  },
  getIsHost: (state) => {
    return state.isHost;
  },
  getIsGuessing: (state) => {
    return state.isguessing;
  },
  getGuessLat: (state) => {
    return state.guesslat;
  },
  getGuessLon: (state) => {
    return state.guesslon;
  },
  getRoundLat: (state) => {
    return state.roundlat;
  },
  getRoundLon: (state) => {
    return state.roundlon;
  },
  getHasGuessed: (state) => {
    return state.hasguessed;
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
};
