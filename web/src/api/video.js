import axios from "axios";

const SERVER_URL = "http://localhost:8081/lobby";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
});

export default {
  async getVideosForPlaylist(playlist) {
    let videos;
    try {
      videos = await instance.get("/playlist-videos", {
        params: {
          playlist: playlist,
        },
      });
    } catch (error) {
      console.error("Error getting videos");
    }
    return videos.data;
  },
};
