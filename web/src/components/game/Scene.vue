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
    <div class="controls">
      <div class="slider">
        <p>Volume ({{ volumePercent }}%)</p>
        <input
          type="range"
          min="0"
          max="100"
          v-model="volumePercent"
          id="volume"
          v-on:input="changeVolumePercent"
        />
      </div>
      <div class="slider">
        <p>Playback Rate ({{ playbackRate }}x)</p>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          v-model="playbackRate"
          id="speed"
          v-on:input="changePlaybackRate"
        />
      </div>
      <div>
        <button></button>
        <button></button>
      </div>
    </div>
    <div v-if="isGuessing">
      <Guess />
    </div>
    <!--Guess Button-->
    <div v-on:click="guessButton" class="guess-button">Guess</div>
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
      volumePercent: 0,
      playbackRate: 1,
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
    isGuessing() {
      return this.$store.getters.getIsGuessing;
    },
  },
  created() {
    window.addEventListener("resize", this.resizeEvent);
  },
  mounted() {
    this.player.setVolume(this.volumePercent);
    console.log(this.player.getAvailablePlaybackRates());
  },
  methods: {
    resizeEvent() {
      this.youtubeContainer.onResize();
    },
    guessButton() {
      this.$store.dispatch("setIsGuessing", !this.isGuessing);
    },
    changePlaybackRate() {
      this.player.setPlaybackRate(this.playbackRate);
      console.log(this.playbackRate);
      console.log("get: ", this.player.getPlaybackRate());
    },
    changeVolumePercent() {
      this.player.setVolume(this.volumePercent);
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
.guess-button {
  background: gray;
  width: 100px;
  height: 30px;
  opacity: 70%;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  bottom: 50px;
  left: 50%;
  color: white;
  cursor: pointer;
}
.controls {
  float: right;
  margin-top: 5px;
  margin-right: 15px;
  text-align: center;
  color: white;
  background: gray;
  opacity: 60%;
  border-radius: 7px;
}
</style>
