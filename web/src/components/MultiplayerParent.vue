<template>
  <div>
    <MultiplayerLobby v-if="!gameStarted" />
    <Scene v-if="gameStarted" />
  </div>
</template>

<script>
import MultiplayerLobby from "./MultiplayerLobby.vue";
import Scene from "./game/Scene.vue";

export default {
  components: {
    MultiplayerLobby,
    Scene,
  },
  computed: {
    gameStarted() {
      return this.$store.getters.getGameStarted;
    },
  },
};
</script>

<style></style>
