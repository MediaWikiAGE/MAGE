<template>
  <div class="relative z-0 bg-white border-b-2" :style="{'background-color': bgColor}">
    <div class="relative z-10 shadow">
      <div class="flex items-center justify-between px-4 py-5 mx-auto sm:px-6 sm:py-6 lg:px-32 md:justify-start md:space-x-10">
        <div><a href="#" class="flex">Mage</a></div>
        <div class="-my-2 -mr-2 md:hidden">
          <button @click="mobileMenuOpen = true" type="button"
                  class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-200 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
            <svg
              class="w-6 h-6"
              x-description="Heroicon name: menu"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div class="hidden md:flex-1 md:flex md:items-center md:justify-between md:space-x-12">
          <nav class="flex space-x-10">
            <router-link v-for="(item, i) in menuItems" :key="i" :to="item.url"
              class="text-base font-medium leading-6 text-black transition duration-150 ease-in-out hover:text-gray-300 focus:outline-none focus:text-gray-300">
              {{ item.title }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="duration-100 ease-in"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0" >
      <div x-description="Mobile menu, show/hide based on mobile menu state." v-if="mobileMenuOpen"
           class="absolute inset-x-0 top-0 z-20 p-2 transition origin-top-right transform md:hidden">
        <div class="rounded-lg shadow-lg">
          <div class="bg-white divide-y-2 divide-gray-400 rounded-lg shadow-xs" >
            <div class="px-5 pt-5 pb-6 space-y-6 sm:space-y-8 sm:pb-8">
              <div class="flex items-center justify-between">
                <div>MAGE</div>
                <div class="-mr-2">
                  <button @click="mobileMenuOpen = false" type="button"
                    class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-200 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
                    <svg
                      class="w-6 h-6"
                      x-description="Heroicon name: x"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor" >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="px-5 py-6 space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <router-link v-for="(item, i) in menuItems" :key="i" :to="item.url"
                  class="text-base font-medium leading-6 text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 focus:outline-none focus:text-gray-900" >
                  {{ item.title }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mobileMenuOpen: false,
        menuItems: [
          { title: "Home", url: "/" },
          { title: "About", url: "/about" },
        ],
        bgColor: "#e0c446"
      };
    },
  };
</script>
