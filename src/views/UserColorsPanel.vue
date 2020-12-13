<template>
<div id="panelUserColors" :style="UCMenu" class="dib focus:outline-none">
<table :style="UCMenu">
<tr>
 <td :style="UCMenu"> Font Name </td>
 <td :style="UCMenu"> <input :style="UCInputBox" @input="$emit('input', $event.target.value)" type="text" :value="nameFont" class="long focus:outline-none" > </td>
 <td style="visibility: hidden;" rowspan="4"> &nbsp; </td>
 <td :style="UCMenu"> Font Size </td>
 <td :style="UCMenu"> <input :style="UCInputBox" @input="$emit('input', $event.target.value)" type="text" :value="pxFont" class="short focus:outline-none" > </td>
</tr>
<tr>
 <td :style="UCMenu"> Window Color </td>
 <td :style="UCMenu"> <input type="text" :value="colorMain" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" > </td>
 <td :style="UCMenu"> Window Background </td>
 <td :style="UCMenu"> <input type="text" :value="backgroundMain" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" > </td>
</tr>
<tr>
 <td :style="UCMenu"> Menu Color </td>
 <td :style="UCMenu"> <input type="text" :value="colorMenu" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" > </td>
 <td :style="UCMenu"> Menu Background </td>
 <td :style="UCMenu"> <input type="text" :value="backgroundMenu" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" > </td>
</tr>
<tr>
 <td :style="UCMenu"> Error Color </td>
 <td :style="UCMenu"> <input type="text" :value="colorError" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" > </td>
 <td :style="UCMenu"> Error Background </td>
 <td :style="UCMenu"> <input type="text" :value="backgroundError" :style="UCInputBox" @input="$emit('input', $event.target.value)" class="normal focus:outline-none" > </td>
</tr>
</table>
</div>
</template>

<script>
export default {
name: "UserColorsPanel",
};
</script>
