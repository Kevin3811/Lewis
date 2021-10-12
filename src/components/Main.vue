<template>
  <Header></Header>
  <div class="main">
    <h3>Game Mode</h3>
    <div v-if="!playing">
      <ul class="cards">
        <li>
          <Card
            imageName="singleplayer"
            title="Singleplayer"
            height="50"
            width="50"
            v-on:click="play('singleplayer')"
          />
        </li>
        <li>
          <Card
            imageName="multiplayer"
            title="Multiplayer"
            height="50"
            width="50"
            v-on:click="play('multiplayer')"
          />
        </li>
      </ul>
    </div>
    <div v-if="playing">
      <Scene />
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import Card from "./Card";
import Scene from "./game/Scene";

export default {
  name: "Main",
  components: {
    Header,
    Card,
    Scene,
  },
  data() {
    return {
      playing: false,
      singleplayer: false,
      multiplayer: false,
    };
  },
  methods: {
    play(gamemode) {
      console.log("test! ", gamemode);
      this.playing = true;
    },
  },
};
</script>

<style scoped>
.cards {
  display: inline;
}
</style>
