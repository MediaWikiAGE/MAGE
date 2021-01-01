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

    <div class="m-0.5">
      <input type="checkbox" id="addToExisting" name="addToExisting" :value=false @change="addToExisting = !addToExisting">
      <label for="addToExisting"> Add to existing wiki/farm: </label>
      <select :disabled="!addToExisting" name="addTo" id="addTo">
        <option value="0" disabled selected>None</option>
        <option v-for="knownFarm in farms" :key="knownFarm.id" :value="knownFarm.id">{{ knownFarm.name }}</option>
      </select>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      addToExisting: false,

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
