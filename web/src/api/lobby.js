import axios from "axios";

const SERVER_URL = "http://174.105.244.215:8081/lobby";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
});

export default {
  async createGame(game) {
    let response;
    try {
      response = await instance.post("/create-lobby", game);
    } catch (error) {
      console.error("Error creating lobby: ", response);
    }
    return response.data;
  },
  async addPlayerToLobby(player) {
    let response;
    try {
      response = await instance.post("/add-user", player);
    } catch (error) {
      console.error("Error creating lobby: ", response);
    }
    return response.data;
  },
  async deletePlayerFromLobby(player) {
    let response;
    try {
      response = await instance.post("/remove-player", player);
    } catch (error) {
      console.error("Error removing player from lobby: ", response);
    }
    return response.data;
  },
  async startGame(lobbyCode) {
    let response;
    try {
      response = await instance.post("/start-game", lobbyCode);
    } catch (error) {
      console.error("Error starting game: ", response);
    }
  },
  async updatePlayer(player) {
    let response;
    try {
      response = await instance.post("/update-player", player);
    } catch (error) {
      console.error("Error updating player: ", response);
    }
    return response.data;
  },
  async nextRound(lobbyCode) {
    let response;
    try {
      response = await instance.post("/next-round", lobbyCode);
    } catch (error) {
      console.error("Error going to next round: ", response);
    }
    return response.data;
  },
};
