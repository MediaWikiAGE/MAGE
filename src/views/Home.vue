<template>
  <div>
    <p>Hi</p>
    <ul>
      <li v-for="user in users" :key="user.key" v-on:click="login" v-bind:data-id="user.key">
        {{user.name}} {{user.groups}} {{user.server}}{{user.scriptpath}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({ users: [] }),
  methods: {
    login: event => {
      event.target;
    }
  },
  created() {
    window.api.remote("getUserLists").then(data => {
      this.users = data;
    });
  }
};
</script>
