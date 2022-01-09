<template>
  <div>
    <div v-if="createGame">
      <CreateGame
        :gamemode="selectedGamemode"
        v-on:cancel-create-game="cancelCreateGame"
      />
    </div>
    <div class="main">
      <h3>Game Mode</h3>
      <div class="deck">
        <b-card
          footer="Singleplayer"
          img-top
          img-src="./singleplayer.png"
          img-height="300px;"
          :style="cardStyle"
          class="mb-2"
          v-on:click="play('singleplayer')"
        >
        </b-card>
        <b-card
          footer="Multiplayer"
          img-top
          img-src="./multiplayer.png"
          img-height="300px;"
          :style="cardStyle"
          class="mb-2"
          v-b-modal.lobbyselect
        ></b-card>
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

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
h3 {
  text-align: center;
  padding-top: 1em;
  padding-bottom: 1.5em;
}
.deck {
  flex-flow: row wrap;
  display: flex;
  justify-content: center;
  column-gap: 4em;
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
</style>
