import Vue from "vue";
import VueRouter from "vue-router";
import Scene from "../components/game/Scene.vue";
import Main from "../components/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/singleplayer",
    name: "Singleplayer",
    component: Scene,
    props: true,
  },
  {
    path: "/multiplayer/:lobbyCode",
    name: "Multiplayer",
    component: Scene,
  },
  {
    path: "/",
    name: "Home",
    component: Main,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
