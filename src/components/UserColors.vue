<template>
<div
  id="UserColors"
  v-bind:style="{ color: colorMain, 'background-color': backgroundMain }"
 >
  <input
    type="checkbox"
    id="editUserColors"
    v-model="editUserColors"
    v-on:input="$emit('input', $event.target.value)"
   >
  <label
    for="editUserColors"
    v-bind:style="{ color: colorMain, 'background-color': backgroundMain }"
   >
    Edit User Colors
   </label>
  <div 
    id="panelUserColors"
   >
    <div
      v-bind:style="{ color: colorMain, background: backgroundMain }"
     >
      <input
        type="text"
        v-model="colorMain"
        v-bind:style="{ border: '3px inset inherit', color: colorMain, background: backgroundMain }"
        v-on:input="$emit('input', $event.target.value)"
       >
      <label for="colorMain" >
        Main Window Color
       </label>
      <br>
      <input
        type="text"
        v-model="backgroundMain"
        v-bind:style="{ border: '3px inset inherit', color: colorMain, background: backgroundMain }"
        v-on:input="$emit('input', $event.target.value)"
       >
      <label for="backgroundMain" >
        Main Window Background
       </label>
     </div>
    <div
      v-bind:style="{ border: '3px inset inherit', color: colorMenu, background: backgroundMenu }"
     >
      <input
        type="text"
        v-model="colorMenu"
        v-bind:style="{ border: '3px inset inherit', color: colorMenu, background: backgroundMenu }"
        v-on:input="$emit('input', $event.target.value)"
       >
      <label for="colorMenu" >
        Menu Color
       </label>
      <br>
      <input
        type="text"
        v-model="backgroundMenu"
        v-bind:style="{ border: '3px inset inherit', color: colorMenu, background: backgroundMenu }"
        v-on:input="$emit('input', $event.target.value)"
       >
      <label for="backgroundMenu" >
        Menu Background
       </label>
     </div>
    <div
      v-bind:style="{ color: colorError, background: backgroundError }"
     >
      <input
        type="text"
        v-model="colorError"
        v-bind:style="{ border: '3px inset inherit', color: colorError, background: backgroundError }"
        v-on:input="$emit('input', $event.target.value)"
       >
      <label for="colorError" >
        Error Color
       </label>
      <br>
      <input
        type="text"
        v-model="backgroundError"
        v-bind:style="{ border: '3px inset inherit', color: colorError, 'background-color': backgroundError }"
        v-on:input="$emit('input', $event.target.value)"
       >
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
    return {
      colorMain: "#ddd",
      backgroundMain: "#222",
      colorMenu: "#fff",
      backgroundMenu: "#000",
      colorError: "#700",
      backgroundError: "#300",
      editUserColors: true,
      ntv: true
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