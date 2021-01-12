import Vue from "vue";
import "./plugins/axios";
import vuetify from "@/plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  // 새로고침시 토큰으로 로그인시도
  beforeCreate() {
    this.$store.dispatch("getMemberInfo");
  },
  render: h => h(App)
}).$mount("#app");
