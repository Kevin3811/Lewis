<template>
  <div class="scores"></div>
</template>

<script>
export default {
  name: "Scores",
  components: {},
};
</script>

<style scoped>
.scores {
  position: absolute;
  z-index: 2;
  background-color: gray;
  min-height: 30px;
  min-width: 100px;
  margin-top: 1em;
  margin-left: 0.5em;
  opacity: 70%;
}
</style>
