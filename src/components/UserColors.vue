<template>
<div id="UserColors" :style="{ display: 'inline-block', border: '6px groove ' + colorMain, color: colorMain, background: backgroundMain }" >
    <input :style="{ border: '1px solid ' + colorMain, color: colorMain, background: backgroundMain, width: '1em' }" type="password" max-length="1" length="1" id="editUserColors" v-model="editUserColors" v-on:input="$emit('input', $event.target.value);" >
    <label for="editUserColors" :style="{ color: colorMain, background: backgroundMain }" >
        Edit User Colors
      </label>
    <div id="panelUserColors" :style="{ display: ( editUserColors ? 'inline-block' : 'none' ) }">
        <div :style="{ border: '6px double ' + colorMain, color: colorMain, background: backgroundMain }" >
            <input type="text" v-model="colorMain" :style="{ border: '2px inset ' + colorMain, color: colorMain, background: backgroundMain }" v-on:input="$emit('input', $event.target.value)" >
            <label for="colorMain" >
                Main Window Color
              </label>
            <br>
            <input type="text" v-model="backgroundMain" :style="{ border: '2px inset ' + colorMain, color: colorMain, background: backgroundMain }" v-on:input="$emit('input', $event.target.value)" >
            <label for="backgroundMain" >
                Main Window Background
              </label>
          </div>
        <div :style="{ border: '6px double ' + colorMain, color: colorMenu, background: backgroundMenu }" >
            <input type="text" v-model="colorMenu" :style="{ border: '2px inset' + colorMain, color: colorMenu, background: backgroundMenu }" v-on:input="$emit('input', $event.target.value)" >
            <label for="colorMenu" >
                Menu Color
              </label>
            <br>
            <input type="text" v-model="backgroundMenu" :style="{ border: '2px inset' + colorMain, color: colorMenu, background: backgroundMenu }" v-on:input="$emit('input', $event.target.value)" >
            <label for="backgroundMenu" >
                Menu Background
              </label>
          </div>
        <div v-bind:style="{ border: '6px double ' + colorMain, color: colorError, background: backgroundError }" >
            <input type="text" v-model="colorError" :style="{ border: '2px inset ' + colorMain, color: colorError, background: backgroundError }" v-on:input="$emit('input', $event.target.value)" >
            <label for="colorError" >
                Error Color
              </label>
            <br>
            <input type="text" v-model="backgroundError" :style="{ border: '2px inset ' + colorMain, color: colorError, 'background-color': backgroundError }" v-on:input="$emit('input', $event.target.value)" >
            <label for="backgroundError" >
                Error Background
              </label>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "UserColors",
  data() {
    return { colorMain: "#fff", backgroundMain: "#000", colorMenu: "#777", backgroundMenu: "#333", colorError: "#700", backgroundError: "#300", editUserColors: "", ntv: true };
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