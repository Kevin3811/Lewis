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
    //For multiplayer
    gameStarted: false,
    //Sample user object:
    // {
    //   username: "Nick",
    //   score: 499,
    //   clientCode: "987654321",
    //   latGuess: 20,
    //   lonGuess: 20,
    //   previousScore: 546,
    //   scores: [50, 739],
    //   guesses: [
    //      1: {latGuess: 90, lonGuess: 90, score: 490, round: 1, runningScore: 490},
    //      2: {latGuess: 80, lonGuess: 80 score: 350, round: 2, runningScore: 840}],
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
