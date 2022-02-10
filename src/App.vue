<template>
  <div id="app" class="main dark:bg-black grid" style="width: 100vw; height: 100vh; grid-template: auto max-content / max-content auto; grid-gap: 0.25em;">
    <div id="nav" class="menu dark:bg-gray-900 dark:text-gray-200 select-none" :class="{ small: !mobileMenuOpen }" style="overflow-y: auto;">
      <div class="flex flex-col" style="gap: 2px;">
        <div class="flex whitespace-nowrap p-0 bg-indigo-200 dark:bg-indigo-800 cursor-pointer" id="buttonMobileMenu" :title="mobileMenuOpen ? 'Collapse Menu' : 'Expand Menu'" @click="mobileMenuOpen = !mobileMenuOpen">
          <div class="mx-auto" v-show="mobileMenuOpen"><svg-icon width="32" height="32" icon="chevron-double-left" /></div>
          <div class="mx-auto" v-show="!mobileMenuOpen"><svg-icon width="32" height="32" icon="chevron-double-right" /></div>
        </div>
        <router-link custom v-for="(item, i) in this.menuItems" :key="i" :to="item.url">
          <div class="flex items-center cursor-pointer transition duration-150 ease-in-out" :class="this.getMenuLinkClass(item.name)" @click="this.$router.push(`${item.url}`); this.activeTab = item.name;">
            <div class="pad flex-shrink-0" :title="item.title" style="width: 48px; height: 48px;" ><svg-icon width="48" height="48" :icon="item.buttonImage" :noinvert="item.buttonImage === 'magelogo'" /></div>
            <div class="pad whitespace-nowrap" :class="{ hidden: !mobileMenuOpen }"> {{ item.title }} </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="pad main dark:bg-black dark:text-gray-200">MAGE v. 0.1.0</div>
    <div class="pad main overflow-auto dark:bg-black dark:text-gray-200" style="grid-row-start: 1; grid-column-start: 2;"> <router-view /> </div>
    <div class="pad main dark:bg-black dark:text-gray-200" style="grid-row-start: 2; grid-column-start: 2;"> <MageFooter /> </div>
  </div>
</template>

<script>
  import MageFooter from "@/components/MageFooter";
  import SvgIcon from "@/components/SvgIcon";
  import $ from "jquery";

  import { ref } from "vue";
  export default {
    name: "App",
    data() {
      return {
        mobileMenuOpen: true,
        menuItems: [
          { name: "home", buttonImage: "magelogo", title: "Home", url: "/" },
          { name: "about", buttonImage: "tag", title: "About", url: "/about" },
          { name: "login", buttonImage: "identification", title: "Login Manager", url: "/login" },          
          { name: "tasks", buttonImage: "pencil-alt", title: "Task List", url: "/tasks" },
          { name: "settings", buttonImage: "cog", title: "Settings", url: "/settings" },          
        ],
        activeTab: "home"
      };
    },
    methods: {
      getMenuLinkClass: function(linkName) {
        return {
          "bg-gray-300": this.activeTab === linkName,
          "dark:bg-gray-500": this.activeTab === linkName,
          "hover:bg-gray-200": this.activeTab !== linkName,
          "dark:hover:bg-gray-600": this.activeTab !== linkName,
        };
      }
    },

    beforeCreate() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        $("html").addClass("dark");
      }
    },

    onmount() {
      this.$nextTick(function () { });
    },

    onupdate() {
      this.$nextTick(function () { });
    },

    components: { MageFooter, SvgIcon },
  };
</script>

<style>
  #app button:focus, #app button:active,
  #app input:focus, #app input:active,
  #app a:focus, #app a:active,
  #app *:focus, #app *:active,
  #app a[class*="focus:"], #app a[class*="active:"],
  #app *[class*="router-"], #app a[class*="router-"] { outline: none 0 transparent; }

  input { border: 1px solid rgb(107, 114, 128); }

  input.short { width: 4em; }
  input.normal { width: 8em; }
  input.long { width: 12em; }

  #nav {
    width: 175px;
    height: 100%;
    justify-content: start;
    align-content: start;
    transition: 300ms;
  }

  #nav.small {
    width: 55px;
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

  #buttonMobileMenu {
    border-radius: 50%;
    width: 25px;
    height: 25px;
    position: absolute;
    left: 165px;
    transition: 300ms;
  }

  .small #buttonMobileMenu {
    left: 45px;
  }
</style>
