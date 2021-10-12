<template>
  <div>
    <div class="player">
      <!-- <youtube :video-id="videoId" ref="youtube" @playing="playing" /> -->
      <iframe
        :src="youtubePrefix + videoId + videoControlSettings"
        width="100%"
        height="100%"
        frameborder="0"
      />
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
      videoId: "lG0Ys-2d4MA",
      youtubePrefix: "https://www.youtube.com/embed/",
      //Disable video controls, turn on autoplay, loop video,
      //disable keyboard controls, enable javascript controls
      videoControlSettings:
        "?controls=0&autoplay=1&loop=1&t=0&disablekb=1&enablejsapi=1",
    };
  },
};
</script>

<style scoped>
.player {
  pointer-events: none;
}
</style>
