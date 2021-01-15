<template>
  <div id="loginentry" class="xl:grid xl:grid-cols-loginview-outer h-full">
    <div class="grid grid-cols-loginview-3 md:grid-cols-loginview-4 gap-1 xl:col-start-2">
      <div class="hidden select-none md:flex md:justify-center md:items-center md:col-start-4 md:row-start-1 md:row-end-9"><svg-icon icon="magelogo" /></div>
      <div class="flex justify-center row-start-1 row-end-9 col-start-2">
        <div class="w-px border-l border-gray-500"></div>
      </div>

      <div class="row-start-1 col-start-1 text-right text-sm">
        The name of the account you're setting the password for
      </div>
      <div class="row-start-1 col-start-3">
        <label for="accountName">Username</label>
        <input type="text" id="accountName" name="accountName" v-model.trim="accountName" class="block w-full">
      </div>

      <div class="row-start-2 col-start-1 text-right text-sm">
        The name of your bot password from Special:BotPasswords
      </div>
      <div class="row-start-2 col-start-3">
        <label for="botPasswordName">Bot password name</label>
        <input type="text" id="botPasswordName" name="botPasswordName" v-model.trim="botPasswordName" class="block w-full">
      </div>

      <div class="row-start-3 col-start-1 text-right text-sm">
        The generated password string of characters from Special:BotPasswords
      </div>
      <div class="row-start-3 col-start-3">
        <label for="botPassword">Bot password</label>
        <input type="text" id="botPassword" name="botPassword" v-model.trim="botPassword" class="block w-full">
      </div>

      <div class="row-start-4 col-start-1 text-right text-sm">
        Do you want to add the credentials for a wiki or wiki farm already known to MAGE?
      </div>
      <div class="row-start-4 col-start-3">
        <div>
          <label for="addToExisting">Add to existing?</label>
          <input type="checkbox" id="addToExisting" name="addToExisting" :value=false v-model="addToExisting" class="ml-1">
        </div>
        <select :disabled="!addToExisting" name="addTo" id="addTo" v-model.number="addTo">
          <option value="0" disabled selected>None</option>
          <option v-for="knownFarm in farms" :key="knownFarm.id" :value="knownFarm.id">{{ knownFarm.name }}</option>
        </select>
      </div>

      <div class="row-start-5 col-start-1 text-right text-sm">
        Do you use the same credentials to log into several different wikis?
      </div>
      <div class="row-start-5 col-start-3">
        <label for="isWikiFarm">Wiki farm?</label>
        <input type="checkbox" id="isWikiFarm" name="isWikiFarm" v-model="isWikiFarm" :disabled="addToExisting" class="ml-1">
      </div>

      <div class="row-start-6 col-start-1 text-right text-sm">
        <div v-if="!isWikiFarm">The front page of your wiki. MAGE will figure out the script path automatically.</div>
        <div v-else>The front pages of your wikis, one per line. MAGE will figure out the script path automatically.</div>
      </div>
      <div class="row-start-6 col-start-3">
        <div v-if="!isWikiFarm">
          <label for="urlField">URL</label>
          <input type="text" id="urlField" name="urlField" @input="onUrlFieldInput" :disabled="addToExisting" class="block w-full">
        </div>
        <div v-else>
          <label for="urlArea">URLs</label>
          <textarea id="urlArea" name="urlArea" @input="onUrlAreaInput" rows="4" class="block border border-gray-500 w-full resize-none text-sm font-mono" :disabled="addToExisting"></textarea>
        </div>
      </div>

      <div class="row-start-7 col-start-1 text-right text-sm">
        <div v-if="!isWikiFarm">Save this wiki as:</div>
        <div v-else>Save this farm as:</div>
      </div>
      <div class="row-start-7 col-start-3">
        <input type="text" id="saveAs" name="saveAs" v-model.trim="saveAs" :disabled="addToExisting" class="w-full">
      </div>

      <div class="row-start-8 col-start-3">
        <input type="button" id="saveLogin" name="saveLogin" value="Save login" @click="saveLogin" class="p-0.5">
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";

export default {
  data() {
    return {
      accountName: null,
      botPasswordName: null,
      botPassword: null,
      addToExisting: false,
      addTo: 0,
      isWikiFarm: false,
      saveAs: null,

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
    },
    onUrlFieldInput(event) {
      // stub
    },
    onUrlAreaInput(event) {
      // stub
    },
    saveLogin() {
      // stub
    }
  },
  components: { SvgIcon },
};
</script>
