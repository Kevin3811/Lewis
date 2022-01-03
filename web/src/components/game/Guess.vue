<template>
  <div class="guess">
    <div class="guess-header">
      <span class="guess-text">Place Guess</span>
      <span v-if="hasGuessed" class="distance">{{ distance }} away</span>
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
          <l-icon icon-url="./redmarker.png"> </l-icon>
          <l-tooltip :options="{ opacity: 0.4 }">{{
            playerUsername
          }}</l-tooltip>
        </l-marker>
      </div>
      <!-- Show Answer -->
      <div v-if="hasGuessed || roundOver">
        <l-marker :lat-lng="[this.video.latitude, this.video.longitude]">
          <l-icon icon-url="./greenmarker.png"> </l-icon>
          <l-tooltip :options="{ opacity: 0.4 }">Correct Answer</l-tooltip>
        </l-marker>
        <!-- Line connecting answer and player guess. Only attempt to draw line if a guess was made -->
        <l-geo-json v-if="hasGuessed" :geojson="guessGeoJson"></l-geo-json>
      </div>
      <!-- Show all other player answers -->
      <div v-if="showLobbyAnswers && (roundOver || hasGuessed)">
        <div v-for="lobbyUser in lobbyUsers" :key="lobbyUser.clientCode">
          <div v-if="lobbyUser.clientCode !== playerClientCode">
            <l-marker :lat-lng="[lobbyUser.latGuess, lobbyUser.lonGuess]">
              <l-icon icon-url="./bluemarker.png"> </l-icon>
              <l-tooltip :options="{ opacity: 0.4 }">{{
                lobbyUser.username
              }}</l-tooltip>
            </l-marker>
          </div>
        </div>
      </div>
    </l-map>
    <div class="footer">
      <span class="cancel-button" v-on:click="exit">Cancel</span>
      <span class="next-button" v-on:click="next" v-if="hasGuessed || roundOver"
        >Next</span
      >
      <span class="guess-button" :disabled="!hasGuessed" v-on:click="guess"
        >Guess</span
      >
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

export default {
  name: "Guess",
  components: { LMap, LTileLayer, LMarker, LIcon, LTooltip, LGeoJson },
  props: {
    video: Object,
    roundOver: Boolean,
  },
  data() {
    return {
      zoom: 1,
      center: [47.41322, -1.219482],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "attribution",
      english: true,
      nativeLanguages: false,
      distance: "3 miles",
      guessLat: undefined,
      guessLon: undefined,
      hasGuessed: false,
    };
  },
  mounted() {
    console.log("Current Video: ", this.video);
  },
  computed: {
    playerUsername() {
      return this.$store.getters.getPlayerUsername;
    },
    playerClientCode() {
      return this.$store.getters.getClientCode;
    },
    lobbyUsers() {
      return this.$store.getters.getLobbyUsers;
    },
    showLobbyAnswers() {
      return this.$store.getters.getShowLobbyAnswers;
    },
    guessGeoJson() {
      let line = undefined;
      if (this.hasGuessed) {
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
  },
  methods: {
    exit() {
      this.$store.dispatch("setIsGuessing", false);
    },
    mapClick(event) {
      if (event && !this.hasGuessed && !this.roundOver) {
        this.guessLat = event.latlng.lat;
        this.guessLon = event.latlng.lng;
      }
    },
    guess() {
      this.hasGuessed = true;
    },
    next() {
      this.hasGuessed = false;
      this.guessLat = undefined;
      this.guessLon = undefined;
      this.$emit("nextRound");
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
}
.guess-text {
  margin-left: 5px;
  text-align: left;
}
.distance {
  color: white;
  text-align: center;
  position: absolute;
  float: right;
  left: 46%;
}
.exit {
  color: red;
  float: right;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1em;
  cursor: pointer;
}
.exit:hover {
  background: white;
}
.footer {
  background-color: gray;
  opacity: 60%;
  height: 40px;
}
.cancel-button {
  float: left;
  margin-left: 10px;
  margin-top: 5px;
  padding: 3px;
  background-color: rgb(141, 0, 0);
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}
.cancel-button:hover {
  background-color: red;
}
.guess-button {
  float: right;
  margin-right: 10px;
  margin-top: 5px;
  padding: 3px;
  background-color: green;
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}
.next-button {
  background: rgb(0, 0, 255);
  text-align: center;
  left: 50%;
  position: absolute;
  padding: 3px 7px 3px 7px;
  color: white;
  margin-top: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.next-button:hover {
  background-color: rgb(49, 49, 255);
}
.guess-button:hover {
  background-color: rgb(0, 204, 0);
}
</style>
