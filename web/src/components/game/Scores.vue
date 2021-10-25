<template>
  <div class="scores">
    <h4 class="leaderboardheader">Leaderboard</h4>
    <div
      v-for="lobbyUser in lobbyUsers"
      :key="lobbyUser.clientCode"
      :class="lobbyUser.clientCode === clientCode ? 'currentuser' : 'otheruser'"
    >
      {{ lobbyUser.username }}
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
  min-width: 100px;
  margin-top: 1em;
  margin-left: 0.5em;
  opacity: 60%;
}
.leaderboardheader {
  color: white;
  opacity: 100%;
  text-decoration: underline;
  font-size: 1.2em;
}
.otheruser {
  color: white;
}
.currentuser {
  color: rgb(1, 255, 1);
}
</style>
