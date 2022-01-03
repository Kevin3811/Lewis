//WAY TO ACCESS AND FORMAT STATE VARIABLES
export default {
  getUsername: (state) => {
    return state.username;
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
};
