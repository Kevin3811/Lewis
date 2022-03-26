<template>
  <div class="map">
    <vue-draggable-resizable
      :w="width"
      :h="height"
      :x="x"
      :y="y"
      :min-width="250"
      :min-height="200"
      v-on:resizing="onResize"
      v-on:dragstop="onMove"
      :drag-handle="'.drag-handle'"
      class-name-handle="custom-handle"
      class-name-dragging="dragging"
      :active="true"
    >
      <b-container class="h-100" fluid>
        <!-- Header: Label, distance, map selector -->
        <b-row
          style="height: 35px; background-color: gray; margin: 0 -15px 0 -15px; overflow: hidden;"
          align-v="center"
          class="drag-handle"
          no-gutters
        >
          <b-col
            cols="2"
            style="text-align: center; color: white; height: 100%; margin-top: 2px;"
          >
            Place Guess
          </b-col>
          <b-col style="align-content: center; height: 100%">
            <div
              v-if="currentUser.guessed"
              style="text-align: center; color: white; height: 100%; margin-top: 2px;"
            >
              {{ currentGuess.distance }} away
            </div>
          </b-col>
          <b-col
            cols="3"
            style="text-align: center; height: 100%; margin-top: 2px;"
          >
            <b-dropdown :text="mapType" right size="sm">
              <b-dropdown-item v-on:click="selectMap('Native Languages')"
                >Native Languages</b-dropdown-item
              >
              <b-dropdown-item v-on:click="selectMap('Basic Map')"
                >Basic Map</b-dropdown-item
              >
              <b-dropdown-item v-on:click="selectMap('Terrain Map')"
                >Terrain Map</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
        </b-row>
        <!-- Map -->
        <b-row
          style="height: calc(100% - 35px - 50px); background-color: rgba(128, 128, 128, 0.6);"
        >
          <b-col class="h-100 w-100">
            <vl-map
              :load-tiles-while-animating="true"
              :load-tiles-while-interacting="true"
              v-on:click="mapClick"
              v-on:pointermove="onMapPointerMove"
              data-projection="EPSG:4326"
              style="height: 100%; width: calc(100% + 30px); margin-left: -15px; margin-right: -15px;"
              ref="map"
            >
              <vl-view
                v-on:update:zoom="onMapZoom($event)"
                v-on:update:center="onMapPan($event)"
                :center="[mapLon, mapLat]"
                :zoom="mapZoom"
              ></vl-view>
              <vl-layer-tile id="osm">
                <vl-source-xyz :urls="maps[mapType].urls"></vl-source-xyz>
              </vl-layer-tile>
              <!-- Show where the current marker is placed -->
              <div v-if="guessLat !== undefined || guessLon !== undefined">
                <!-- Tooltip hovers -->
                <vl-overlay v-if="currentPosition" :position="currentPosition">
                  <div
                    style="background: #fff; box-shadow: 2px 2px 10px rgba(2,2,2,0.1); padding: 2px; opacity: 0.7; border-radius: 3px"
                  >
                    {{ currentName }} {{ currentDistance }}
                  </div>
                </vl-overlay>
                <!-- Player guess marker -->
                <vl-feature
                  :properties="{
                    name: `${playerUsername}: `,
                    distance: guess.distance,
                    currentUser: true,
                  }"
                >
                  <vl-geom-point
                    :coordinates="[guessLon, guessLat]"
                  ></vl-geom-point>
                  <vl-style-box>
                    <vl-style-icon
                      src="/redmarker.png"
                      :scale="0.4"
                      :anchor="[0.5, 1]"
                    ></vl-style-icon>
                  </vl-style-box>
                </vl-feature>
                <!-- Geojson connecting user guess to anwers -->
                <vl-feature v-if="hasGuessed">
                  <vl-geom-line-string
                    :coordinates="calculateGeoJsonLine(currentGuess)"
                  >
                  </vl-geom-line-string>
                  <vl-style>
                    <vl-style-stroke color="green" :width="3"></vl-style-stroke>
                  </vl-style>
                </vl-feature>
              </div>
              <!-- Show all other player answers -->
              <div v-if="roundOver || hasGuessed">
                <!-- Show answer -->
                <vl-feature :properties="{ name: 'Answer' }">
                  <vl-geom-point
                    :coordinates="[
                      Number(video.longitude),
                      Number(video.latitude),
                    ]"
                  ></vl-geom-point>
                  <vl-style-box>
                    <vl-style-icon
                      src="/greenmarker.png"
                      :scale="0.4"
                      :anchor="[0.5, 1]"
                    ></vl-style-icon>
                  </vl-style-box>
                </vl-feature>
                <!-- Show everyone else's guesses -->
                <div v-for="guess in lobbyGuesses" :key="guess.clientCode">
                  <div
                    v-if="
                      guess.clientCode !== playerClientCode &&
                        (guess.latGuess !== undefined ||
                          guess.lonGuess !== undefined)
                    "
                  >
                    <vl-feature
                      :properties="{
                        name: guess.username,
                        distance: guess.distance,
                        currentUser: false,
                      }"
                    >
                      <vl-geom-point
                        :coordinates="[
                          Number(guess.lonGuess),
                          Number(guess.latGuess),
                        ]"
                      ></vl-geom-point>
                      <vl-style-box>
                        <vl-style-icon
                          src="/bluemarker.png"
                          :scale="0.8"
                          :anchor="[0.5, 1]"
                        ></vl-style-icon>
                      </vl-style-box>
                    </vl-feature>
                    <!-- Geojson connecting guesses to anwers -->
                    <vl-feature>
                      <vl-geom-line-string
                        :coordinates="calculateGeoJsonLine(guess)"
                      />
                      <vl-style>
                        <vl-style-stroke :width="3"></vl-style-stroke>
                      </vl-style>
                    </vl-feature>
                  </div>
                </div>
              </div>
            </vl-map>
          </b-col>
        </b-row>
        <!--Footer: Cancel, skip/next, and guess buttons-->
        <b-row
          style="height: 50px; margin: 0 -15px 0 -15px; background-color: gray"
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
              <b-button variant="danger" v-else v-on:click="next"
                >Skip</b-button
              >
            </div>
          </b-col>
          <b-col style="text-align: center">
            <b-button
              variant="success"
              :disabled="
                currentUser.guessed ||
                  roundOver ||
                  guessLat === undefined ||
                  guessLon === undefined
              "
              v-on:click="guess"
              >Guess</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import { calculateDistanceAndScore } from "../../scripts/geocalculator.js";
