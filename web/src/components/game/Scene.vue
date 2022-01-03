<template>
  <div class="scene">
    <div class="video-container">
      <div class="video-foreground">
        <youtube
          :video-id="currentVideo.url"
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
      <div>Round: {{ currentRound }} / {{ roundCount }}</div>
      <div>Time Left: {{ secondsLeft }}</div>
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
            title="Restart from Beginning"
          />
        </div>
        <!-- rewind button -->
        <div class="rewind" v-on:click="rewind">
          <img
            :src="'./rewind.png'"
            alt="rewind"
            width="30"
            height="30"
            title="Rewind 5 Seconds"
          />
        </div>
      </div>
    </div>
    <div v-if="isGuessing">
      <Guess
        :video="currentVideo"
        v-on:nextRound="nextRound"
        v-on:guessPanelMoved="guessPanelMoved"
        :roundOver="roundOver"
        :guessPanel="guessPanel"
      />
    </div>
    <!--Guess Button-->
    <div v-on:click="guessButton" class="guess-button">Guess</div>
  </div>
</template>

<script>
import Scores from "./Scores";
import Guess from "./Guess";
import websocket from "../../api/websocket.js";

export default {
  name: "Scene",
  components: {
    Scores,
    Guess,
  },
  data() {
    return {
      volumePercent: 0,
      playbackRate: 1,
      countDownTimer: undefined,
      secondsLeft: undefined,
      roundOver: false,
      guessPanel: undefined,
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
    gamemode() {
      return this.$route.name.toLowerCase();
    },
    currentRound() {
      return this.$store.getters.getCurrentRound;
    },
    roundCount() {
      return this.$store.getters.getRoundCount;
    },
    currentVideo() {
      let videos = this.$store.getters.getVideos;
      let currentVideo = videos[(this.currentRound - 1) % videos.length];
      console.log("currentVideo: ", currentVideo);
      return currentVideo;
    },
    playerVars() {
      return {
        autoplay: 1,
        controls: 0,
        loop: 1,
        disablekb: 1,
        modestbranding: 1,
        start: this.currentVideo.startTime,
        iv_load_policy: 3,
        playsinline: 1,
        rel: 0,
      };
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
    this.player.playVideo();
    //Set lobbycode variable from route parameter
    this.$store.dispatch("setLobbyCode", this.$route.params.lobbyCode);
    console.log("lobbyCode: ", this.$store.getters.getLobbyCode);
    //subscribe to websocket for lobby
    websocket.createConnection(this.$route.params.lobbyCode);
    //Start count down timer
    this.startTimer();
  },
  methods: {
    resizeEvent() {
      if (this.youtubeContainer !== undefined) {
        this.youtubeContainer.onResize();
      } else {
        console.log("youtube container undefined");
      }
    },
    guessButton() {
      this.$store.dispatch("setIsGuessing", !this.isGuessing);
    },
    changePlaybackRate() {
      //TODO: Fix playback rate changer
      this.player.setPlaybackRate(this.playbackRate);
      // console.log("localplayback rate: ", this.playbackRate);
      console.log("player playback rate: ", this.player.getPlaybackRate());
      // console.log("available rates: ", this.player.getAvailablePlaybackRates());
    },
    changeVolumePercent() {
      this.player.setVolume(this.volumePercent);
    },
    async rewind() {
      let duration = await this.player.getCurrentTime();
      let seekToTime;
      if (duration - 5 < this.playerVars.start) {
        seekToTime = this.playerVars.start;
      } else {
        seekToTime = duration - 5;
      }
      this.player.seekTo(seekToTime);
    },
    restart() {
      this.player.seekTo(this.playerVars.start);
    },
    nextRound() {
      this.$store.dispatch(
        "setCurrentRound",
        this.$store.getters.getCurrentRound + 1
      );
      this.roundOver = false;
      this.$store.dispatch("setIsGuessing", false);
      this.startTimer();
    },
    startTimer() {
      this.secondsLeft = this.$store.getters.getRoundLength;
      clearInterval(this.countDownTimer);
      this.countDownTimer = setInterval(() => {
        this.secondsLeft -= 1;
        if (this.secondsLeft <= 0) {
          console.log("round over: ", this.countDownTimer);
          this.roundOver = true;
          clearInterval(this.countDownTimer);
        }
      }, 1000);
    },
    guessPanelMoved(event) {
      this.guessPanel = event;
    },
  },
  onDestroy() {
    window.removeEventListener("resize", this.resizeEvent);
  },
};
</script>

<style scoped>
.scene {
  user-select: none;
}
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
