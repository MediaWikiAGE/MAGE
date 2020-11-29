<template>
<div id="UserColors" :style="{ color: colorMain, background: backgoundMain, font: pxFont + 'px ' + '\'' + nameFont + '\', monospace' }" >
  <span id="editUserColors" :style="{ border: '3px outset ' + colorMenu, color: colorMenu, background: backgroundMenu }" v-on:click="editUserColors = !editUserColors;"> Edit User Colors </span>
  <div id="panelUserColors" :style="{ display: ( editUserColors ? 'inline-block' : 'none' ) }">
    <div :style="{ border: '1px solid ' + currentStyles.colorMain, color: currentStyles.colorMain, background: currentStyles.backgroundMain }" >
      <input :style="{ border: '1px inset ' + currentStyles.colorMain, color: colorMain, background: backgroundMain }" v-on:input="$emit('input', $event.target.value)" type="text" v-model="nameFont" >
      <input :style="{ border: '1px inset ' + currentStyles.colorMain, color: colorMain, background: backgroundMain, width: '2em' }" v-on:input="$emit('input', $event.target.value)" type="text" v-model="currentStyles.pxFont" >
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
      <br> <input type="text" v-model="backgroundError" :style="{ border: '1px inset ' + colorMain, color: colorError, background: backgroundError }" v-on:input="$emit('input', $event.target.value)" >
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "UserColors",
  data() {
    return {
      colorMain: "#fff",
      backgroundMain: "#000",
      colorMenu: "#777",
      backgroundMenu: "#333",
      colorError: "#700",
      backgroundError: "#300",
      pxFont: 12,
      nameFont: "monospace",
      editUserColors: false
      };
    },
el: "#app",
methods: {
  updateCSS: function () {  }
  }
};
</script>
