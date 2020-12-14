<template>
<div class="relative z-0 border-b-2 user-header--bgcolor" style="background-color: #e0c446;">
  MAGE
  <button @click="mobileMenuOpen = !mobileMenuOpen" type="button" class="focus:outline-none">
    <svg v-if="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  </button>
  <nav class="flex"> <router-link v-for="(item, i) in menuItems" :key="i" :to="item.url" class="focus:outline-none"> {{ item.title }} </router-link> </nav>
  <div id="MobileMenu" v-if="mobileMenuOpen" class="p-2 px-5 pt-5 pb-6 flex items-center justify-between">
    MAGE <router-link v-for="(item, i) in menuItems" :key="i" :to="item.url" class="focus:outline-none"> {{ item.title }} </router-link>
  </div>
</div>
</template>

<script>
export default {
  data() { return {
    mobileMenuOpen: false,
    menuItems: [
      { title: "Home", url: "/" },
      { title: "About", url: "/about" }
      ]
  }; },
};
</script>
