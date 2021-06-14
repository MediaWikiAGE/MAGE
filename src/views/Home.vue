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
    commitChoices() {
      let farmName = null;
      let wikiName = null;
      let userName = null;
      let botPassName = null;

      if (this.chosenFarm !== -1) {
        farmName = this.chosenFarmSource[this.chosenFarm].name;
      }
      if (this.chosenWiki !== -1) {
        wikiName = this.chosenWikiSource[this.chosenWiki].name;
      }
      if (this.chosenAccount !== -1) {
        [userName, botPassName] = this.chosenAccountSource[this.chosenAccount].name.split("@");
      }

      this.$store.commit("saveProcessedWiki", [farmName, wikiName, userName, botPassName]);
    },
    restoreFromState() {
      const [farmName, wikiName, userName, botPassName] = this.$store.getters.getProcessedWiki;
      const fullAccountName = `${userName}@${botPassName}`;

      this.setFarm(this.chosenFarmSource.findIndex( farm => farm.name === farmName ));
      this.setWiki(this.chosenWikiSource.findIndex( wiki => wiki.name === wikiName ));
      if (this.chosenWiki !== -1) {
        this.setAccount(this.chosenAccountSource.findIndex( account => account.name === fullAccountName ));
      }
      this.commitChoices();
    },
    setFarm(farmId) {
      this.chosenFarm = farmId;
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
    setWiki(wikiId) {
      this.chosenWiki = wikiId;

      if (this.chosenFarm === -1) {
        const wikiData = this.accountData.standalone[this.chosenWiki];
        this.chosenAccount = -1;
        this.chosenAccountSource = wikiData.accounts;
      }
    },
    setAccount(accountId) {
      this.chosenAccount = accountId;
    },
    onFarmChange(event) {
      this.setFarm(parseInt(event.target.value, 10));
      this.commitChoices();
    },
    onWikiChange(event) {
      this.setWiki(parseInt(event.target.value, 10));
      this.commitChoices();
    },
    onAccountChange(event) {
      this.setAccount(parseInt(event.target.value, 10));
      this.commitChoices();
    }
  },
  created: async function() {
    const accountData = await window.api.remote("getAccountData");
    this.accountData = accountData;
    this.chosenFarmSource = accountData.farms;
    this.chosenWikiSource = accountData.standalone;
    this.restoreFromState();
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
