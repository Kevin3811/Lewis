<template>
  <div>
    <div class="video-container">
      <div class="video-foreground">
        <youtube
          :video-id="videoId"
          ref="youtube"
          :nocookie="true"
          :fitParent="true"
          :playerVars="playerVars"
        ></youtube>
      </div>
    </div>
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
    height() {
      return window.innerHeight;
    },
    youtubeContainer() {
      return this.$refs.youtube;
    },
  },
  created() {
    window.addEventListener("resize", this.resizeEvent);
  },
  mounted() {
    this.player.mute();
  },
  methods: {
    resizeEvent() {
      this.youtubeContainer.onResize();
    },
  },
  onDestroy() {
    window.removeEventListener("resize", this.resizeEvent);
  },
};
</script>

<style scoped>
.video-container {
  display: flex;
  flex-flow: column;
  position: absolute;
  width: 100%;
  top: -60px;
  height: calc(100% + 120px);
  z-index: -1;
}
.video-foreground {
  pointer-events: none;
  top: -60px;
  height: calc(100% + 120px);
}
</style>
