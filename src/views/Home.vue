<template>
  <div>
    <b>User Lists</b>
    <ul>
      <li v-for="user in users" :key="user.key">
        <button v-bind:data-id="user.key" v-on:click="login" class="hover:bg-purple-100 active:bg-purple-200">{{user.name}} | {{user.server}}{{user.scriptpath}}</button> {{user.groups}}
      </li>
    </ul>
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
        this.$store.commit("current_user", data);
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
