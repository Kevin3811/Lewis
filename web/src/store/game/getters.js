//WAY TO ACCESS AND FORMAT STATE VARIABLES
export default {
  getPlayerUsername: (state) => {
    return state.playerUsername;
  },
  getLobbyUsers: (state) => {
    return state.lobbyUsernames;
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
};
