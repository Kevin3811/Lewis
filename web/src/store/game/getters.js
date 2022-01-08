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
  getCurrentUser: (state) => {
    return state.lobbyUsers.find((user) => {
      return user.clientCode === state.clientCode;
    });
  },
  getClientCode: (state) => {
    return state.clientCode;
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
  getCurrentVideo: (state) => {
    let currentVideo =
      state.videos[(state.currentRound - 1) % state.videos.length];
    return currentVideo;
  },
};
