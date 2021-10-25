//WAY TO SET STATE FOR INDEX.JS AND PERFOM LOGIC USING STATE
export default {
  setPlaying(context, playing) {
    context.commit("setPlaying", playing);
  },

  setGamemode(context, gamemode) {
    context.commit("setGamemode", gamemode);
  },
};
