<template>
  <div class="app">
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
}
</style>
