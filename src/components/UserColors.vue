<template>
<div id="UserColors"
  :style="{ display: 'inline-block', color: colorMain, background: 'transparent', font: pxFont + 'px ' + '\'' + nameFont + '\', monospace',  }" >
  <div :style="{ border: '3px outset ' + colorMenu, color: colorMenu, background: backgroundMenu, width: auto }"
    id="editUserColors"
    v-on:click="editUserColors = !editUserColors;"
    > Edit User Colors </div>
  <div id="panelUserColors" :style="{ display: ( editUserColors ? 'inline-block' : 'none' ) }">
    <div :style="{ border: '1px solid ' + colorMain, color: colorMain, background: backgroundMain }" >
      <input :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain }"
        v-on:input="$emit('input', $event.target.value)"
        type="text"
        v-model="nameFont" >
      <input :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain, width: '2em' }"
        v-on:input="$emit('input', $event.target.value)"
        type="text"
        v-model="pxFont" >
      <label for="pxFont" > px </label>
      <br>
      <label for="colorMain" > Window Color </label>
      <br>
      <input :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain }"
        v-on:input="$emit('input', $event.target.value)"
        type="text"
        v-model="colorMain" >
      <br>
      <label for="backgroundMain" > Window Background </label>
      <br>
      <input type="text"
        v-model="backgroundMain"
        :style="{ border: '1px inset ' + colorMain, color: colorMain, background: backgroundMain }"
        v-on:input="$emit('input', $event.target.value)" >
    </div>
    <div :style="{ border: '1px solid ' + colorMain, color: colorMenu, background: backgroundMenu }" >
      <label for="colorMenu" > Menu Color </label>
      <br>
      <input type="text"
        v-model="colorMenu"
        :style="{ border: '1px inset' + colorMain, color: colorMenu, background: backgroundMenu }"
        v-on:input="$emit('input', $event.target.value)" >
        <br>
        <label for="backgroundMenu" > Menu Background </label>
        <br>
        <input type="text"
          v-model="backgroundMenu"
          :style="{ border: '1px inset' + colorMain, color: colorMenu, background: backgroundMenu }"
          v-on:input="$emit('input', $event.target.value)" >
          </div>
        <div v-bind:style="{ border: '1px solid ' + colorMain, color: colorError, background: backgroundError }" >
          <label for="colorError" > Error Color </label>
          <br>
          <input type="text"
            v-model="colorError"
            :style="{ border: '1px inset ' + colorMain, color: colorError, background: backgroundError }"
            v-on:input="$emit('input', $event.target.value)" >
          <br>
          <label for="backgroundError" > Error Background </label>
          <br>
          <input type="text"
            v-model="backgroundError"
            :style="{ border: '1px inset ' + colorMain, color: colorError, 'background-color': backgroundError }"
            v-on:input="$emit('input', $event.target.value)" >
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "UserColors",
  data() {
    return { colorMain: "#fff", backgroundMain: "#000", colorMenu: "#777", backgroundMenu: "#333", colorError: "#700", backgroundError: "#300", editUserColors: false, pxFont: 12, nameFont: "monospace" };
  },
  el: "#app",
  mounted() {
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
  watch: {
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
};
</script>
