import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import VueYoutube from "vue-youtube";
import { BootstrapVue, IconsPlugin, CardPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(VueYoutube);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
