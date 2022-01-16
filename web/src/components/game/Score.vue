<template>
  <div>
    <div class="leftBox">
      <div class="username">{{ user.username }}</div>
      <div v-if="roundScore !== undefined" class="previousScore">
        {{ roundScore }}
      </div>
      <div v-else class="previousScore">---</div>
    </div>
    <div class="score">{{ user.score }}</div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  computed: {
    currentRound() {
      return this.$store.getters.getCurrentRound;
    },
    roundScore() {
      let guess = this.user.guesses.find(
        (guess) => guess.round === this.currentRound
      );
      if (guess !== undefined) {
        return guess.score;
      } else {
        return undefined;
      }
    },
  },
};
</script>

<style>
.score {
  float: right;
}
.previousScore {
  font-size: 0.7em;
  margin-left: 45%;
}
.leftBox {
  float: left;
}
</style>
