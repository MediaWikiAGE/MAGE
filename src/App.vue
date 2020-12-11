<template>
  <div id="app" style="left: 0; top: 0; width: 100vw; height: 100vh;" :style="UCStyle" class="fixed">
    <main id="WindowLayout" :style="UCStyle">
      <button :style="UCButton" type="button" @click="mobileMenuOpen = !mobileMenuOpen" class="inline-flex items-center justify-center focus:outline-none">
        <svg v-if="mobileMenuOpen" class="w-6 h-6" x-description="Heroicon name: x" title="Close Menu" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"> <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> </svg>
        <svg v-else class="w-6 h-6" x-description="Heroicon name: menu" title="Open Menu" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"> <path stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /> </svg>
      </button>
      <nav x-description="Mobile menu, show/hide based on mobile menu state." v-if="mobileMenuOpen" class="focus:outline-none" style="display: inline-block; left: 0; top: 0; width: auto; height: auto;">
        <button :style="UCButton" type="button" @click="editUserColors = !editUserColors" class="inline-flex items-center justify-center focus:outline-none" title="Edit User Colors / Font">
          <svg class="w-6 h-6" fill="none" :stroke="colorError" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /> </svg>
          </button>
          <router-link v-for="(item, i) in menuItems" :key="i" :to="item.url" class="focus:outline-none" style="margin-left: 2em; margin-right: 2em; margin-top: 1em; margin-bottom: 1em; display: inline-block; width: auto; height: auto;"> {{ item.title }} </router-link>
        </nav> <router-view class="focus:outline-none" /> </main>
    <div class="focus:outline-none fixed" style="left: 0; bottom: 0; right: 0; height: 5ex;"> <MageFooter /> </div>
  </div>
</template>

<script>
  import MageFooter from "@/components/Footer";
  export default {

    name: "App",
    data() {
      return {
        colorMain: "#fff",
        backgroundMain: "#000",
        colorMenu: "#777",
        backgroundMenu: "#333",
        colorError: "#700",
        backgroundError: "#300",
        pxFont: "12",
        nameFont: "monospace",
        editUserColors: false,
        mobileMenuOpen: true,
        menuItems: [
          { title: "Home", url: "/" },
          { title: "About", url: "/about" }
        ],
        bgColor: "#e0c446",
      };
    },

    updated() {
      this.$nextTick(function () { });
    },

    computed: {

      UCStyle() { return `; font: ${this.pxFont}px '${this.nameFont}', monospace; color: ${this.colorMain}; background: ${this.backgroundMain};`; },
      UCButton() { return `; border: 0.125ex outset ${this.colorMenu}; background: ${this.backgoundMenu}; color: ${this.colorMenu};`; },
      UCInputBox() { return `; border: 0.125ex inset ${this.colorMain}; background: ${this.backgoundMenu}; color: ${this.colorMenu};`; },
    },

    components: { MageFooter },
  };
</script>

<style>

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

/*
  *
  <button id="editUserColors" @click="editUserColors = !editUserColors;" title="Edit User Colors / Font" class="focus:outline-none" > &#x2592; </button >
  *
  <div id="panelUserColors" :style="[UCButton, {display: ( editUserColors ? 'inline-block' : 'none' )}]" class="focus:outline-none" >
  Font (size)
  <input :style="UCInputBox" @input="$emit('input', $event.target.value)" type="text" :value="nameFont" class="long focus:outline-none" >
  <input :style="UCInputBox" @input="$emit('input', $event.target.value)" type="text" :value="pxFont" class="short focus:outline-none" >
  Window Color
  <input type="text" :value="colorMain" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
  Window Background
  <input type="text" :value="backgroundMain" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
  Menu Color
  <input type="text" :value="colorMenu" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
  Menu Background
  <input type="text" :value="backgroundMenu" :style="[UCInputBox, {width: '8em' }]" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
  Error Color
  <input type="text" :value="colorError" :style="[UCInputBox, {width: '8em' }]" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
  Error Background
  <input type="text" :value="backgroundError" :style="[UCInputBox, {width: '8em' }]" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
  </div >
  *
  */
</style>
