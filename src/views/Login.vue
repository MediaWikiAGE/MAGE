<template>
  <div id="loginentry" class="flex flex-col">

    <div class="grid grid-cols-1 sm:grid-cols-2-fit-left grid-flow-row">
      <label for="accountName" class="m-0.5">Username</label>
      <input type="text" id="accountName" name="accountName" class="m-0.5">

      <label for="botPasswordName" class="m-0.5">Bot password name</label>
      <input type="text" id="botPasswordName" name="botPasswordName" class="m-0.5">

      <label for="botPassword" class="m-0.5">Bot password</label>
      <input type="text" id="botPassword" name="botPassword" class="m-0.5">
    </div>

    <div class="m-0.5">
      <label for="addToExisting"> Add to existing? </label>
      <input type="checkbox" id="addToExisting" name="addToExisting" :value=false @change="addToExisting = !addToExisting">
    </div>
    <div class="m-0.5">
      <select :disabled="!addToExisting" name="addTo" id="addTo">
        <option value="0" disabled selected>None</option>
        <option v-for="knownFarm in farms" :key="knownFarm.id" :value="knownFarm.id">{{ knownFarm.name }}</option>
      </select>
    </div>

    <div class="m-0.5">
      <label for="isWikiFarm"> Wiki farm? </label>
      <input type="checkbox" id="isWikiFarm" name="isWikiFarm" @change="isWikiFarm = !isWikiFarm" :disabled="addToExisting">
    </div>

    <div class="m-0.5" v-if="!isWikiFarm">
      <label for="urlField">URL </label>
      <input type="text" id="urlField" name="urlField" :disabled="addToExisting" class="block">
    </div>
    <div class="m-0.5" v-else>
      <label for="urlArea">URLs </label>
      <textarea id="urlArea" name="urlArea" class="block border border-gray-300" :disabled="addToExisting"></textarea>
    </div>

    <div class="m-0.5">
      <input type="text" id="saveAs" name="saveAs" :disabled="addToExisting">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      addToExisting: false,
      isWikiFarm: false,

      farms: [
        { id: 1, name: "fandom.com" },
        { id: 2, name: "gamepedia.com" }
      ],
      object: {
        name: "None",
      },
    };
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.object = payload;
    }
  }
};
</script>
