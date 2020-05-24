import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";
import BootstrapVue from "bootstrap-vue";
import { VueHammer } from "vue2-hammer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faWindowClose,
  faInfoCircle,
  faArrowLeft,
  faArrowRight,
  faPlay,
  faPause
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

library.add(faWindowClose);
library.add(faInfoCircle);
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faPlay);
library.add(faPause);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(
  VueGtag,
  {
    config: { id: "UA-167448715-1" }
  },
  router
);
Vue.use(BootstrapVue);
Vue.use(VueHammer);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
