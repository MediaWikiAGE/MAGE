<template>
  <div id="loginentry" class="flex flex-col">

    <div class="grid grid-cols-1 sm:grid-cols-2-fit-left grid-flow-row">
      <label for="accountName" class="m-0.5">Wiki account name</label>
      <input type="text" id="accountName" name="accountName" class="m-0.5">

      <label for="botPasswordName" class="m-0.5">Bot password name</label>
      <input type="text" id="botPasswordName" name="botPasswordName" class="m-0.5">

      <label for="botPassword" class="m-0.5">Bot password</label>
      <input type="text" id="botPassword" name="botPassword" class="m-0.5">
    </div>

    <div title="Add to existing wiki/farm">
      <input type="checkbox" id="addToExisting" name="addToExisting" :value=false @change="addToExisting = !addToExisting">
      <label for="addToExisting"> Add to existing wiki/farm </label>
    </div>
    <div v-show="addToExisting">
      <label title="Farms this wiki may be a part of."> Farms: </label>
      <Dropdown class="my-dropdown-toggle" :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect" :placeholder="'Select an Item'" :closeOnOutsideClick="true" />
    </div>

  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown.vue";

export default {
  components: { Dropdown },
  data() {
    return {
      addToExisting: false,

      arrayOfObjects: [
        { id: 1, name: "fandom.com" },
        { id: 1, name: "gamepedia.com" }
      ],
      object: {
        name: "None",
      },

      farms: []
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object = payload;
    }
  }
};
</script>
