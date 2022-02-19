import axios from "axios";

const instance = axios.create({
  timeout: 1000,
});

export default {
  async getAllPlaylists() {
    let playlists;
    try {
      playlists = await instance.get("/lobby/playlists");
    } catch (error) {
      console.error("Error getting playlists: ", error);
    }
    return playlists.data;
  },
};
