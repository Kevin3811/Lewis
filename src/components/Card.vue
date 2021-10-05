<template>
  <div class="card">
    <img class="image" :src="require(`@/assets/${imageName}.png`)" />
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    imageName: String,
    title: String,
    height: String,
    width: String,
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.card {
  height: 200px;
  width: 25%;
  background-color: gray;
  margin: 5px;
}
.card:hover {
  cursor: pointer;
}
img {
  max-width: 90%;
  max-height: 90%;
}
</style>
