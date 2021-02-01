import Vue from "vue";
import App from "./App.vue";

import VueAnalytics from "vue-analytics";
import VueMobileDetection from "vue-mobile-detection";

// Move... somewhere?
import "bulma/css/bulma.css";

Vue.use(VueAnalytics, {
  id: [process.env.MV_GOOGLE_ANALYTICS_TOKEN],
  checkDuplicatedScript: true,
  debug: {
    enabled: false,
    sendHitTask: true
  }
});

// Exposes Vue.$isMobile()
Vue.use(VueMobileDetection);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
