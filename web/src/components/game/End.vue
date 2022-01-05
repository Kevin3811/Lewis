<template>
  <div class="end">
    <div class="header">
      <label class="gameResults">Game Results</label>
      <b-button variant="primary">Play Again</b-button>
    </div>
    <div class="plot">
      <Plotly :data="data" :layout="layout" :display-mode-bar="false"></Plotly>
    </div>
    <div class="endFooter">
      <b-button variant="primary">Show Guesses</b-button>
    </div>
  </div>
</template>

<script>
import { Plotly } from "vue-plotly";
export default {
  name: "end",
  components: {
    Plotly,
  },
  data() {
    return {
      data: [],
      type: "scatter",
    };
  },
  computed: {
    layout() {
      let layout = {
        title: "Scores",
        showlegend: false,
        xaxis: {
          autotick: false,
          range: [1, this.roundCount],
          tick0: 1,
          fixedrange: true,
          gridcolor: "#888888",
        },
        yaxis: {
          range: [0, this.roundCount * 1000],
          tick0: 0,
          dtick: 1000,
          fixedrange: true,
          gridcolor: "#888888",
        },
      };
      return layout;
    },
    roundCount() {
      return this.$store.getters.getRoundCount;
    },
  },
  mounted() {
    let users = this.$store.getters.getLobbyUsers;
    let data = [];
    users.forEach((user) => {
      let x = [];
      for (let i = 1; i <= user.scores.length; i++) {
        x.push(i);
      }
      let plot = {};
      plot.x = x;
      plot.y = user.scores;
      plot.name = user.username;
      if (user.clientCode === this.$store.getters.getClientCode) {
        plot.line = {
          color: "green",
        };
      } else {
        plot.line = {
          color: "gray",
        };
      }
      data.push(plot);
    });
    this.data = data;
  },
};
</script>

<style>
.header {
  margin: 2% 3% 2% 3%;
  display: flex;
  justify-content: space-between;
}
.gameResults {
  font-size: 2em;
}
.end {
  width: 100%;
  height: 100%;
  background-color: rgb(177, 177, 177);
}
.plot {
  width: 70%;
  margin: auto;
}
.endFooter {
  width: 100%;
  margin: 1% 0 1% 0;
  display: flex;
  justify-content: center;
}
</style>
