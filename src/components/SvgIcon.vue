<template><img style="-webkit-user-drag: none" :width="width" :height="height" :src="image"></template>
<script>
export default {
  data: function() {
    return {
      image: require(`../assets/icons/${this.icon}.svg`)
    };
  },
  props: {
    width: Number,
    height: Number,
    icon: String
  }
};
</script>
