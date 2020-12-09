
<template>
  <div id="app">
    <div class="flex flex-col justify-between w-screen h-screen">
      <transition name="fade" appear>
        <main class="container p-4">
          <MageHeader />
          <router-view />
          <MageFooter />
        </main>
      </transition>
    </div>
  </div>
</template>

<script>
import MageHeader from "@/components/Header";
import MageFooter from "@/components/Footer";
export default {
  name: "App",
  components: {
    MageHeader,
    MageFooter,
    }
  };
</script>

