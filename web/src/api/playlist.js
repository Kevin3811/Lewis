import axios from "axios";

const SERVER_URL = "http://localhost:8081/lobby";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
});

export default {
  async getAllPlaylists() {
    let playlists;
    try {
      playlists = await instance.get("/playlists");
    } catch (error) {
      console.error("Error getting playlists");
    }
    return playlists.data;
  },
};
