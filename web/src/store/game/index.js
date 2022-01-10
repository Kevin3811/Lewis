import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    gamemode: "",
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
    //   guesses: [{lat: 90, lon: 90}, {lat: 80, lon: 80}],
    //   lobbyCode: asdfadf,
    //   isHost: false
    // };
    lobbyUsers: [],
    player: {},
  },
  actions,
  mutations,
  getters,
};
