import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "./router";
import UIText from "./UIText";

const uitTable = {
Language: "en-us"
}; 

const store = createStore({
  state () {
    return {};
  },
  mutations: {}
});

createApp(App)
  .use(router)
  .use(store)
  .use(App, uitTable)
  .mount("#app");