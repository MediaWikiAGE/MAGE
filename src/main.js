import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "./router";
import UserColors from "./plugins/UserColors";

const colors = {};
const store = createStore({
  state () {
    return {};
  },
  mutations: {}
});

createApp(App)
  .use(router)
  .use(store)
  .use(UserColors, colors)
  .mount("#app");