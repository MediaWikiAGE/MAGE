<template><img class="select-none" :class="{'dark:filter dark:invert dark:contrast-75': !this.noinvert}" style="-webkit-user-drag: none" :width="width" :height="height" :src="image"></template>
<script>
export default {
  data: function() {
    return {
      image: require(`../assets/icons/${this.icon}.svg`).default
    };
  },
  props: [ "width", "height", "icon", "noinvert" ]
};
</script>
