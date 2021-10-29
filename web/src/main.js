import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import VueYoutube from "vue-youtube";
import { BootstrapVue, IconsPlugin, CardPlugin } from "bootstrap-vue";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(VueYoutube);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
