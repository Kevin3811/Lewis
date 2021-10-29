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
      <div class="video-buttons">
        <!-- restart button -->
        <div class="restart" v-on:click="restart">
          <img
            :src="'./restart.png'"
            alt="restart"
            width="30"
            height="30"
            title="restart"
          />
        </div>
        <!-- rewind button -->
        <div class="rewind" v-on:click="rewind">
          <img
            :src="'./rewind.png'"
            alt="rewind"
            width="30"
            height="30"
            title="rewind"
          />
        </div>
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
      console.log("get: ", this.player);
    },
    changeVolumePercent() {
      this.player.setVolume(this.volumePercent);
    },
    rewind() {
      console.log("rewind");
    },
    restart() {
      console.log("restart");
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
  opacity: 80%;
  border-radius: 7px;
  min-width: 150px;
}
.video-buttons {
  flex-flow: row;
}
.restart {
  background-color: rgba(255, 255, 255, 0.664);
  width: 40px;
  height: 40px;
  border-radius: 4px;
  padding-top: 4px;
  margin-left: 30px;
  margin-bottom: 10px;
  float: left;
}
.restart:hover {
  cursor: pointer;
  background-color: white;
}
.rewind {
  background-color: rgba(255, 255, 255, 0.664);
  width: 40px;
  height: 40px;
  border-radius: 4px;
  padding-top: 4px;
  margin-right: 30px;
  margin-bottom: 10px;
  float: right;
}
.rewind:hover {
  cursor: pointer;
  background-color: white;
}
</style>
