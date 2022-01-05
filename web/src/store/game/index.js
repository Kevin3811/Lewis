import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    //TODO: get rid of hard coded state values used for testing
    username: "",
    clientCode: "",
    score: 0,
    gamemode: "",
    ishost: false,
    isguessing: false,
    showLobbyAnswers: true,
    playlists: [],
    videos: [],
    lobbyCode: undefined,
    roundLength: undefined,
    roundCount: undefined,
    currentRound: undefined,
    //Sample user object:
    // {
    //   username: "Nick",
    //   score: 499,
    //   clientCode: "987654321",
    //   latGuess: 20,
    //   lonGuess: 20,
    //   previousScore: 546,
    //   scores: [50, 739],
    // };
    lobbyUsers: [],
  },
  actions,
  mutations,
  getters,
};
