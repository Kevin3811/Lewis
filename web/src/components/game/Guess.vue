<template>
  <div class="guess" ref="draggableContainer">
    <b-container>
      <b-row
        style="height: 35px;"
        class="guess-header w-100"
        draggable="true"
        v-on:mousedown="dragMouseDown"
        align-v="center"
        no-gutters
      >
        <b-col cols="2" style="text-align: left;">
          Place Guess
        </b-col>
        <b-col sylte="align-content: center;">
          <div v-if="currentUser.guessed" style="text-align: center;">
            {{ currentGuess.distance }} away
          </div>
        </b-col>
        <b-col cols="2" style="text-align: right;">
          Place Holder
        </b-col>
      </b-row>
      <b-row>
        <l-map
          style="height: 515px;"
          :zoom="zoom"
          :center="center"
          v-on:click="mapClick($event)"
        >
          <l-tile-layer
            :url="url"
            :attribution="attribution"
            :subdomains="subdomains"
          ></l-tile-layer>
          <!-- Guess lat lon default to undefined. Only display marker once there is a guess -->
          <div v-if="guessLat !== undefined || guessLon !== undefined">
            <l-marker :lat-lng="[guessLat, guessLon]">
              <l-icon icon-url="/redmarker.png"> </l-icon>
              <l-tooltip :options="{ opacity: 0.4 }">
                {{ playerUsername }}: {{ currentGuess.distance }}
              </l-tooltip>
            </l-marker>
          </div>
          <!-- Show Answer -->
          <div v-if="currentUser.guessed || roundOver">
            <l-marker :lat-lng="[this.video.latitude, this.video.longitude]">
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
                    (guess.latGuess !== undefined ||
                      guess.lonGuess !== undefined)
                "
              >
                <l-marker :lat-lng="[guess.latGuess, guess.lonGuess]">
                  <l-icon icon-url="/bluemarker.png"> </l-icon>
                  <l-tooltip :options="{ opacity: 0.6 }">
                    {{ guess.username }}: {{ guess.distance }}
                  </l-tooltip>
                </l-marker>
              </div>
            </div>
          </div>
        </l-map>
      </b-row>
      <!--Bottom cance, skip/next, and guess buttons-->
      <b-row
        class="w-100"
        style="height: 50px;"
        :no-gutters="true"
        align-v="center"
      >
        <b-col style="text-align: center">
          <b-button v-on:click="exit">Close</b-button>
        </b-col>
        <b-col style="text-align: center">
          <div v-if="currentUser.host">
            <b-button
              variant="primary"
              v-if="currentUser.guessed || roundOver"
              v-on:click="next"
              >Next</b-button
            >
            <b-button variant="danger" v-else v-on:click="next">Skip</b-button>
          </div>
        </b-col>
        <b-col style="text-align: center">
          <b-button
            variant="success"
            :disabled="currentUser.guessed || roundOver"
            v-on:click="guess"
            >Guess</b-button
          >
        </b-col>
      </b-row>
    </b-container>
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
      zoom: 2,
      center: [47.41322, -1.219482],
      // url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      url: "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en", //map
      // url: "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&hl=en",  //terrain (satellite view)
      // url: "https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en", //hybrid
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
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
      lobbyApi.nextRound(this.$store.getters.getLobbyCode);
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

<style>
.guess {
  width: 600px;
  height: 600px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 100;
  border-radius: 10px;
  align-content: center;
  background-color: gray;
}
.guess-header {
  color: white;
  cursor: grab;
  width: 100%;
}
</style>
