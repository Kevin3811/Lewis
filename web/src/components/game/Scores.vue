<template>
  <div class="scores">
    <h4 class="leaderboardheader">Scores</h4>
    <div
      v-for="lobbyUser in lobbyUsers"
      :key="lobbyUser.clientCode"
      :class="lobbyUser.clientCode === clientCode ? 'currentuser' : 'otheruser'"
    >
      <p>
        <span class="username">{{ lobbyUser.username }}</span>
        <span class="score">{{ lobbyUser.score }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scores",
  components: {},
  computed: {
    lobbyUsers() {
      return this.$store.getters.getLobbyInScoreOrder;
    },
    clientCode() {
      return this.$store.getters.getClientCode;
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
  text-decoration: underline;
  font-size: 1.2em;
  text-align: center;
}
.otheruser {
  color: white;
}
.currentuser {
  color: rgb(1, 255, 1);
}
.username {
  text-align: left;
}
.score {
  float: right;
}
</style>
