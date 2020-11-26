<template>
<div id="UserColors" v-bind:style="{ color: colorMain, 'background-color': backgroundMain }">
<input type="checkbox" id="editUserColors" v-model="editUserColors">
<label for="editUserColors" v-bind:style="{ color: colorMain, 'background-color': backgroundMain }">Edit User Colors</label>
<div id="panelUserColors">
<div v-bind:style="{ color: colorMain, 'background-color': backgroundMain }">
<input type="text" v-model="colorMain" v-bind:style="{ color: colorMain, 'background-color': backgroundMain }">
<label for="colorMain" v-bind:style="{ color: colorMain, 'background-color': backgroundMain }">Main Window Color</label>
<br>
<input type="text" v-model="backgroundMain" v-bind:style="{ color: colorMain, 'background-color': backgroundMain }">
<label for="backgroundMain" v-bind:style="{ color: colorMain, 'background-color': backgroundMain }">Main Window Background</label>
</div>
<div v-bind:style="{ color: colorMenu, 'background-color': backgroundMenu }">
<input type="text" v-model="colorMenu" v-bind:style="{ color: colorMenu, 'background-color': backgroundMenu }">
  <label for="colorMenu" v-bind:style="{ color: colorMenu, 'background-color': backgroundMenu }">Menu Color</label>
  <br>
  <input type="text" v-model="backgroundMenu" v-bind:style="{ color: colorMenu, 'background-color': backgroundMenu }">
  <label for="backgroundMenu">Menu Background</label>
</div>
  <div v-bind:style="{ color: colorError, 'background-color': backgroundError }">
    <input type="text" v-model="colorError" v-bind:style="{ color: colorError, 'background-color': backgroundError }">
    <label for="colorError" v-bind:style="{ color: colorError, 'background-color': backgroundError }">Error Color</label>
    <br>
    <input type="text" v-model="backgroundError" v-bind:style="{ color: colorError, 'background-color': backgroundError }">
    <label for="backgroundError" v-bind:style="{ color: colorError, 'background-color': backgroundError }">Error Background</label>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "UserColors",
  data() {
    return {
      colorMain: "#ddd",
      backgroundMain: "#222",
      colorMenu: "#fff",
      backgroundMenu: "#000",
      colorError: "#700",
      backgroundError: "#300",
      editUserColors: true
    };
  },
  el: "#app",
  mounted() {
    if (localStorage.colorMain) {
      this.colorMain = localStorage.colorMain;
    }
    if (localStorage.backgroundMain) {
      this.backgroundMain = localStorage.backgroundMain;
    }
    if (localStorage.colorMenu) {
      this.colorMenu = localStorage.colorMenu;
    }
    if (localStorage.backgroundMenu) {
      this.backgroundMenu = localStorage.backgroundMenu;
    }
    if (localStorage.colorError) {
      this.colorError = localStorage.colorError;
    }
    if (localStorage.backgroundError) {
      this.backgroundError = localStorage.backgroundError;
    }
    if (localStorage.editUserColors) {
      this.editUserColors = localStorage.editUserColors;
    }
  },
  watch: {
    colorMain(newValue) { localStorage.colorMain = newValue; },
    backgroundMain(newValue) { localStorage.backgroundMain = newValue; },
    colorMenu(newValue) { localStorage.colorMenu = newValue; },
    backgroundMenu(newValue) { localStorage.backgroundMenu = newValue; },
    colorError(newValue) { localStorage.colorError = newValue; },
    backgroundError(newValue) { localStorage.backgroundError = newValue; },
    editUserColors(newValue) { localStorage.editUserColors = newValue; }
  }
};
</script>