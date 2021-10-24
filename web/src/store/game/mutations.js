//ONLY CALL MUTATIONS FROM ACTIONS
export default {
  setPlaying(state, playing) {
    state.playing = playing;
  },

  setGamemode(state, gamemode) {
    state.gamemode = gamemode;
  },
};
