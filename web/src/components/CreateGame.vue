<template>
  <div class="createGame">
    <div class="form">
      <b-form @submit="submit" autocomplete="off">
        <!--username-->
        <b-form-group
          id="input-group-1"
          label="Display Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="username"
            type="text"
            placeholder="username"
            required
          ></b-form-input>
        </b-form-group>
        <!--round length-->
        <b-form-group
          id="input-group-2"
          label="Round Length:"
          label-for="input-2"
          class="roundLength"
        >
          <b-form-select
            id="input-2"
            v-model="roundLength"
            :options="roundLengths"
            required
          ></b-form-select>
        </b-form-group>
        <!--round count-->
        <b-form-group
          id="input-group-3"
          label="Round Count:"
          label-for="input-3"
          class="roundCount"
        >
          <b-form-select
            id="input-3"
            v-model="roundCount"
            :options="roundCounts"
            required
          ></b-form-select>
        </b-form-group>
        <div class="playlists">
          <div
            v-for="playlist in playlists"
            :key="playlist"
            :class="{
              playlist: true,
              selectedPlaylist: selectedPlaylists.includes(playlist),
            }"
            v-on:click="togglePlaylist(playlist)"
          >
            {{ playlist }}
          </div>
        </div>
        <div class="footer">
          <b-button v-on:click="cancel" variant="danger">Cancel</b-button>
          <b-button type="submit" variant="primary">{{ startButton }}</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import videoApi from "../api/video.js";
import lobbyApi from "../api/lobby.js";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "gamemode",
  props: {
    gamemode: String,
  },
  data() {
    return {
      username: "user",
      roundLength: 180,
      roundCount: 10,
      playlist: undefined,
      selectedPlaylists: [],
      roundLengths: [
        { text: "30 Seconds", value: 30 },
        { text: "1 Minute", value: 60 },
        { text: "1 Minute 30 Seconds", value: 90 },
        { text: "2 Minutes", value: 120 },
        { text: "3 Minutes", value: 180 },
        { text: "4 Minutes", value: 240 },
        { text: "5 Minutes", value: 300 },
      ],
      roundCounts: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "9", value: 9 },
        { text: "10", value: 10 },
        { text: "15", value: 15 },
        { text: "20", value: 20 },
      ],
    };
  },
  computed: {
    playlists() {
      return this.$store.getters.getPlaylists;
    },
    startButton() {
      if (this.gamemode === "singleplayer") {
        return "Start";
      } else {
        return "Invite";
      }
    },
  },
  mounted() {
    // console.log("create game for:", this.gamemode);
  },
  methods: {
    async submit(event) {
      //Prevent default to prevent page from refreshing when submitting form
      event.preventDefault();
      //Common settings between multiplayer and singleplayer
      this.$store.dispatch("setRoundLength", this.roundLength);
      this.$store.dispatch("setRoundCount", this.roundCount);
      this.$store.dispatch("setCurrentRound", 1);
      this.$store.dispatch("setPlaylists", this.playlists);
      const clientCode = uuidv4();
      let user = {
        username: this.username,
        clientCode: clientCode,
        score: 0,
        latGuess: undefined,
        lonGuess: undefined,
        previousScore: undefined,
        scores: [],
        guesses: [],
      };
      this.$store.dispatch("setUsername", this.username);
      this.$store.dispatch("setClientCode", clientCode);

      //Singleplayer
      if (this.gamemode === "singleplayer") {
        let videos = await videoApi.getVideosForPlaylists(
          this.selectedPlaylists
        );
        this.$store.dispatch("setVideos", videos);
        this.$store.dispatch("addUser", user);
        console.log("videos: ", videos);
        this.$router.push({ name: "Singleplayer" });
      }
      //Multiplayer
      else {
        const lobbyCode = uuidv4();
        this.$store.dispatch("setLobbyCode", lobbyCode);
        const game = {
          gameCode: lobbyCode,
          roundCount: this.roundCount,
          currentRound: 0,
          roundLength: this.roundLength,
          includedPlaylists: this.selectedPlaylists,
        };
        let videos = await lobbyApi.createGame(game);
        this.$store.dispatch("setVideos", videos);
        this.$store.dispatch("setIsHost", true);
        //In multiplayer set the lobby code for the user
        user.lobbyCode = lobbyCode;
        let player = await lobbyApi.addPlayerToLobby(user);
        console.log("player: ", player);
        this.$store.dispatch("addUser", user);
        console.log("videos: ", videos);
        // console.log("game: ", game);
        // this.$router.replace({
        //   name: "Multiplayer",
        //   params: { lobbyCode: lobbyCode },
        // });
      }
    },
    cancel() {
      this.$emit("cancel-create-game");
    },
    togglePlaylist(playlist) {
      if (this.selectedPlaylists.includes(playlist)) {
        this.selectedPlaylists.splice(
          this.selectedPlaylists.indexOf(playlist),
          1
        );
      } else {
        this.selectedPlaylists.push(playlist);
      }
    },
  },
};
</script>

<style scoped>
.createGame {
  width: 25%;
  height: 40%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-radius: 15px;
  background-color: #17a2b8;
  opacity: 95%;

  margin: auto;
}
.form {
  padding: 15px;
  text-align: center;
}
.roundLength {
  width: 45%;
  float: left;
}
.roundCount {
  width: 45%;
  float: right;
}
.footer {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  justify-content: space-between;
  margin: 0 7% 3% 7%;
}
.playlists {
  display: flex;
  width: 100%;
  display: inline-block;
}
.cancel-button {
  background-color: rgba(255, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  border-radius: 5px;
  justify-content: center;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
}
.cancel-button:hover {
  transform: scale(1.05);
}
.submit-button {
  margin-left: 20%;
  background-color: green;
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  justify-content: center;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
}
.submit-button:hover {
  transform: scale(1.05);
}
.playlist {
  background-color: gray;
  opacity: 70%;
  border-radius: 5px;
  align-items: center;
  margin: 1.5%;
  padding: 0 3px 0 3px;
  height: 30px;
  display: inline-block;
  position: relative;
}
.playlist:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.selectedPlaylist {
  background-color: gray;
  opacity: 100%;
}
</style>