import lobbyApi from "../../api/lobby";
import * as proj from "ol/proj";

export default {
  name: "Guess",
  components: {
    VueDraggableResizable,
  },
  props: {
    video: Object,
    roundOver: Boolean,
    guessPanel: Object,
    gamemode: String,
    guessLat: Number,
    guessLon: Number,
    width: {
      type: Number,
      required: false,
      default: 600,
    },
    height: {
      type: Number,
      required: false,
      default: 600,
    },
    x: {
      type: Number,
      required: false,
      default: 0,
    },
    y: {
      type: Number,
      required: false,
      default: 0,
    },
    mapLat: {
      type: Number,
      required: false,
      default: 0,
    },
    mapLon: {
      type: Number,
      required: false,
      default: 0,
    },
    mapZoom: {
      type: Number,
      required: false,
      default: 0,
    },
    mapType: {
      type: String,
      required: false,
      default: "Basic Map",
    },
  },
  data() {
    return {
      maps: {
        "Native Languages": {
          name: "Native Languages",
          urls: [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
          ],
        },
        "Basic Map": {
          name: "Basic Map",
          urls: [
            "https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en",
            "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en",
            "https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en",
            "https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en",
          ],
        },
        "Terrain Map": {
          name: "Terrain Map",
          urls: [
            "https://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en",
            "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en",
            "https://mt2.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en",
            "https://mt3.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&hl=en",
          ],
        },
      },
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      english: true,
      nativeLanguages: false,
      distance: "",
      currentPosition: undefined,
      currentName: undefined,
      currentDistance: "",
    };
  },
  mounted() {
    console.log("Current Video: ", this.video);
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
    currentUser() {
      return this.$store.getters.getPlayer;
    },
    currentGuess() {
      return this.$store.getters.getGuess;
    },
    hasGuessed() {
      return this.$store.getters.getHasGuessed;
    },
  },
  methods: {
    selectMap(map) {
      this.$emit("mapType", map);
    },
    calculateGeoJsonLine(guess) {
      if (
        guess === undefined ||
        guess.lonGuess === undefined ||
        guess.latGuess === undefined ||
        this.video === undefined ||
        this.video.longitude === undefined ||
        this.video.latitude === undefined
      ) {
        return [
          [0, 0],
          [0, 0],
        ];
      }
      return [
        [Number(this.video.longitude), Number(this.video.latitude)],
        [Number(guess.lonGuess), Number(guess.latGuess)],
      ];
    },
    exit() {
      this.$store.dispatch("setIsGuessing", false);
    },
    mapClick(event) {
      if (event && !this.currentUser.guessed && !this.roundOver) {
        this.$emit("markerPlaced", {
          guessLat: event.coordinate[1],
          guessLon: event.coordinate[0],
        });
      }
    },
    guess() {
      console.log("guessed");
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
    onResize(x, y, width, height) {
      this.$refs.map.updateSize();
      this.$emit("mapResize", width, height);
    },
    onMove(x, y) {
      this.$emit("mapMove", x, y);
    },
    onMapZoom(zoom) {
      this.$emit("mapZoom", zoom);
    },
    onMapPan(coords) {
      //[lon, lat]
      this.$emit("mapPan", coords);
    },
    //Reference code: https://jsfiddle.net/ghettovoice/r4ejqk93/37/
    async onMapPointerMove({ pixel }) {
      let hitFeature = await this.$refs.map.forEachFeatureAtPixel(
        pixel,
        (feature) => feature
      );

      if (hitFeature) {
        this.mapCursor = "pointer";
        this.currentPosition = proj.transform(
          hitFeature.getGeometry().getCoordinates(),
          "EPSG:3857",
          "EPSG:4326"
        );
        this.currentName = hitFeature.get("name");
        if (hitFeature.get("currentUser")) {
          this.currentDistance = this.currentGuess.distance;
        } else {
          this.currentDistance = hitFeature.get("distance");
        }
      } else {
        this.mapCursor = "default";
        this.currentPosition = this.currentName = undefined;
      }
    },
  },
};
</script>

<style>
.map {
  position: absolute;
  z-index: 3;
}
.drag-handle:hover {
  cursor: grab;
}
.dragging {
  cursor: grabbing;
}
.custom-handle {
  position: absolute;
  width: 15px;
  height: 15px;
}
.custom-handle-br {
  bottom: -7px;
  right: -7px;
  cursor: se-resize;
}
</style>
