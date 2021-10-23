<template>
  <div>
    <div class="video-container">
      <div class="video-foreground">
        <youtube
          :video-id="videoId"
          ref="youtube"
          @playing="playing"
          :nocookie="true"
          :fitParent="true"
          :playerVars="playerVars"
        ></youtube>
      </div>
    </div>
    <div id="player"></div>
    <div>
      <Scores />
    </div>
    <div>
      <Guess />
    </div>
  </div>
</template>

<script>
import Scores from "./Scores";
import Guess from "./Guess";

export default {
  name: "Scene",
  components: {
    Scores,
    Guess,
  },
  data() {
    return {
      videoId: "gMllzBuAbBg",
      youtubePrefix: "https://www.youtube-nocookie.com/embed/",
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        disablekb: 1,
        modestbranding: 1,
        start: 40,
        iv_load_policy: 3,
        playsinline: 1,
        rel: 0,
      },
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  mounted() {
    console.log("Player: ", this.player);
    this.player.playVideo();
    this.player.mute();
  },
  methods: {},
};
</script>

<style scoped>
.video-container {
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: calc(100% + 120px);
  /* height: 100%; */
  z-index: -1;
}
.video-foreground {
  pointer-events: none;
}
</style>
