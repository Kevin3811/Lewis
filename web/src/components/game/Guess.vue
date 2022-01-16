<template>
  <div class="guess" ref="draggableContainer">
    <div class="guess-header" draggable="true" v-on:mousedown="dragMouseDown">
      <span class="guess-text">Place Guess</span>
      <span v-if="currentUser.guessed" class="distance"
        >{{ currentGuess.distance }} away</span
      >
      <span class="exit" v-on:click="exit">x</span>
    </div>
    <l-map
      style="height: 300px"
      :zoom="zoom"
      :center="center"
      v-on:click="mapClick($event)"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <!-- Guess lat lon default to undefined. Only display marker once there is a guess -->
      <div v-if="guessLat !== undefined || guessLon !== undefined">
        <l-marker :lat-lng="[guessLat, guessLon]">
          <!-- <l-icon icon-url="./redmarker.png"> </l-icon> -->
          <l-icon icon-url="/redmarker.png"> </l-icon>
          <l-tooltip :options="{ opacity: 0.4 }">
            {{ playerUsername }}: {{ currentGuess.distance }}
          </l-tooltip>
        </l-marker>
      </div>
      <!-- Show Answer -->
      <div v-if="currentUser.guessed || roundOver">
        <l-marker :lat-lng="[this.video.latitude, this.video.longitude]">
          <!-- <l-icon icon-url="./greenmarker.png"> </l-icon> -->
          <l-icon icon-url="/greenmarker.png"> </l-icon>
          <l-tooltip :options="{ opacity: 0.6 }">Correct Answer</l-tooltip>
        </l-marker>
        <!-- Line connecting answer and player guess. Only attempt to draw line if a guess was made -->
        <l-geo-json
          v-if="currentUser.guessed"
          :geojson="guessGeoJson"
        ></l-geo-json>
      </div>
      <!-- Show all other player answers -->
      <div v-if="showLobbyAnswers && (roundOver || currentUser.guessed)">
        <div v-for="guess in lobbyGuesses" :key="guess.clientCode">
          <div
            v-if="
              guess.clientCode !== playerClientCode &&
                (guess.latGuess !== undefined || guess.lonGuess !== undefined)
            "
          >
            <l-marker :lat-lng="[guess.latGuess, guess.lonGuess]">
              <!-- <l-icon icon-url="./bluemarker.png"> </l-icon> -->
              <l-icon icon-url="/bluemarker.png"> </l-icon>
              <l-tooltip :options="{ opacity: 0.6 }">
                {{ guess.username }}: {{ guess.distance }}
              </l-tooltip>
            </l-marker>
          </div>
        </div>
      </div>
    </l-map>
    <!--Bottom cance, skip/next, and guess buttons-->
    <div class="footer">
      <div class="footer-buttons">
        <span class="cancel-button" v-on:click="exit">Cancel</span>
        <div v-if="currentUser.host">
          <span
            class="next-button"
            v-on:click="next"
            v-if="currentUser.guessed || roundOver"
            >Next</span
          >
          <span class="cancel-button" v-on:click="next" v-else>Skip</span>
        </div>
        <span
          :class="{
            guessButton: !currentUser.guessed && !roundOver,
            disabledGuessButton: currentUser.guessed || roundOver,
          }"
          v-on:click="guess"
          >Guess</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LTooltip,
  LGeoJson,
} from "vue2-leaflet";
import { calculateDistanceAndScore } from "../../scripts/geocalculator.js";
import lobbyApi from "../../api/lobby";

