<template>
  <div id="loginentry" style="left: 0; top: 0; width: 100%; height: 100%; vertical-align: top; grid-template-columns: max-content auto; grid-template-rows: max-content max-content max-content max-content; grid-gap: 0.25em;" class="grid">

    <div class="menu" title="The username for the wiki account."> Account username </div>
    <div class="menu"> <input type="text" id="account" name="name" class="w-full outline-none"> </div>

    <div class="menu" title="The BotPasswords username for generated credentials."> Bot Password username </div>
    <div class="menu"> <input type="text" id="username" name="bpname" class="w-full outline-none"> </div>

    <div class="menu" title="The BotPassword password for generated credentials. Do not use your original account password."> Bot Password password </div>
    <div class="menu"> <input type="password" id="password" name="bppassword" class="w-full outline-none"> </div>
    
    <div title="Add to existing wiki/farm"> <input type="checkbox" id="addToExisting" name="addToExisting" :value=false @change="addToExisting = !addToExisting"> <label for="addToExisting"> Add to existing wiki/farm </label> </div>
    <div v-show="addToExisting"> <label title="Farms this wiki may be a part of."> Farms: </label> <Dropdown class="my-dropdown-toggle" :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect" :placeholder="'Select an Item'" :closeOnOutsideClick="true" /> </div>

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