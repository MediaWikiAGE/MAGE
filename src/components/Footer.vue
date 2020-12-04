<template>
  <footer class="py-2 text-white bg-black">
    <div
      class="w-full mx-auto space-y-4 overflow-hidden text-xs sm:px-6 lg:px-8"
    >
      <template v-if="current_user && current_user.server">
        <template v-if="current_user.anon">
          Known
        </template>
        <template v-else>
          Logged in
        </template> as {{current_user.name}} @ {{current_user.server}}{{current_user.scriptpath}}
      </template>
      <template v-else>
        Not conneted to server
      </template>
    </div>
  </footer>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    created() {
      window.api.remote("getUser").then(data => {
        this.$store.state.current_user = data;
      });
    },
    computed: mapState(["current_user"])
  };
</script>