export default {
  name: "Guess",
  components: { LMap, LTileLayer, LMarker, LIcon, LTooltip, LGeoJson },
  props: {
    video: Object,
    roundOver: Boolean,
    guessPanel: Object,
    gamemode: String,
    guessLat: Number,
    guessLon: Number,
  },
  data() {
    return {
      zoom: 1,
      center: [47.41322, -1.219482],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "attribution",
      english: true,
      nativeLanguages: false,
      distance: "",
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
        pixelLeft: undefined,
        pixelTop: undefined,
      },
    };
  },
  mounted() {
    console.log("Current Video: ", this.video);
    //Only reposition guess window if it was already repositioned before
    if (this.guessPanel !== undefined) {
      this.positions = this.guessPanel;
      this.$refs.draggableContainer.style.top = this.positions.pixelTop;
      this.$refs.draggableContainer.style.left = this.positions.pixelLeft;
      //TODO: Use relative pixel values so it adjusts for different monitor resolutions when moving to new screen
      // console.log(this.$refs.draggableContainer.parentNode.clientWidth);
      // console.log(this.$refs.draggableContainer.parentNode.clientHeight);
    }
  },
  computed: {
    playerUsername() {
      return this.$store.getters.getUsername;
    },
    playerClientCode() {
      return this.$store.getters.getClientCode;
    },
    lobbyUsers() {
      return this.$store.getters.getLobbyUsers;
    },
    lobbyGuesses() {
      let guesses = [];
      const currentRound = this.$store.getters.getCurrentRound;
      this.lobbyUsers.forEach((user) => {
        let guess = user.guesses.find((g) => g.round === currentRound);
        if (guess !== undefined) {
          guess.username = user.username;
          guess.clientCode = user.clientCode;
          guesses.push(guess);
        }
      });
      return guesses;
    },
    showLobbyAnswers() {
      return this.$store.getters.getShowLobbyAnswers;
    },
    guessGeoJson() {
      let line = undefined;
      if (this.currentUser.guessed) {
        line = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [
                  [this.video.longitude, this.video.latitude],
                  [this.guessLon, this.guessLat],
                ],
              },
            },
          ],
        };
      }
      return line;
    },
    currentUser() {
      return this.$store.getters.getPlayer;
    },
    currentGuess() {
      return this.$store.getters.getGuess;
    },
  },
  methods: {
    exit() {
      this.$store.dispatch("setIsGuessing", false);
    },
    mapClick(event) {
      if (event && !this.currentUser.guessed && !this.roundOver) {
        this.$emit("markerPlaced", {
          guessLat: event.latlng.lat,
          guessLon: event.latlng.lng,
        });
      }
    },
    guess() {
      this.$store.dispatch("setGuessed", true);
      this.distance = calculateDistanceAndScore(
        this.guessLat,
        this.guessLon,
        this.video.latitude,
        this.video.longitude
      );
      let guess = {
        latGuess: this.guessLat,
        lonGuess: this.guessLon,
        score: Math.ceil(this.distance.score),
        round: this.$store.getters.getCurrentRound,
        runningScore: 0,
        distance: this.distance.distance,
      };
      this.$store.dispatch("setGuess", guess);
      this.$store.dispatch("setShowLobbyAnswers", true);
    },
    next() {
      //If they didn't guess, create an hollow guess object
      if (this.currentUser.guessed === false) {
        let guess = {
          latGuess: undefined,
          lonGuess: undefined,
          score: 0,
          round: this.$store.getters.getCurrentRound,
          runningScore: 0,
          distance: "---",
        };
        this.$store.dispatch("setGuess", guess);
      }
      if (this.gamemode === "singleplayer") {
        this.$emit("nextRound");
      } else {
        lobbyApi.nextRound(this.$store.getters.getLobbyCode);
      }
    },
    dragMouseDown(event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag(event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px";
      this.$refs.draggableContainer.style.left =
        this.$refs.draggableContainer.offsetLeft -
        this.positions.movementX +
        "px";
      //Keep track of absolute pixel position to place window same spot if guess is re-opened
      this.positions.pixelLeft = this.$refs.draggableContainer.style.left;
      this.positions.pixelTop = this.$refs.draggableContainer.style.top;
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      this.$emit("guessPanelMoved", this.positions);
    },
  },
};
</script>

<style scoped>
.guess {
  resize: both;
  width: 600px;
  height: 600px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 100;
  border-radius: 15px;
  align-content: center;
}
.guess-header {
  color: white;
  background-color: gray;
  opacity: 80%;
  cursor: grab;
  width: 100%;
  min-height: 25px;
}
.guess-header:hover {
  opacity: 100%;
}
.guess-text {
  margin-left: 5px;
  align-items: center;
  width: 33%;
  float: left;
}
.distance {
  color: white;
  align-items: center;
}
.exit {
  color: red;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1em;
  cursor: pointer;
  float: right;
}
.exit:hover {
  background: white;
}
.footer {
  background-color: gray;
  opacity: 60%;
  height: 40px;
}
.footer-buttons {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
}
.cancel-button {
  padding: 3px;
  background-color: rgb(141, 0, 0);
  color: white;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  display: inline-block;
  position: relative;
  margin: auto;
  user-select: none;
}
.next-button {
  background: rgb(0, 0, 255);
  padding: 3px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  display: inline-block;
  position: relative;
  margin: auto;
  user-select: none;
}
.guessButton {
  padding: 3px;
  background-color: green;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  display: inline-block;
  position: relative;
  margin: auto;
  user-select: none;
}
.cancel-button:hover {
  background-color: red;
  transform: scale(1.05);
}
.next-button:hover {
  background-color: rgb(49, 49, 255);
  transform: scale(1.05);
}
.guessButton:hover {
  background-color: rgb(0, 204, 0);
  transform: scale(1.05);
}
.disabledGuessButton {
  padding: 3px;
  background-color: green;
  opacity: 50%;
  color: white;
  cursor: not-allowed;
  border-radius: 5px;
  align-items: center;
  display: inline-block;
  position: relative;
  margin: auto;
  pointer-events: none;
  user-select: none;
}
</style>
