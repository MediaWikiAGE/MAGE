<template>
<div id="panelUserColors" :style="[UCButton, {display: ( $root.editUserColors ? 'inline-block' : 'none' )}]" class="focus:outline-none" >
Font (size)
<input :style="UCInputBox" @input="$emit('input', $event.target.value)" type="text" :value="nameFont" class="long focus:outline-none" >
<input :style="UCInputBox" @input="$emit('input', $event.target.value)" type="text" :value="pxFont" class="short focus:outline-none" >
Window Color
<input type="text" :value="colorMain" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
Window Background
<input type="text" :value="backgroundMain" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
Menu Color
<input type="text" :value="colorMenu" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
Menu Background
<input type="text" :value="backgroundMenu" :style="[UCInputBox, {width: '8em' }]" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
Error Color
<input type="text" :value="colorError" :style="[UCInputBox, {width: '8em' }]" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
Error Background
<input type="text" :value="backgroundError" :style="[UCInputBox, {width: '8em' }]" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" >
</div>
</template>

<script>
export default {
name: "UserColorsPanel",
methods: {
  updateCSS: function () {  }
  }
};
</script>
