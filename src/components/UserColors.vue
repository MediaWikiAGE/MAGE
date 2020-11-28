<template>
<div id="UserColors" :style="{ 'display':'inline-block', 'color':'transparent', 'background':'transparent', 'text-align':'center' }">
    <div id="editUserColors" v-on:click="editUserColors = (!editUserColors);" :style="{ 'border': '3px outset ' + colorMenu, 'background': backgroundMenu, 'color': colorMenu }"> Edit User Colors </div>
    <div id="panelUserColors" :style="{ display: ( editUserColors ? 'inline-block' : 'none' ) }">
        <div :style="{ 'border':'6px double ' + colorMain, 'color':colorMain, 'background':backgroundMain }" >
            <label for="colorMain" > Window Color </label>
            <br>
            <input type="text" v-model="colorMain" :style="{ 'border':'2px inset ' + colorMain, 'color':colorMain, 'background':backgroundMain }" v-on:input="$emit('input', $event.target.value)" >
            <br>
            <label for="backgroundMain" > Window Background </label>
            <br>
            <input type="text" v-model="backgroundMain" :style="{ 'border':'2px inset ' + colorMain, 'color':colorMain, 'background':backgroundMain }" v-on:input="$emit('input', $event.target.value)" >
          </div>
        <div :style="{ 'border':'6px double ' + colorMain, 'color':colorMenu, 'background':backgroundMenu }" >
            <label for="colorMenu" > Menu Color </label>
            <br>
            <input type="text" v-model="colorMenu" :style="{ 'border':'2px inset' + colorMain, 'color':colorMenu, 'background':backgroundMenu }" v-on:input="$emit('input', $event.target.value)" >
            <br>
            <label for="backgroundMenu" > Menu Background </label>
            <br>
            <input type="text" v-model="backgroundMenu" :style="{ 'border':'2px inset' + colorMain, 'color':colorMenu, 'background':backgroundMenu }" v-on:input="$emit('input', $event.target.value)" >
          </div>
        <div v-bind:style="{ 'border':'6px double ' + colorMain, 'color':colorError, 'background':backgroundError }" >
            <label for="colorError" > Error Color </label>
            <br>
            <input type="text" v-model="colorError" :style="{ 'border':'2px inset ' + colorMain, 'color':colorError, 'background':backgroundError }" v-on:input="$emit('input', $event.target.value)" >
            <br>
            <label for="backgroundError" > Error Background </label>
            <br>
            <input type="text" v-model="backgroundError" :style="{ 'border':'2px inset ' + colorMain, 'color':colorError, 'background-color': backgroundError }" v-on:input="$emit('input', $event.target.value)" >
          </div>
      </div>
  </div>
</template>

<script>
export default {

name: "UserColors",

data() {
return { colorMain: "#fff", backgroundMain: "#000", colorMenu: "#777", backgroundMenu: "#333", colorError: "#700", backgroundError: "#300", editUserColors: false, GlobalStringCSS: "" };
},

methods: {

UpdateCSS: function () {
localStorage.colorMain = this.colorMain;
localStorage.backgroundMain = this.backgroundMain;
localStorage.colorMenu = this.colorMenu;
localStorage.backgroundMenu = this.backgroundMenu;
localStorage.colorError = this.colorError;
localStorage.backgroundError = this.backgroundError;
}

},

el: "#app",

mounted() {
if (localStorage.colorMain) this.colorMain = localStorage.colorMain;
if (localStorage.backgroundMain) this.backgroundMain = localStorage.backgroundMain;
if (localStorage.colorMenu) this.colorMenu = localStorage.colorMenu;
if (localStorage.backgroundMenu) this.backgroundMenu = localStorage.backgroundMenu;
if (localStorage.colorError) this.colorError = localStorage.colorError;
if (localStorage.backgroundError) this.backgroundError = localStorage.backgroundError;
this.editUserColors = false;
this.UpdateCSS;
}

};
</script>

<style>
body { background: backgroundMain; color: colorMain; position: relative; left: 0; top: 0; right: 0; bottom: 0; }
#app { background: backgroundMain; color: colorMain; position: relative; left: 0; top: 0; right: 0; bottom: 0; }
</style>
