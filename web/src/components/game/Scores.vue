<template>
  <div class="scores">
    <h4 class="leaderboardheader">Scores</h4>
    <div
      v-for="lobbyUser in lobbyUsers"
      :key="lobbyUser.clientCode"
      :class="{
        currentuser: lobbyUser.clientCode === clientCode,
        otheruser: lobbyUser.clientCode !== clientCode,
        user: true,
      }"
    >
      <Score :user="lobbyUser" />
    </div>
  </div>
</template>

<script>
import Score from "./Score.vue";

export default {
  name: "Scores",
  components: {
    Score,
  },
  computed: {
    lobbyUsers() {
      return this.$store.getters.getLobbyInScoreOrder;
    },
    clientCode() {
      return this.$store.getters.getClientCode;
    },
    currentRound() {
      return this.$store.getters.getCurrentRound;
    },
  },
};
</script>

<style scoped>
.scores {
  position: absolute;
  z-index: 2;
  background-color: gray;
  min-height: 30px;
  min-width: 200px;
  max-width: 20%;
  margin-top: 1em;
  margin-left: 0.5em;
  opacity: 80%;
  padding: 5px;
  border-radius: 10px;
}
.leaderboardheader {
  color: white;
  opacity: 100%;
  font-size: 1.2em;
  text-align: center;
  text-decoration: underline;
}
.otheruser {
  color: white;
}
.currentuser {
  color: rgb(1, 255, 1);
}
.user {
  display: inline-block;
  width: 100%;
}
</style>
