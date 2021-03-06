import axios from "axios";

const instance = axios.create({
  timeout: 1000,
});

export default {
  async createGame(game) {
    let response;
    try {
      response = await instance.post("/lobby/create-lobby", game);
    } catch (error) {
      console.error("Error creating lobby: ", response);
    }
    return response.data;
  },
  async addPlayerToLobby(player) {
    let response;
    try {
      response = await instance.post("/lobby/add-user", player);
    } catch (error) {
      console.error("Error creating lobby: ", response);
    }
    return response.data;
  },
  async deletePlayerFromLobby(player) {
    let response;
    try {
      response = await instance.post("/lobby/remove-player", player);
    } catch (error) {
      console.error("Error removing player from lobby: ", response);
    }
    return response.data;
  },
  async startGame(lobbyCode) {
    let response;
    try {
      response = await instance.post("/lobby/start-game", lobbyCode);
    } catch (error) {
      console.error("Error starting game: ", response);
    }
  },
  async updatePlayer(player) {
    let response;
    try {
      response = await instance.post("/lobby/update-player", player);
    } catch (error) {
      console.error("Error updating player: ", response);
    }
    return response.data;
  },
  async nextRound(lobbyCode) {
    let response;
    try {
      response = await instance.post("/lobby/next-round", lobbyCode);
    } catch (error) {
      console.error("Error going to next round: ", response);
    }
    return response.data;
  },
  async removeGame(lobbyCode) {
    let response;
    try {
      response = await instance.post("/lobby/remove-game", lobbyCode);
    } catch (error) {
      console.error("Error removing game: ", response);
    }
    return response.data;
  },
};
