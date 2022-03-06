import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import {
  BootstrapVue,
  IconsPlugin,
  CardPlugin,
  FormPlugin,
  ModalPlugin,
  LayoutPlugin,
  FormCheckboxPlugin,
} from "bootstrap-vue";
import VueRouter from "vue-router";
import VueLayers from "vuelayers";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vuelayers/dist/vuelayers.css";

import router from "./router";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);
Vue.use(FormPlugin);
Vue.use(ModalPlugin);
Vue.use(LayoutPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(VueLayers);

Vue.use(VueRouter);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
