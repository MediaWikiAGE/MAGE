import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "./router";

import AppLayout from "./layouts/AppLayout";

const store = createStore({
  state () {
    return {};
  },
  mutations: {}
});

createApp(App)
  .use(router)
  .use(store)
  .component("AppLayout", AppLayout)
  .mount("#app");