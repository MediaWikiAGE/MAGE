<template>
  <div id="app">
    <UserColors />
    <Header />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>

<script>
import UserColors from "./components/UserColors";
import Header from "./components/Header";
import Todos from "./components/MainPage";

export default {
  name: "App",
  components: {
    UserColors,
    Header,
    Todos,
  },
  data() {
    return {
      todos: [
        {
          id: 1,
          title: "Create main page",
          completed: true,
        },
        {
          id: 2,
          title: "Create login page",
          completed: false,
        },
        {
          id: 3,
          title: "Create backend for storing settings",
          completed: false,
        },
      ],
    };
  },
  methods: {
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body, p, h1 {
  font-family: "monospace";
  line-height: 1.4;
  -webkit-font-feature-settings: "liga" on, "calt" on;
  text-rendering: optimizeLegibility;
}
</style>
