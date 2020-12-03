<template>
  <footer class="py-2 text-white bg-black">
    <div
      class="w-full mx-auto space-y-4 overflow-hidden text-xs sm:px-6 lg:px-8"
    >
      <template v-if="current_user.name">
        Logged in as {{current_user.name}} @ {{current_user.wiki}}
      </template>
      <template v-else>
        Not logged in
      </template>
    </div>
  </footer>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    created() {
      window.api.remote("getUser").then(data => {
        this.$store.commit("current_user", data);
      });
    },
    computed: mapState(["current_user"])
  };
</script>
