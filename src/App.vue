<template>
<div id="app" :style="{ color: colorMain, background: backgroundMain, font: pxFont + 'px ' + '\'' + nameFont + '\', monospace', left:0, top:0, width: '100vw', height:'100vh', padding: '0.0625em' }" >
  <div title="Font Settings" :style="{ position: 'absolute', right: 0, top: 0, width: '1em', border: '1px outset ' + colorMenu, color: colorMenu, background: backgroundMenu }"
    id="editUserColors" v-on:click="{ editUserColors = !editUserColors; updatePreferences(); }" >
    &#182;
  </div>

<Header />
<Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />

<div id="UserColors"
  :style="{ display: 'inline-block', color: colorMain, background: backgroundMain, font: pxFont + 'px ' + '\'' + nameFont + '\', monospace',  }" >
  <div id="panelUserColors" :style="{ display: ( editUserColors ? 'inline-block' : 'none' ) }">
    <div :style="{ border: '1px solid ' + colorMain, color: colorMain, background: backgroundMain }" >
      <label for="language" > Language: {{language}} </label>
      <br> <input :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain }" v-on:input="$emit('input', $event.target.value)" type="text" v-model="language" >
      <br> <label for="nameFont" > Font </label>
      <br> <input :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain }" v-on:input="$emit('input', $event.target.value)" type="text" v-model="nameFont" >
      <input :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain, width: '2em' }" v-on:input="$emit('input', $event.target.value)" type="text" v-model="pxFont" >
      <label for="pxFont" > px </label>
      <br> <label for="colorMain" > Window Color </label>
      <br> <input :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain }" v-on:input="$emit('input', $event.target.value)" type="text" v-model="colorMain" >
      <br> <label for="backgroundMain" > Window Background </label>
      <br> <input type="text" v-model="backgroundMain" :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain }" v-on:input="$emit('input', $event.target.value)" >
    </div>
    <div :style="{ border: '1px solid ' + colorMain, color: colorMenu, background: backgroundMenu }" >
      <label for="colorMenu" > Menu Color </label>
      <br> <input type="text" v-model="colorMenu" :style="{ border: '1px inset' + colorMain, color: colorMenu, background: backgroundMenu }" v-on:input="$emit('input', $event.target.value)" >
      <br> <label for="backgroundMenu" > Menu Background </label>
      <br> <input type="text" v-model="backgroundMenu" :style="{ border: '1px inset' + colorMain, color: colorMenu, background: backgroundMenu }" v-on:input="$emit('input', $event.target.value)" >
    </div>
    <div v-bind:style="{ border: '1px solid ' + colorMain, color: colorError, background: backgroundError }" >
      <label for="colorError" > Error Color </label>
      <br> <input type="text" v-model="colorError" :style="{ border: '1px inset ' + colorMain, color: colorError, background: backgroundError }" v-on:input="$emit('input', $event.target.value)" >
      <br> <label for="backgroundError" > Error Background </label>
      <br> <input type="text" v-model="backgroundError" :style="{ border: '1px inset ' + colorMain, color: colorError, 'background-color': backgroundError }" v-on:input="$emit('input', $event.target.value)" >
    </div>
  </div>
</div>

</div>
</template>

<script>
import Header from "./components/Header";
import Todos from "./components/MainPage";

export default {

  name: "App",

  data() {
    return {

      todos:
        [
          { id: 1, completed: true,  title: "Create main page" },
          { id: 2, completed: false, title: "Create login page" },
          { id: 3, completed: false, title: "Create backend for storing settings" }
        ],

      language: "en-us",

      pxFont: 12,
      nameFont: "monospace",

      colorMain: "#fff",
      backgroundMain: "#000",
      colorMenu: "#777",
      backgroundMenu: "#333",
      colorError: "#700",
      backgroundError: "#300",
      editUserColors: false,

      };
    },

  components: {
    Header,
    Todos,
    },

  el: "#app",

  methods: {

    updatePreferences() {
      localStorage.language = this.language;

      localStorage.pxFont = this.pxFont;
      localStorage.nameFont = this.nameFont;

      localStorage.colorMain = this.colorMain;
      localStorage.backgroundMain = this.backgroundMain;
      localStorage.colorMenu = this.colorMenu;
      localStorage.backgroundMenu = this.backgroundMenu;
      localStorage.colorError = this.colorError;
      localStorage.backgroundError = this.backgroundError;

      this.$nextTick(function () {  });
      },

    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      },

  },

  mounted() {

    if (localStorage.language) { this.language = localStorage.language; }

    if (localStorage.pxFont) { this.pxFont = localStorage.pxFont; }
    if (localStorage.nameFont) { this.nameFont = localStorage.nameFont; }

    if (localStorage.colorMain) { this.colorMain = localStorage.colorMain; }
    if (localStorage.backgroundMain) { this.backgroundMain = localStorage.backgroundMain; }
    if (localStorage.colorMenu) { this.colorMenu = localStorage.colorMenu; }
    if (localStorage.backgroundMenu) { this.backgroundMenu = localStorage.backgroundMenu; }
    if (localStorage.colorError) { this.colorError = localStorage.colorError; }
    if (localStorage.backgroundError) { this.backgroundError = localStorage.backgroundError; }

    this.editUserColors = false;

    this.$nextTick(function () {  });

  },

/*
  watch: {
    language(newValue) { localStorage.language = newValue; },
    pxFont(newValue) { localStorage.pxFont = newValue; },
    nameFont(newValue) { localStorage.nameFont = newValue; },
    colorMain(newValue) { localStorage.colorMain = newValue; },
    backgroundMain(newValue) { localStorage.backgroundMain = newValue; },
    colorMenu(newValue) { localStorage.colorMenu = newValue; },
    backgroundMenu(newValue) { localStorage.backgroundMenu = newValue; },
    colorError(newValue) { localStorage.colorError = newValue; },
    backgroundError(newValue) { localStorage.backgroundError = newValue; },
    editUserColors(newValue) { localStorage.editUserColors = newValue; }
  }
*/

};
</script>

<style>
* {
box-sizing: border-box;
margin: 0;
line-height: 3ex;
padding: 0;
-webkit-font-feature-settings: "liga" on, "calt" on;
text-rendering: optimizeLegibility;
}

div {
padding: 0.0625em;
}

#app {
padding: 0;
}
</style>
