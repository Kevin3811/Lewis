<template>
  <div>
    <b-container>
      <div class="form">
        <b-form @submit="submit" autocomplete="off" ref="form">
          <b-row align-h="center">
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
          </b-row>
          <b-row align-h="center">
            <!--round length-->
            <b-col align-self="center">
              <b-form-group
                id="input-group-2"
                label="Round Length:"
                label-for="input-2"
              >
                <b-form-select
                  id="input-2"
                  v-model="roundLength"
                  :options="roundLengths"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <!--round count-->
            <b-col align-self="center">
              <b-form-group
                id="input-group-3"
                label="Round Count:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  v-model="roundCount"
                  :options="roundCounts"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Playlist select -->
          <b-row>
            <b-col>
              <b-form-group
                label="Included Playlists"
                description="Leaving empty will include all"
              >
                <b-form-checkbox-group
                  v-model="includedPlaylists"
                  v-on:change="includedChanged"
                  :options="includedPlaylistOptions"
                  stacked
                >
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Excluded Playlists"
                description="Leaving empty will exclude none"
              >
                <b-form-checkbox-group
                  v-model="excludedPlaylists"
                  v-on:change="excludedChanged"
                  :options="excludedPlaylistOptions"
                  stacked
                >
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- Footer buttons -->
          <b-row class="mt-3">
            <b-col>
              <b-button v-on:click="cancel" variant="danger">Cancel</b-button>
            </b-col>
            <b-col>
              <b-button type="submit" variant="primary">{{
                startButton
              }}</b-button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import websocket from "../api/websocket";
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
      includedPlaylists: [],
      excludedPlaylists: [],
      includedPlaylistOptions: [],
      excludedPlaylistOptions: [],
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
    startButton() {
      if (this.gamemode === "singleplayer") {
        return "Start";
      } else {
        return "Invite";
      }
    },
  },
  mounted() {
    //Need to make separate object arrays for include and exclude list so they don't share the same disabled properties
    this.$store.getters.getPlaylists.forEach((playlist) => {
      this.includedPlaylistOptions.push({
        text: playlist,
        value: playlist,
        disabled: false,
      });
      this.excludedPlaylistOptions.push({
        text: playlist,
        value: playlist,
        disabled: false,
      });
    });
  },
  methods: {
    //Disable the corresponding playlists in the exclude list
    includedChanged(included) {
      this.excludedPlaylistOptions.forEach((playlist, i) => {
        const index = included.findIndex((p) => p === playlist.value);
        if (index !== -1) {
          this.excludedPlaylistOptions[i].disabled = true;
        } else {
          this.excludedPlaylistOptions[i].disabled = false;
        }
      });
    },
    //Disable the correspondnig playlists in the include list
    excludedChanged(excluded) {
      this.includedPlaylistOptions.forEach((playlist, i) => {
        const index = excluded.findIndex((p) => p === playlist.value);
        if (index !== -1) {
          this.includedPlaylistOptions[i].disabled = true;
        } else {
          this.includedPlaylistOptions[i].disabled = false;
        }
      });
    },
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
        gameCode: undefined,
        score: 0,
        guesses: [],
        guessing: false,
        host: true,
      };
      this.$store.dispatch("setUsername", this.username);
      this.$store.dispatch("setClientCode", clientCode);
      const lobbyCode = uuidv4();
      this.$store.dispatch("setLobbyCode", lobbyCode);
      const game = {
        gameCode: lobbyCode,
        roundCount: this.roundCount,
        currentRound: 0,
        roundLength: this.roundLength,
        includedPlaylists: this.includedPlaylists,
        excludedPlaylists: this.excludedPlaylists,
      };
      let videos = await lobbyApi.createGame(game);
      this.$store.dispatch("setVideos", videos);
      this.$store.dispatch("setIsHost", true);
      this.$store.dispatch("setGamemode", "multiplayer");
      user.gameCode = lobbyCode;
      user.host = true;
      let player = await lobbyApi.addPlayerToLobby(user);
      user = {
        username: player.username,
        clientCode: player.clientCode,
        gameCode: player.gameCode,
        score: player.score,
        guesses: [],
        guessing: false,
        host: true,
      };
      this.$store.dispatch("setPlayer", user);
      this.$store.dispatch("addUser", user);
      console.log("videos: ", videos);
      if (this.gamemode === "singleplayer") {
        websocket.createConnection(lobbyCode);
        lobbyApi.startGame(lobbyCode);
        this.$router.push({ name: "Singleplayer" });
      } else {
        //If it's multiplayer, don't start the game right away and go to the waiting room instead
        this.$router.replace({
          name: "Multiplayer",
          params: { lobbyCode: lobbyCode },
        });
      }
    },
    cancel() {
      this.$emit("cancel-create-game");
    },
  },
};
</script>

<style>
.form {
  padding: 15px;
  user-select: none;
}
</style>
