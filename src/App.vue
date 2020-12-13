<template>
<div id="app" style="left: 0; top: 0; width: 100vw; height: 100vh; vertical-align: top;" class="fixed main">
  <div id="nav" class="dib menu focus:outline-none" style="left: 0; top: 0; height: calc(100% - 4em); width: auto; vertical-align: top;">
    <div class="dib">
      <button id="buttonMobileMenu" type="button" @click="mobileMenuOpen = !mobileMenuOpen" class="button focus:outline-none" style="vertical-align: top; padding: 0;">
        <svg v-if="mobileMenuOpen" class="nopad w-6 h-6" title="Close Menu" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else class="nopad w-6 h-6" title="Open Menu" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
    <div v-if="mobileMenuOpen" class="dib menu focus:outline-none" style="width: auto; height: auto; vertical-align: top;">
      <router-link v-for="(item, i) in menuItems" :key="i" :to="item.url" class="button focus:outline-none" style="vertical-align: middle; display: block;"> {{ item.title }} </router-link>
    </div>
  </div>
  <div class="dib main focus:outline-none"> <router-view class="dib" /> </div>
  <div class="fixed dib focus:outline-none menu" style="bottom: 0.5em; right: 0.5em; left: 0.5em; height: 3em; vertical-align: middle;"> <MageFooter /> </div>
</div>
</template>

<script>
  import MageFooter from "@/components/Footer";
  export default {

    name: "App",
    data() {
      return {
        mobileMenuOpen: true,
        menuItems: [
          { title: "Home", url: "/" },
          { title: "About", url: "/about" }
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

input { border: 0.125em inset ThreeDShadow; }

input.short { width: 4em; }

input.normal { width: 8em; }

input.long { width: 12em; }

td, th { padding: 0.5em; }

.fixed { position: fixed; }

.dib { display: inline-block; }

.menu { color: MenuText; background: Menu; border: 0.125em outset ThreeDShadow; }

.main { color: WindowText; background: Window; border: 0.125em inset ThreeDShadow; }

.button { color: ButtonText; background: ButtonFace; border: 0.125em outset ThreeDShadow; }

.nopad { padding: 0; }


/*
    here.colorMenu = "#00f" );
    here.backgroundMenu = ( localStorage.getItem("backgroundMenu") ? localStorage.getItem("backgroundMenu") : "#003" );
    here.colorError = ( localStorage.getItem("colorError") ? localStorage.getItem("colorError") : "#f00" );
    here.backgroundError = ( localStorage.getItem("backgroundError") ? localStorage.getItem("backgroundError") : "#300" );
    here.pxFont = ( localStorage.getItem("pxFont") ? localStorage.getItem("pxFont") : 12 );
    here.nameFont = ( localStorage.getItem("nameFont") ? localStorage.getItem("nameFont") : "monospace" );
    here.UCStyle = ( localStorage.getItem("UCStyle") ? localStorage.getItem("UCStyle") : { font: `${here.pxFont}px '${here.nameFont}', monospace`, color: here.colorMain, background: here.backgroundMain } );
    here.UCButton = ( localStorage.getItem("UCButton") ? localStorage.getItem("UCButton") : { border: `0.125em outset ${here.colorMenu}`, background: here.backgroundMenu, color: here.colorMenu } );
    here.UCMenu = ( localStorage.getItem("UCMenu") ? localStorage.getItem("UCMenu") : { border: `0.125em outset ${here.colorMenu}`, background: here.backgroundMenu, color: here.colorMenu } );
    here.UCInputBox = ( localStorage.getItem("UCInputBox") ? localStorage.getItem("UCInputBox") : { border: `0.125em inset ${here.colorMain}`, background: here.backgroundMain, color: here.colorMain } );
*/
</style>
