<template>
  <div>
    <b-modal
      v-model="createGame"
      centered
      title="Create Game"
      :hide-footer="true"
    >
      <CreateGame
        :gamemode="selectedGamemode"
        v-on:cancel-create-game="cancelCreateGame"
      />
    </b-modal>
    <div
      class="main"
      :style="{
        'background-image': `${backgroundImages[new Date().getDate() % 4]}`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
      }"
    >
      <div class="home-content">
        <h1 class="home-text outline">Explorer Lewis</h1>
        <h3 class="home-text outline">
          Explore the world and test your geographical knowledge
        </h3>
        <div class="gamemode-buttons">
          <b-button class="play-button" v-on:click="play('singleplayer')"
            >Singleplayer</b-button
          >
          <b-button class="play-button" v-on:click="play('multiplayer')"
            >Multiplayer</b-button
          >
        </div>
      </div>
      <!--For multiplayer create or join lobby-->
      <!--Change ok button to cancel button since there isn't a way to only display cancel-->
      <b-modal
        id="lobbyselect"
        title="Multiplayer Lobby"
        centered
        :ok-only="true"
        :ok-title="'Cancel'"
        v-model="showModal"
      >
        <div class="modalButtons">
          <b-button class="modalButton" v-on:click="play('multiplayer')"
            >Create New Lobby</b-button
          >
          <!--TODO: Join lobby should do something-->
          <b-button class="modalButton">Join Existing Lobby</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import playlistApi from "../api/playlist.js";
import CreateGame from "./CreateGame.vue";

export default {
  name: "Main",
  components: {
    CreateGame,
  },
  data() {
    return {
      selectedGamemode: "",
      cardStyle: `max-width: 20rem; cursor: pointer; background-color:gray; max-height: 25rem; min-height: 25rem; text-align: center;`,
      createGame: false,
      showModal: false,
      backgroundImages: [
        "url(./winter.jpg)",
        "url(./spring.jpg)",
        "url(./summer.jpg)",
        "url(./fall.jpg)",
      ],
    };
  },
  computed: {
    gamemode() {
      return this.$store.getters.getGamemode;
    },
  },
  async mounted() {
    this.resetVariables();
    let playlists = await playlistApi.getAllPlaylists();
    this.$store.dispatch("setPlaylists", playlists);
  },
  methods: {
    play(gamemode) {
      this.selectedGamemode = gamemode;
      this.createGame = true;
      if (gamemode === "singleplayer") {
        this.$store.dispatch("setIsHost", true);
      } else if (gamemode === "multiplayer") {
        this.showModal = false;
        this.$store.dispatch("setIsHost", false);
      }
    },
    cancelCreateGame() {
      this.createGame = false;
    },
    resetVariables() {
      console.log("reset");
      this.$store.dispatch("resetGame");
    },
  },
};
</script>

<style>
.main {
  position: relative;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  font-family: Tahoma, Verdana, sans-serif;
}
.home-content {
  justify-content: center;
  padding-top: 20%;
}
.gamemode-buttons {
  display: flex;
  column-gap: 4em;
  justify-content: center;
  padding: 1em;
}
#nav a.router-link-exact-active {
  background-color: gray;
  text-align: center;
}
.modalButtons {
  display: flex;
  justify-content: center;
}
.modalButton {
  margin: auto;
}
.play-button {
  background-color: rgba(0, 0, 0, 0.3);
  color: rgb(255, 255, 255);
  border-color: rgba(0, 0, 0, 0.1);
  font-size: 1.5em;
}
.home-text {
  color: white;
  text-align: center;
}
/* .outline {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
} */
</style>
