import Vue from "vue";
import App from "./App.vue";

import VueMobileDetection from "vue-mobile-detection";

// Move... somewhere?
import "bulma/css/bulma.css";

// Exposes Vue.$isMobile()
Vue.use(VueMobileDetection);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
