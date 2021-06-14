<template>
  <div class="dark:bg-gray-900 h-full">
    <div class="w-full text-center">
      <h2 class="text-3xl">Welcome to MAGE</h2>
    </div>

    <div class="mt-3 ml-2">
      <h3 class="text-xl">Choose a wiki to operate on:</h3>

      <div class="wiki-choice-container">
        <div class="control-container">
          <label for="chosenFarm">Wiki farm name</label>
          <select id="chosenFarm" name="chosenFarm" :value="chosenFarm" @change="onFarmChange">
            <option value="-1" selected>None (standalone wiki)</option>
            <option v-for="(knownFarm, index) in chosenFarmSource" :key="knownFarm.name" :value="index">{{ knownFarm.name }}</option>
          </select>
        </div>

        <div class="control-container">
          <label for="chosenWiki">Wiki name</label>
          <select id="chosenWiki" name="chosenWiki" :value="chosenWiki" @change="onWikiChange">
            <option value="-1" disabled selected>None</option>
            <option v-for="(knownWiki, index) in chosenWikiSource" :key="knownWiki.name" :value="index">{{ knownWiki.name }}</option>
          </select>
        </div>

        <div class="control-container">
          <label for="chosenAccount">User account</label>
          <select id="chosenAccount" name="chosenAccount" :value="chosenAccount" @change="onAccountChange">
            <option value="-1" selected>None (identify using your IP)</option>
            <option v-for="(knownAccount, index) in chosenAccountSource" :key="knownAccount.name" :value="index">{{ knownAccount.name }}</option>
          </select>
        </div>
      </div>

      <p class="mt-3 text-sm italic">MAGE will log in automatically as needed to run tasks</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      chosenFarm: -1,
      chosenWiki: -1,
      chosenAccount: -1,
      accountData: {},
      chosenFarmSource: [],
      chosenWikiSource: [],
      chosenAccountSource: []
    };
  },
  methods: {
    /*
    login(event) {
      const userKey = event.target.dataset.id;
      window.api.remote("loginUser", userKey).then(data => {
        this.$store.state.current_user = { ...data.cacheUser, ...data.cacheSite };
      });
    },
    logout(event) {
      window.api.remote("logoutUser").then(data => {
        this.$store.state.current_user = { ...data.cacheUser, ...data.cacheSite };
      });
    },
    disconnect(event) {
      const userKey = event.target.dataset.id;
      window.api.remote("disconnectServer", userKey).then(data => {
        this.$store.state.current_user = { ...data.cacheUser, ...data.cacheSite };
      });
    }
    */
    onFarmChange(event) {
      this.chosenFarm = parseInt(event.target.value, 10);
      this.chosenWiki = -1;
      this.chosenAccount = -1;

      if (this.chosenFarm === -1) {
        this.chosenWikiSource = this.accountData.standalone;
        this.chosenAccountSource = [];
      } else {
        const farmData = this.accountData.farms[this.chosenFarm];
        this.chosenWikiSource = farmData.wikis;
        this.chosenAccountSource = farmData.accounts;
      }
    },
    onWikiChange(event) {
      this.chosenWiki = parseInt(event.target.value, 10);

      if (this.chosenFarm === -1) {
        const wikiData = this.accountData.standalone[this.chosenWiki];
        this.chosenAccount = -1;
        this.chosenAccountSource = wikiData.accounts;
      }
    },
    onAccountChange(event) {
      this.chosenAccount = parseInt(event.target.value, 10);
    }
  },
  created: async function() {
    const accountData = await window.api.remote("getAccountData");
    this.accountData = accountData;
    this.chosenFarmSource = accountData.farms;
    this.chosenWikiSource = accountData.standalone;
  },
};
</script>
<style>
.wiki-choice-container {
  @apply max-w-xs;
}
.wiki-choice-container .control-container {
  @apply select-none flex flex-col w-full;
}
.wiki-choice-container .control-container:not(:first-child) {
  @apply mt-4;
}
.control-container label {
  @apply pr-1;
}
.control-container select {
  @apply flex-grow dark:bg-gray-700;
  @apply focus:ring-1 focus:ring-yellow-600 dark:focus:ring-yellow-300;
}
</style>
