<template>
<footer>
  <template v-if="current_user && current_user.server">
    <template v-if="current_user.anon"> Known </template>
    <template v-else> Logged in </template> as {{current_user.name}} @ {{current_user.server}}{{current_user.scriptpath}}
  </template>
  <template v-else> Not connected to server </template>
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
