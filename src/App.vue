<template>
<div id="app" style="left: 0; top: 0; width: 100vw; height: 100vh; vertical-align: top;" class="fixed" :style="UCStyle">
  <div id="nav" class="dib focus:outline-none" style="left: 0; top: 0; height: calc(100% - 4em); width: auto; vertical-align: top;" :style="UCMenu">
    <div class="dib">
      <button id="buttonMobileMenu" :style="UCButton" type="button" @click="mobileMenuOpen = !mobileMenuOpen" class="focus:outline-none" style="vertical-align: top;">
        <svg v-if="mobileMenuOpen" class="w-6 h-6" title="Close Menu" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else class="w-6 h-6" title="Open Menu" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <div v-if="mobileMenuOpen" class="dib focus:outline-none" style="width: auto; height: auto; vertical-align: top;">
      <router-link v-for="(item, i) in menuItems" :key="i" :to="item.url" class="focus:outline-none" :style="UCButton" style="vertical-align: middle; display: block;"> {{ item.title }} </router-link>
    </div>
  </div>
  <div class="dib focus:outline-none"> <router-view class="dib" /> </div>
  <div class="fixed dib focus:outline-none" :style="UCMenu" style="bottom: 0.5em; right: 0.5em; left: 0.5em; height: 3em; vertical-align: middle;"> <MageFooter /> </div>
</div>
</template>

<script>
  import { inject } from "vue";
  import MageFooter from "@/components/Footer";
  inject["UserColors"];
  export default {

    name: "App",
    data() {
      return {
        mobileMenuOpen: true,
        menuItems: [
          { title: "Home", url: "/" },
          { title: "About", url: "/about" },
          { title: "User Colors", url: "/usercolorspanel" }
        ],
      };
    },

    updated() {
      this.$nextTick(function () { });
    },

    components: { MageFooter },
  };
</script>

<style>
* {
padding: 0.5em;
}

#app button:focus, #app button:active,
#app input:focus, #app input:active,
#app a:focus, #app a:active,
#app *:focus, #app *:active,
#app a[class*="focus:"], #app a[class*="active:"],
#app *[class*="router-"], #app a[class*="router-"] {
outline: none 0 transparent;
}

input.short { width: 4em; }

input.normal { width: 8em; }

input.long { width: 12em; }

.fixed { position: fixed; }

.dib { display: inline-block; }

</style>
