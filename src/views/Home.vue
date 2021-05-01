<template>
  <div class="dark:bg-gray-900 h-full">
    <div class="w-full text-center">
      <h2 class="text-3xl">Welcome to MAGE</h2>
    </div>

    <div class="mt-3 ml-2">
      <h3 class="text-xl">Choose a wiki to operate on:</h3>

      <div class="max-w-xs">
        <div class="select-none flex flex-col w-full">
          <label for="chosenFarm" class="pr-1">Wiki farm name</label>
          <select id="chosenFarm" name="chosenFarm" class="flex-grow dark:bg-gray-700">
            <option value="0" selected>None (standalone wiki)</option>
          </select>
        </div>

        <div class="select-none flex flex-col w-full mt-2">
          <label for="chosenWiki" class="pr-1">Wiki name</label>
          <select id="chosenWiki" name="chosenWiki" class="flex-grow dark:bg-gray-700">
            <option value="0" disabled selected>None</option>
          </select>
        </div>

        <div class="select-none flex flex-col w-full mt-2">
          <label for="chosenAccount" class="pr-1">User account</label>
          <select id="chosenAccount" name="chosenAccount" class="flex-grow dark:bg-gray-700">
            <option value="0" selected>None (identify using your IP)</option>
          </select>
        </div>
      </div>

      <p class="mt-3 text-sm italic">MAGE will log in automatically as needed to run tasks</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({ users: [], name: null, wiki: null }),
  methods: {
    login(event) {
      const userKey = event.target.dataset.id;
      window.api.remote("loginUser", userKey).then(data => {
        this.$store.state.current_user = { ...data.cacheUser, ...data.cacheSite };
      });
    },
    logout(event) {
      window.api.remote("logoutUser").then(data => {
        this.$store.state.current_user = { ...data.cacheUser, ...data.cacheSite };
      });
    },
    disconnect(event) {
      const userKey = event.target.dataset.id;
      window.api.remote("disconnectServer", userKey).then(data => {
        this.$store.state.current_user = { ...data.cacheUser, ...data.cacheSite };
      });
    }
  },
  created() {
    window.api.remote("getUserLists").then(data => {
      this.users = data;
    });
  }
};
</script>
