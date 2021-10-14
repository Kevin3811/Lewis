<template>
  <div>
    <div class="video-container">
      <div class="video-foreground">
        <YouTube
          :src="youtubePrefix + videoId"
          ref="youtube"
          :vars="playerVars"
          @ready="ready"
        >
        </YouTube>
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
import YouTube from "vue3-youtube";

export default {
  name: "Scene",
  components: {
    Scores,
    Guess,
    YouTube,
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
      player: null,
    };
  },
  mounted() {
    this.player = this.$refs.youtube;
    console.log("player: ", this.player);
  },
  methods: {
    ready() {
      console.log("ready");
      // this.player.playVideo();
      this.player.mute();
    },
  },
};
</script>

<style scoped>
.video-container {
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: calc(100% + 120px);
}
.video-foreground {
  pointer-events: none;
}
</style>
