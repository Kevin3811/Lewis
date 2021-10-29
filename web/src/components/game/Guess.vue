<template>
  <div class="guess">
    <div class="guess-header">
      <span>Place Guess</span><span class="exit" v-on:click="exit">x</span>
    </div>
    <l-map
      style="height: 300px"
      :zoom="zoom"
      :center="center"
      v-on:click="mapClick($event)"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <!-- Guess lat lon default to 0. Only display marker once there is a guess -->
      <div v-if="guessLat !== 0 || guessLon !== 0">
        <l-marker :lat-lng="[guessLat, guessLon]"></l-marker>
      </div>
      <div v-if="hasGuessed">
        <l-marker :lat-lng="[roundLat, roundLon]">
          <l-icon icon-url="./redmarker.png"></l-icon>
        </l-marker>
      </div>
    </l-map>
    <div class="footer">
      <span class="cancel-button" v-on:click="exit">Cancel</span>
      <span class="next-button" v-on:click="next" v-if="hasGuessed">Next</span>
      <span class="guess-button" :disabled="!hasGuessed" v-on:click="guess"
        >Guess</span
      >
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import { icon } from "leaflet";

export default {
  name: "Guess",
  components: { LMap, LTileLayer, LMarker, LIcon },
  data() {
    return {
      zoom: 1,
      center: [47.41322, -1.219482],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      redIcon: icon({
        iconUrl: "./redmarker.png",
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
      attribution: "attribution",
      english: true,
      nativeLanguages: false,
    };
  },
  computed: {
    guessLat() {
      return this.$store.getters.getGuessLat;
    },
    guessLon() {
      return this.$store.getters.getGuessLon;
    },
    roundLat() {
      return this.$store.getters.getRoundLat;
    },
    roundLon() {
      return this.$store.getters.getRoundLon;
    },
    hasGuessed() {
      return this.$store.getters.getHasGuessed;
    },
  },
  methods: {
    exit() {
      this.$store.dispatch("setIsGuessing", false);
    },
    mapClick(event) {
      if (event && !this.hasGuessed) {
        this.$store.dispatch("setGuessLat", event.latlng.lat);
        this.$store.dispatch("setGuessLon", event.latlng.lng);
      }
    },
    guess() {
      this.$store.dispatch("setHasGuessed", true);
    },
    next() {
      console.log("next");
    },
  },
};
</script>

<style scoped>
.guess {
  width: 600px;
  height: 600px;
  position: absolute;
  top: 50%;
  right: 50%;
  z-index: 100;
  border-radius: 15px;
}
.guess-header {
  color: white;
  text-align: center;
  background-color: gray;
  opacity: 60%;
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
