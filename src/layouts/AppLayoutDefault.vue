<template>
  <div class="flex flex-col justify-between w-screen h-screen">
    <MageHeader />
    <transition name="fade" appear>
      <main class="container p-4 mx-auto mb-auto">
        <slot />
      </main>
    </transition>
    <MageFooter />
  </div>
</template>

<script>
import MageHeader from "@/components/Header";
import MageFooter from "@/components/Footer";

export default {
  name: "AppLayoutDefault",
  components: {
    MageHeader,
    MageFooter,
  },
};
</script>