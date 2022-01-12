import axios from "axios";

const SERVER_URL = "http://localhost:8081/lobby";

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
    console.log("gc: ", lobbyCode);
    try {
      response = await instance.post("/start-game", lobbyCode);
    } catch (error) {
      console.error("Error starting game: ", response);
    }
  },
};
