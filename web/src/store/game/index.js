import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state: {
    //TODO: get rid of hard coded state values used for testing
    playlist: "US",
    playerUsername: "Kevin",
    clientCode: "123456789",
    score: 500,
    playing: false,
    gamemode: "",
    lobbyUsers: [
      {
        username: "Nick",
        score: 499,
        clientCode: "987654321",
      },
      {
        username: "Mason",
        score: 498,
        clientCode: "abcdefghij",
      },
      {
        username: "Kevin",
        score: 500,
        clientCode: "123456789",
      },
      {
        username: "Skateoriginal1",
        score: 497,
        clientCode: "1a2b3c4d",
      },
    ],
  },
  actions,
  mutations,
  getters,
};
