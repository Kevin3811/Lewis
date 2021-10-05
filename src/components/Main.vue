<template>
  <Header></Header>
  <div class="main">
    <h3>Game Mode</h3>
    <ul class="cards">
      <li>
        <Card
          imageName="singleplayer"
          title="Singleplayer"
          height="50"
          width="50"
          v-on:click="test('singleplayer')"
        />
      </li>
      <li>
        <Card
          imageName="multiplayer"
          title="Multiplayer"
          height="50"
          width="50"
          v-on:click="test('multiplayer')"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Card from "./Card.vue";

export default {
  name: "Main",
  components: {
    Header,
    Card,
  },
  methods: {
    test(name) {
      console.log("test! ", name);
    },
  },
};
</script>

<style scoped>
.cards {
  display: inline;
}
</style>
