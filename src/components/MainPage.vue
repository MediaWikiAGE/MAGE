<template>
  <div>
    <div v-bind:key="todo.id" v-for="todo in todos">
      <TodoItem
        v-bind:todo="todo"
        v-on:del-todo="$emit('del-todo', todo.id)"
        @set-completed="
          ($value) => {
            todo.completed = $value;
          }
        "
      />
    </div>
  </div>
</template>

<script>
import TodoItem from "./MainPageItem.vue";

export default {
  name: "Todo List",
  components: {
    TodoItem,
  },
  props: ["todos"],
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>