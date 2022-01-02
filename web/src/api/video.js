import axios from "axios";

const SERVER_URL = "http://localhost:8081/lobby";

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
});

export default {
  async getVideosForPlaylists(playlist) {
    let videos;
    //Spring boot needs to take array params in the form of /endpoint?array=val1,val2,...
    //so manually format them correctly
    let playlistParam = "";
    for (let i = 0; i < playlist.length - 1; i++) {
      playlistParam += playlist[i];
      playlistParam += ",";
    }
    if (playlist.length !== 0) {
      playlistParam += playlist[playlist.length - 1];
    }
    try {
      videos = await instance.get("/playlists-videos", {
        params: {
          playlists: playlistParam,
        },
      });
    } catch (error) {
      console.error("Error getting videos");
    }
    return videos.data;
  },
};
