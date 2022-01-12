<template>
  <div class="lobby">
    <div class="lobbyHeader">
      <h2>
        Waiting for game to start
      </h2>
      <b-button
        class="linkButton"
        variant="primary"
        :title="lobbyCode"
        v-on:click="copyCode"
        >Copy Game Code</b-button
      >
      <b-button
        class="linkButton"
        variant="primary"
        :title="'localhost:8080/multiplayer/' + lobbyCode"
        v-on:click="copyLink"
        >Copy Game Link</b-button
      >
    </div>
    <div>
      <b-button v-if="isHost" variant="primary" v-on:click="startGameButton"
        >Start Game</b-button
      >
    </div>
    <div v-if="!isHost && !lobbyEntered" class="joinLobby">
      <b-form inline @submit="enterLobby" autocomplete="off">
        <b-form-input
          v-model="username"
          placeholder="Enter username"
          class="mb-2 mb-sm-0"
          required
        ></b-form-input>
        <b-button type="submit" variant="primary">Enter Lobby</b-button>
      </b-form>
    </div>
    <div v-for="player in players" :key="player.clientCode">
      {{ player.username }}
    </div>
  </div>
</template>

<script>
import websocket from "../api/websocket";
import lobbyApi from "../api/lobby";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "multiplayer-lobby",
  data() {
    return {
      lobbyCode: this.$route.params.lobbyCode,
      username: "",
      lobbyEntered: false,
    };
  },
  computed: {
    isHost() {
      return this.$store.getters.getIsHost;
    },
    player() {
      return this.$store.getters.getPlayer;
    },
    players() {
      return this.$store.getters.getLobbyUsers;
    },
    gameStarted() {
      return this.$store.getters.getGameStarted;
    },
  },
  mounted() {
    //subscribe to websocket for lobby
    websocket.createConnection(this.lobbyCode);
    //Set lobbycode variable from route parameter
    this.$store.dispatch("setLobbyCode", this.lobbyCode);
  },
  async beforeDestroy() {
    await lobbyApi.deletePlayerFromLobby(this.player);
  },
  watch: {
    gameStarted(val) {
      console.log("started: ", val);
    },
  },
  methods: {
    startGameButton() {
      lobbyApi.startGame(this.lobbyCode);
    },
    copyCode() {
      navigator.clipboard.writeText(this.lobbyCode);
    },
    copyLink() {
      navigator.clipboard.writeText(
        "localhost:8080/multiplayer/" + this.lobbyCode
      );
    },
    enterLobby(event) {
      //Prevent default to prevent page from refreshing when submitting form
      event.preventDefault();
      //Create player object
      const clientCode = uuidv4();
      let player = {
        username: this.username,
        clientCode: clientCode,
        gameCode: this.lobbyCode,
        score: 0,
        latGuess: undefined,
        lonGuess: undefined,
        previousScore: undefined,
        scores: [],
        guesses: [],
        isHost: false,
        guessing: false,
      };
      this.$store.dispatch("setPlayer", player);
      //Add player to lobby server side
      lobbyApi.addPlayerToLobby(player);
      console.log("enter");
    },
  },
};
</script>

<style>
.lobby {
  text-align: center;
  align-content: center;
  background-color: gray;
  min-width: 100%;
  min-height: 100%;
}
.linkButton {
  margin: 10px;
}
.joinLobby {
  display: flex;
  justify-content: center;
}
.usernameInput {
  width: 30%;
  margin-bottom: 2%;
}
</style>
