<template>
  <footer class="py-2 text-white bg-black">
    <div
      class="w-full mx-auto space-y-4 overflow-hidden text-xs sm:px-6 lg:px-8"
    >
      <template v-if="name">
        Logged in as {{name}} @ {{wiki}}
      </template>
      <template v-else>
        Not logged in
      </template>
    </div>
  </footer>
</template>

<script>
  export default {
    created() {
      window.api.remote("getUser").then(data => {
        const { name, wiki } = data||{};
        this.name = name;
        this.wiki = wiki;
      });
    }
  };
</script>
