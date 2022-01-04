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
      <div>
        <div class="leftBox">
          <div class="username">{{ lobbyUser.username }}</div>
          <div
            v-if="lobbyUser.previousScore !== undefined"
            class="previousScore"
          >
            {{ lobbyUser.previousScore }}
          </div>
          <div v-else class="previousScore">---</div>
        </div>
        <div class="score">{{ lobbyUser.score }}</div>
      </div>
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
