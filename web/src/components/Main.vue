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
        <!--TODO: get rid of hard coded lobby code -->
        <router-link
          :to="{ name: 'Multiplayer', params: { lobbyCode: '123' } }"
        >
          <b-card
            footer="Multiplayer"
            img-top
            img-src="./multiplayer.png"
            img-height="300px;"
            :style="cardStyle"
            class="mb-2"
            v-on:click="play('multiplayer')"
          ></b-card>
        </router-link>
      </div>
      <!-- <button v-on:click="test">
        Test
      </button> -->
    </div>
  </div>
</template>

<script>
import playlistApi from "../api/playlist.js";
// import video from "../api/video.js";
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
    test() {
      // let playlists = playlist.getAllPlaylists();
      // playlists.forEach((playlist) => {
      //   console.log("playlist: ", playlist);
      // });
      // let playlists = this.$store.getters.getPlaylists;
      // console.log("test: ", playlists);
      // let videos = video.getVideosForPlaylist("Cities");
      // console.log("Test: ", videos);
    },
    play(gamemode) {
      this.selectedGamemode = gamemode;
      this.createGame = true;
      if (gamemode === "singleplayer") {
        this.$store.dispatch("setIsHost", true);
      } else if (gamemode === "multiplayer") {
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
</style>
