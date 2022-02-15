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
    //   previousScore: 546,
    //   guesses: [
    //      1: {latGuess: 90, lonGuess: 90, score: 490, round: 1, runningScore: 490, distance: "3 miles 2 feet"},
    //      2: {latGuess: 80, lonGuess: 80 score: 350, round: 2, runningScore: 840, distance: "1 mile 34 feet"}],
    //   lobbyCode: asdfadf,
    //   host: false
    // };
    lobbyUsers: [],
    player: {},

    roundOver: false,
    markerLat: undefined,
    markerLon: undefined,
  },
  actions,
  mutations,
  getters,
};
