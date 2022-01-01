import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    //TODO: get rid of hard coded state values used for testing
    playlist: "US",
    playerUsername: "Skateoriginal1",
    clientCode: "1a2b3c",
    score: 500,
    playing: false,
    gamemode: "",
    ishost: false,
    isguessing: false,
    guesslat: 0,
    guesslon: 0,
    roundlat: 25,
    roundlon: 125,
    hasguessed: false,
    showLobbyAnswers: true,
    playlists: [],
    videos: [],
    lobbyCode: undefined,
    createGame: false,
    lobbyUsers: [
      {
        username: "Nick",
        score: 499,
        clientCode: "987654321",
        latGuess: 20,
        lonGuess: 20,
      },
      {
        username: "Mason",
        score: 498,
        clientCode: "abcdefghij",
        latGuess: 30,
        lonGuess: 30,
      },
      {
        username: "Kevin",
        score: 500,
        clientCode: "123456789",
        latGuess: 40,
        lonGuess: 40,
      },
      {
        username: "Skateoriginal1",
        score: 497,
        clientCode: "1a2b3c4d",
        latGuess: 50,
        lonGuess: 50,
      },
      {
        username: "Skateoriginal1",
        score: 497,
        clientCode: "1a2b3c4",
        latGuess: 60,
        lonGuess: 60,
      },
      {
        username: "Skateoriginal1",
        score: 497,
        clientCode: "1a2b3c",
        latGuess: 70,
        lonGuess: 70,
      },
      {
        username: "Skateoriginal1",
        score: 497,
        clientCode: "1a2b3",
        latGuess: 80,
        lonGuess: 80,
      },
    ],
  },
  actions,
  mutations,
  getters,
};
