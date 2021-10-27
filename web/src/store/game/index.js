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
      {
        username: "Skateoriginal1",
        score: 497,
        clientCode: "1a2b3c4",
      },
      {
        username: "Skateoriginal1",
        score: 497,
        clientCode: "1a2b3c",
      },
      {
        username: "Skateoriginal1",
        score: 497,
        clientCode: "1a2b3",
      },
    ],
  },
  actions,
  mutations,
  getters,
};
