<template>
<div
  :style="{ display: 'inline-block', border: '6px groove ' + colorMain, color: colorMain, background: backgroundMain }" >
  id="UserColors"
  <span :style="{ displaborder: '3px outset ' + colorMenu, color: colorMenu, background: backgroundMenu }"
    id="editUserColors"
    v-on:click="editUserColors = !editUserColors;"
    > Edit User Colors </span>
  <div :style="{ display: ( editUserColors ? 'inline-block' : 'none' ) }"
    id="panelUserColors">
    <div :style="{ border: '6px double ' + colorMain, color: colorMain, background: backgroundMain }" >
      <input :style="{ border: '2px inset ' + colorMain, color: colorMain, background: backgroundMain }"
        v-on:input="$emit('input', $event.target.value)"
        type="text"
        v-model="colorMain" >
      <label for="colorMain" > Window Color </label>
      <br>
      <input type="text" v-model="backgroundMain"
        :style="{ border: '2px inset ' + colorMain, color: colorMain, background: backgroundMain }"
        v-on:input="$emit('input', $event.target.value)" >
      <label for="backgroundMain" > Window Background </label>
    </div>
    <div :style="{ border: '6px double ' + colorMain, color: colorMenu, background: backgroundMenu }" >
      <input type="text"
        v-model="colorMenu"
        :style="{ border: '2px inset' + colorMain, color: colorMenu, background: backgroundMenu }"
        v-on:input="$emit('input', $event.target.value)" >
        <label for="colorMenu" > Menu Color </label>
        <br>
        <input type="text"
          v-model="backgroundMenu"
          :style="{ border: '2px inset' + colorMain, color: colorMenu, background: backgroundMenu }"
          v-on:input="$emit('input', $event.target.value)" >
        <label for="backgroundMenu" > Menu Background </label>
          </div>
        <div v-bind:style="{ border: '6px double ' + colorMain, color: colorError, background: backgroundError }" >
          <input type="text"
            v-model="colorError"
            :style="{ border: '2px inset ' + colorMain, color: colorError, background: backgroundError }"
            v-on:input="$emit('input', $event.target.value)" >
          <label for="colorError" > Error Color </label>
          <br>
          <input type="text"
            v-model="backgroundError"
            :style="{ border: '2px inset ' + colorMain, color: colorError, 'background-color': backgroundError }"
            v-on:input="$emit('input', $event.target.value)" >
          <label for="backgroundError" > Error Background </label>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "UserColors",
  data() {
    return { colorMain: "#fff", backgroundMain: "#000", colorMenu: "#777", backgroundMenu: "#333", colorError: "#700", backgroundError: "#300", editUserColors: false, ntv: true };
  },
  el: "#app",
  mounted() {
    if (localStorage.colorMain) { this.colorMain = localStorage.colorMain; }
    if (localStorage.backgroundMain) { this.backgroundMain = localStorage.backgroundMain; }
    if (localStorage.colorMenu) { this.colorMenu = localStorage.colorMenu; }
    if (localStorage.backgroundMenu) { this.backgroundMenu = localStorage.backgroundMenu; }
    if (localStorage.colorError) { this.colorError = localStorage.colorError; }
    if (localStorage.backgroundError) { this.backgroundError = localStorage.backgroundError; }
    this.editUserColors = false;
    this.$nextTick(function () {  });
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
