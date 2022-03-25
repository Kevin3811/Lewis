<template>
  <b-navbar toggleable="lg" variant="info" type="info" class="nav">
    <router-link :to="{ name: 'Home' }">
      <b-navbar-brand
        tag="h1"
        style="cursor: pointer; color: white; font-size: 2em;"
        >Lewis</b-navbar-brand
      >
    </router-link>
  </b-navbar>
</template>

<script>
export default {
  name: "Header",
  components: {},
  mounted() {
    this.$store.dispatch("resetGame");
  },
  methods: {},
};
</script>
<style scoped>
.nav {
  z-index: 1000;
}
</style>
