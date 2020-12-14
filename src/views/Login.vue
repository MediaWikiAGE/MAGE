<template>
  <div class="lg:w-1/2 md:w-2/3 mx-auto">
    <div class="flex flex-wrap -m-2">
      <div class="p-2 w-2/3">
        <div class="relative">
          <label
              for="account"
              class="leading-7 text-sm text-gray-600"
              @mouseover="accountHover = true"
              @mouseleave="accountHover = false"
          >Account username
          </label>
          <span v-if="accountHover">The username for the wiki account.</span>
          <input type="text" id="account" name="name" class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
      </div>
      <div class="p-2 w-1/2">
        <div class="relative">
          <label
              for="username"
              class="leading-7 text-sm text-gray-600"
              @mouseover="usernameHover = true"
              @mouseleave="usernameHover = false"
          >Bot Password name
          </label>
          <span v-if="usernameHover">The username for the wiki account.</span>
          <input type="text" id="username" name="name" class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
      </div>
      <div class="p-2 w-1/2">
        <div class="relative">
          <label
              for="password"
              class="leading-7 text-sm text-gray-600"
              @mouseover="passwordHover = true"
              @mouseleave="passwordHover = false"
          >Bot Password string</label>
          <span v-if="passwordHover">The password for the wiki account.</span>
          <input type="email" id="password" name="email" class="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
      </div>
      <div class="p-2">
        <input type="checkbox" id="addToExisting" name="addToExisting" :value=false @change="addToExisting = !addToExisting">
        <label
            for="addToExisting"
            class="leading-7 text-sm text-gray-600"
        >Add to existing wiki/farm
        </label>
      </div>
      <div class="p-2 w-1/2" v-if="addToExisting">
        <label
            class="leading-7 text-sm text-gray-600"
            @mouseover="farmsHover = true"
            @mouseleave="farmsHover = false"
        >Farms: </label>
        <span v-if="farmsHover">Farms this wiki may be a part of</span>

        <Dropdown class="my-dropdown-toggle"
                  :options="arrayOfObjects"
                  :selected="object"
                  v-on:updateOption="methodToRunOnSelect"
                  :placeholder="'Select an Item'"
                  :closeOnOutsideClick="true">>

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
      accountHover: false,
      usernameHover: false,
      passwordHover: false,
      farmsHover: false,
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