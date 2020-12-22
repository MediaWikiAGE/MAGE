<template>
  <div id="app" class="main grid" style="left: 0; top: 0; width: 100vw; height: 100vh; vertical-align: top; grid-template-columns: max-content auto; grid-gap: 0.25em;">
    <div id="nav" class="menu select-none" style="left: 0; top: 0; width: auto; height: calc(100vh - 6ex); vertical-align: top;">
      <div class="flex flex-col" style="gap: 2px">
        <div class="flex whitespace-nowrap p-0 bg-indigo-100 cursor-pointer" id="buttonMobileMenu" :title="mobileMenuOpen ? 'Collapse Menu' : 'Expand Menu'" @click="mobileMenuOpen = !mobileMenuOpen">
          <div class="ml-auto" v-show="mobileMenuOpen"><buttonx class="flex-grow-0 p-0" style="width: 32px; height: 32px;" /></div>
          <div class="mx-auto" v-show="!mobileMenuOpen"><buttonmenu class="p-0" style="width: 24px; height: 32px;" /></div>
        </div>
        <router-link custom v-for="(item, i) in this.menuItems" :key="i" :to="item.url">
          <div class="flex items-center cursor-pointer transition duration-150 ease-in-out" :class="this.getMenuLinkClass(item.name)" @click="this.$router.push(`${item.url}`); this.activeTab = item.name;">
            <div class="pad" :title="item.title" style="width: 48px; height: 48px;" > <component class="p-0" style="width: 100%; height: 100%;" :is="`${item.buttonimage}`" /> </div>
            <div class="pad" :class="{ hidden: !mobileMenuOpen }"> {{ item.title }} </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="pad main" style="width: 100%; height: calc(100vh - 6ex); grid-row-start: 1; grid-column-start: 2;"> <router-view /> </div>
    <div class="pad main" style="height: 4.5ex; grid-row-start: 2; grid-column-start: 2;"> <MageFooter /> </div>
  </div>
</template>

<script>
  import MageFooter from "@/components/Footer";
  import magelogo from "@/magelogo.vue";
  import buttonmenu from "@/buttonmenu.vue";
  import buttonx from "@/buttonx.vue";
  import buttonidtag from "@/buttonidtag.vue";
  import buttontasks from "@/buttontasks.vue";
  import buttonabout from "@/buttonabout.vue";
  import { ref } from "vue";
  export default {
    name: "App",
    data() {
      return {
        mobileMenuOpen: true,
        menuItems: [
          { name: "home", buttonimage: "magelogo", title: "Home", url: "/" },
          { name: "about", buttonimage: "buttonabout", title: "About", url: "/about" },
          { name: "login", buttonimage: "buttonidtag", title: "Login Manager", url: "/login" },
          { name: "tasks", buttonimage: "buttontasks", title: "Task List", url: "/tasks" },
        ],
        activeTab: "home",
      };
    },
    methods: {
      getMenuLinkClass: function(linkName) {
        return {
          "bg-gray-300": this.activeTab === linkName,
          "hover:bg-gray-200": this.activeTab !== linkName,
        };
      }
    },

    onmount() {
      this.$nextTick(function () { });
    },

    onupdate() {
      this.$nextTick(function () { });
    },

    components: { MageFooter, magelogo, buttonmenu, buttonx, buttonidtag, buttontasks, buttonabout },
  };
</script>

<style>
  #app button:focus, #app button:active,
  #app input:focus, #app input:active,
  #app a:focus, #app a:active,
  #app *:focus, #app *:active,
  #app a[class*="focus:"], #app a[class*="active:"],
  #app *[class*="router-"], #app a[class*="router-"] { outline: none 0 transparent; }

  input { border: 0.125em inset ThreeDShadow; }

  input.short { width: 4em; }
  input.normal { width: 8em; }
  input.long { width: 12em; }

  #nav {
    width: 100%;
    height: 100%;
    justify-content: start;
    align-content: start;
  }

  .hide { visibility: hidden; }

  .show { visibility: visible; }

  .remove { width: 0; visibility: hidden; overflow: hidden; }

  .pad { padding: 0.25em; }

  .menu {
    color: MenuText;
    background: Menu;
    padding: 0.25em;
  }

  .main {
    color: WindowText;
    background: Window;
    padding: 0.25em;
  }

  .button {
    color: ButtonText;
    background: ButtonFace;
  }
</style>
