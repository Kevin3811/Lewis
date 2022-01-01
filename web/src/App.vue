<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
// import playlistApi from "./api/playlist.js";
import websocket from "./api/websocket.js";

export default {
  name: "App",
  components: {
    Header,
  },
  async mounted() {
    // let playlists = playlistApi.getAllPlaylists();
    // this.$store.dispatch("setPlaylists", playlists);
    websocket.createConnection();
  },
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
}
</style>
