import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import router from "./router";

const store = createStore({
  state: {
    processedFarmName: null,
    processedWikiName: null,
    processedUsername: null,
    processedBotPassId: null,

    loginFormData: null,
  },
  mutations: {
    saveProcessedWiki(state, processedWikiData) {
      const [farm, wiki, user, botPass] = processedWikiData;
      state.processedFarmName = farm;
      state.processedWikiName = wiki;
      state.processedUsername = user;
      state.processedBotPassId = botPass;
    },
    saveLoginFormData(state, loginFormData) {
      state.loginFormData = loginFormData;
    }
  },
  getters: {
    getProcessedWiki(state) {
      return [
        state.processedFarmName,
        state.processedWikiName,
        state.processedUsername,
        state.processedBotPassId
      ];
    },
    getLoginFormData(state) {
      return state.loginFormData;
    }
  }
});

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
