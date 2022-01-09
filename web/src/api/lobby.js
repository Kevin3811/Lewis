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
      console.error("Error creating lobby: ", response.status);
    }
    return response.data;
  },
  async addPlayerToLobby(player) {
    let response;
    try {
      response = await instance.post("/add-user", player);
    } catch (error) {
      console.error("Error creating lobby: ", response.status);
    }
    return response.data;
  },
};
