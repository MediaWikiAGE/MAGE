<template>
  <div class="lg:w-1/2 md:w-2/3 mx-auto">
    <div class="flex flex-wrap -m-2">
      <div class="p-2 w-2/3">
        <div class="relative">
          <label for="account" title="The username for the wiki account."> Account username </label>
          <input type="text" id="account" name="name" class="w-full outline-none">
        </div>
      </div>
      <div class="p-2 w-1/2">
        <div class="relative">
          <label for="username" title="The username for the wiki account."> Bot Password name </label>
          <input type="text" id="username" name="name" class="w-full outline-none">
        </div>
      </div>
      <div class="p-2 w-1/2">
        <div class="relative">
          <label for="password" class="leading-7 text-sm text-gray-600" title="The password for the wiki account."> Bot Password string </label>
          <input type="email" id="password" name="email" class="w-full outline-none">
        </div>
      </div>
      <div class="p-2">
        <input type="checkbox" id="addToExisting" name="addToExisting" :value=false @change="addToExisting = !addToExisting" title="Add to existing wiki/farm">
        <label for="addToExisting"> Add to existing wiki/farm </label>
      </div>
      <div class="p-2 w-1/2" v-if="addToExisting">
        <label title="Farms this wiki may be a part of."> Farms: </label>
        <Dropdown class="my-dropdown-toggle" :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect" :placeholder="'Select an Item'" :closeOnOutsideClick="true">
        </Dropdown>
      </div>
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