import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import _ from "lodash";
import { store } from "./store.js";

Vue.use(Vuex);

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
