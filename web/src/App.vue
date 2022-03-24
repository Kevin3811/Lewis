<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import lobbyApi from "./api/lobby.js";

export default {
  name: "App",
  components: {
    Header,
  },
  computed: {
    player() {
      return this.$store.getters.getPlayer;
    },
  },
  created() {
    window.addEventListener("beforeunload", this.removePlayer);
  },
  methods: {
    removePlayer() {
      if (
        this.player.clientCode !== undefined &&
        this.player.gameCode !== undefined
      ) {
        lobbyApi.deletePlayerFromLobby(this.player);
      }
    },
  },
};
</script>

<style scoped>
.app {
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  background-color: rgb(34, 34, 34);
}
</style>
