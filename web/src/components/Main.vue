<template>
  <div>
    <b-navbar toggleable="lg" variant="info" type="info">
      <b-navbar-brand
        tag="h1"
        style="cursor: pointer; color: white; font-size: 2em;"
        v-on:click="returnHome"
        >Lewis & Clark</b-navbar-brand
      >
    </b-navbar>
    <div class="main">
      <div v-if="!playing">
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
            v-on:click="play('multiplayer')"
          ></b-card>
        </div>
      </div>
      <div v-if="playing">
        <Scene />
      </div>
    </div>
  </div>
</template>

<script>
import Scene from "./game/Scene";

export default {
  name: "Main",
  components: {
    Scene,
  },
  data() {
    return {
      singleplayer: false,
      multiplayer: false,
      cardStyle: `max-width: 20rem; cursor: pointer; background-color:gray; max-height: 25rem; min-height: 25rem; text-align: center;`,
    };
  },
  computed: {
    playing() {
      return this.$store.getters.getPlaying;
    },
  },
  methods: {
    play(gamemode) {
      this.$store.dispatch("setPlaying", !this.playing);
      this.$store.dispatch("setGamemode", gamemode);
      if (gamemode === "singleplayer") {
        this.$store.dispatch("setIsHost", true);
      } else if (gamemode === "multiplayer") {
        this.$store.dispatch("setIsHost", false);
      }
    },
    returnHome() {
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
</style>
