<template>
  <div id="loginentry" class="2xl:grid 2xl:grid-cols-loginview-outer 2xl:grid-rows-1 h-full dark:bg-gray-900">
    <div class="grid grid-cols-2 lg:grid-cols-3 grid-rows-loginview gap-x-1 gap-y-4 h-full 2xl:col-start-2">
      <div class="text-center row-start-1 col-start-1 col-end-3 lg:col-end-4">
        <h2 class="text-3xl">Set up new credentials</h2>
      </div>

      <div class="hidden select-none lg:flex lg:justify-center lg:items-center lg:col-start-3 lg:row-start-2 lg:row-end-3"><svg-icon icon="magelogo" noinvert="true" /></div>

      <div class="help-wrapper">
        <div v-if="helpPage === 'login-screen'">
          <div class="header">
            <h3>Help: Login Screen</h3>
          </div>
          <p>On the login screen, you can set up new wikis to edit, and new
            credentials to use.</p>
          <p><em>Note:</em> MAGE is currently at a very early stage of
            development and lacks more detailed credential controls.</p>
          <p>You can click the question mark icon next to each login field to
            show the corresponding help page here. Note that several form fields
            may refer to the same page.</p>
        </div>
        <div v-else-if="helpPage === 'credentials'">
          <div class="header">
            <h3>Help: Credentials</h3>
            <button class="svg-icon-button" title="Show the main help page" @click="this.helpPage = 'login-screen';">
              <svg-icon icon="home" width="25" height="25" />
            </button>
          </div>
          <p>To use MAGE, you have to create an account on the chosen wiki.
            Even if the wiki itself permits logged-out editing, MAGE does not.</p>
          <p>In addition to having an account, you need to create a "bot password",
            a security token for API clients, to use MAGE with that account.</p>
          <p>To create a bot password, go to <code>Special:BotPasswords</code> on
            the wiki of your choice and follow the instructions there.</p>
          <p>If you already have a bot password for another client, you should still
            create a new one for MAGE.</p>
          <p>In the form MAGE uses:</p>
          <ul class="list-disc">
            <li><strong>Username</strong> is name of the account
              you're creating a bot password for;</li>
            <li><strong>Bot password name</strong> is the "Bot name" you enter when
              creating a new bot password on <code>Special:BotPasswords</code>;</li>
            <li><strong>Bot password</strong> is the unique token MediaWiki generates for you
              when you complete setting up a new bot password on <code>Special:BotPasswords</code>.</li>
          </ul>
        </div>
        <div v-else-if="helpPage === 'associating-credentials'">
          <div class="header">
            <h3>Help: Associating Credentials</h3>
            <button class="svg-icon-button" title="Show the main help page" @click="this.helpPage = 'login-screen';">
              <svg-icon icon="home" width="25" height="25" />
            </button>
          </div>
          <p>Associating credentials is how MAGE knows what they're good for.
            You can either point MAGE to a new wiki farm or a standalone wiki, or
            instruct MAGE to associate the credentials you entered with a wiki or
            farm it already knows.</p>
          <p>For the purpose of credential management in MAGE, a wiki farm is a
            group of wikis such that if you create a bot password on any of them,
            you can use it for all of them.</p>
          <p>A standalone wiki is a wiki that doesn't share its bot passwords
            with any other wiki. You could consider it to be a special case of a
            wiki farm that only has one wiki.</p>
        </div>
        <div v-else-if="helpPage === 'setting-up-wikis'">
          <div class="header">
            <h3>Help: Setting Up a New Wiki/Farm</h3>
            <button class="svg-icon-button" title="Show the main help page" @click="this.helpPage = 'login-screen';">
              <svg-icon icon="home" width="25" height="25" />
            </button>
          </div>
          <p>If MAGE doesn't yet know the wiki or farm you want to add credentials
            for, you have to add some basic settings first.</p>
          <p>The URL (or URLs, if you're setting up a wiki farm) should allow MAGE
            to find the <code>api.php</code> endpoint it uses. You can provide
            the URL to the wiki's main page, and MAGE will try to find
            <code>api.php</code> for you.</p>
          <p>You also need to choose a name MAGE will use to identify the wiki or
            farm. (If you're creating a farm with multiple wikis, they'll be
            assigned automatically-generated names based on their URLs.)</p>
        </div>
        <div v-else><!-- this should never happen -->
          <div class="header">
            <h3>Help: Reporting Bugs</h3>
            <button class="svg-icon-button" title="Show the main help page" @click="this.helpPage = 'login-screen';">
              <svg-icon icon="home" width="25" height="25" />
            </button>
          </div>
          <p><code>{{this.helpPage}}</code> is not a recognized help page. If you
            know a way to consistently get to this specific not-a-page
            in the course of regular usage (without playing with MAGE internals),
            please consider seeing if this is a known bug, and if not, reporting
            it yourself. https://github.com/MediaWikiAGE/MAGE</p>
        </div>
      </div>

      <div class="form-wrapper">
        <div class="form-input-wrapper row-start-2">
          <div class="flex justify-between items-center">
            <label for="accountName">Username</label>
            <button class="svg-icon-button" title="Show help for this field" @click="this.helpPage = 'credentials';">
              <svg-icon icon="question-mark-circle" width="25" height="25" />
            </button>
          </div>
          <input type="text" id="accountName" name="accountName" v-model.trim="accountName">
        </div>

        <div class="form-input-wrapper row-start-3">
          <div class="flex justify-between items-center">
            <label for="botPasswordName">Bot password name</label>
            <button class="svg-icon-button" title="Show help for this field" @click="this.helpPage = 'credentials';">
              <svg-icon icon="question-mark-circle" width="25" height="25" />
            </button>
          </div>
          <input type="text" id="botPasswordName" name="botPasswordName" v-model.trim="botPasswordName">
        </div>

        <div class="form-input-wrapper row-start-4">
          <div class="flex justify-between items-center">
            <label for="botPassword">Bot password</label>
            <button class="svg-icon-button" title="Show help for this field" @click="this.helpPage = 'credentials';">
              <svg-icon icon="question-mark-circle" width="25" height="25" />
            </button>
          </div>
          <input type="text" id="botPassword" name="botPassword" v-model.trim="botPassword">
        </div>

        <div class="form-input-wrapper row-start-5">
          <div class="flex justify-between items-center">
            <label for="addTo">Attach credentials to:</label>
            <button class="svg-icon-button" title="Show help for this field" @click="this.helpPage = 'associating-credentials';">
              <svg-icon icon="question-mark-circle" width="25" height="25" />
            </button>
          </div>
          <select name="addTo" id="addTo" v-model.number="addTo">
            <option value="-2" selected class="special-option">[+ Set up a new wiki farm]</option>
            <option value="-1" class="special-option">[+ Set up a new standalone wiki]</option>
            <option v-for="knownFarm in farms" :key="knownFarm.id" :value="knownFarm.id">{{ knownFarm.name }}</option>
          </select>
        </div>

        <div class="form-input-wrapper row-start-6">
          <div v-if="creatingStandaloneWiki">
            <div class="flex justify-between items-center">
              <label for="urlField">URL</label>
              <button class="svg-icon-button" title="Show help for this field" @click="this.helpPage = 'setting-up-wikis';">
                <svg-icon icon="question-mark-circle" width="25" height="25" />
              </button>
            </div>
            <input type="text" id="urlField" name="urlField" :value="wikiUrls[0]" @input="onUrlFieldInput" :disabled="addingToExistingWikiOrFarm">
          </div>
          <div v-else>
            <div class="flex justify-between items-center">
              <label for="urlArea">URLs</label>
              <button class="svg-icon-button" title="Show help for this field" @click="this.helpPage = 'setting-up-wikis';">
                <svg-icon icon="question-mark-circle" width="25" height="25" />
              </button>
            </div>
            <textarea id="urlArea" name="urlArea" :value="wikiUrls.join('\n')" @input="onUrlAreaInput" rows="4" :disabled="addingToExistingWikiOrFarm"></textarea>
          </div>
        </div>

        <div class="form-input-wrapper row-start-7">
          <div class="flex justify-between items-center">
            <label v-if="creatingStandaloneWiki" for="saveAs">Save wiki as:</label>
            <label v-else for="saveAs">Save farm as:</label>
            <button class="svg-icon-button" title="Show help for this field" @click="this.helpPage = 'setting-up-wikis';">
              <svg-icon icon="question-mark-circle" width="25" height="25" />
            </button>
          </div>
          <input type="text" id="saveAs" name="saveAs" v-model.trim="saveAs" :disabled="addingToExistingWikiOrFarm">
        </div>
      </div>

      <div class="form-input-wrapper row-start-3 col-start-1 col-end-3 lg:col-end-4 place-self-center">
        <input type="button" id="saveLogin" name="saveLogin" value="Save login" @click="saveLogin" :disabled="blockSaving" class="px-1.5 py-0.5">
      </div>

      <div class="row-start-4 col-start-1 col-end-3 lg:col-end-4">
        <span v-if="validationErrors.length > 0">Errors:</span>
        <ul class="bg-gray-100 dark:bg-gray-800 text-red-900 dark:text-red-400 text-sm">
          <li v-for="(error, index) in validationErrors" :key="index">{{ error }}</li>
        </ul>
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
      addTo: -2,
      helpPage: "login-screen",
      wikiUrls: [],
      saveAs: null,
      blockSaving: false,

      validationErrors: [],

      farms: [],
      object: {
        name: "None",
      },
    };
  },
  computed: {
    creatingWikiFarm() {
      return this.addTo === -2;
    },
    creatingStandaloneWiki() {
      return this.addTo === -1;
    },
    addingToExistingWikiOrFarm() {
      return this.addTo >= 0;
    }
  },
  methods: {
    commitChoices() {
      const loginData = {
        accountName: this.accountName,
        botPasswordName: this.botPasswordName,
        botPassword: this.botPassword,
        addTo: this.addTo,
        helpPage: this.helpPage,
        wikiUrls: this.wikiUrls,
        saveAs: this.saveAs,
        validationErrors: this.validationErrors
      };

      this.$store.commit("saveLoginFormData", loginData);
    },
    restoreData() {
      const loginData = this.$store.getters.getLoginFormData;
      if (loginData === null) {
        return;
      }

      for (const key of Object.keys(loginData)) {
        this[key] = loginData[key];
      }
    },
    onUrlFieldInput(event) {
      this.wikiUrls[0] = event.target.value.trim();
    },
    onUrlAreaInput(event) {
      this.wikiUrls = event.target.value.split("\n");
    },
    /// Returns `false` if `string` is a string with at least one significant character, otherwise `true`.
    isEmpty(string) {
      return (string === undefined) || (string === null) || (string.trim().length === 0);
    },
    /// Returns true/false depending on whether `string` is a valid URL.
    isValidUrl(string) {
      try {
        const url = new URL(string);
        return true;
      } catch (error) {
        return false;
      }
    },
    /// Returns an array of strings containing error messages for validating form inputs. If empty, the form is filled correctly.
    validateForm() {
      const validationErrors = [];
      if (this.isEmpty(this.accountName)) {
        validationErrors.push("The account name cannot be empty");
      } else if (/[#<>[\]|{}/@:]/.test(this.accountName)) {
        // Disallowed characters: # < > [ ] | { } / @ :
        // List taken from the Wikipedia page on technical restrictions for usernames.
        validationErrors.push("Account names cannot contain any of the following characters: # < > [ ] | { } / @ :");
      }
      if (this.isEmpty(this.botPasswordName)) {
        validationErrors.push("The bot password name cannot be empty");
      }
      if (this.isEmpty(this.botPassword)) {
        validationErrors.push("The bot password cannot be empty");
      }
      if (!this.addingToExistingWikiOrFarm) {
        if (this.creatingStandaloneWiki) {
          if (this.isEmpty(this.wikiUrls[0])) {
            validationErrors.push("When creating a new standalone wiki, the wiki URL cannot be empty");
          } else if (!this.isValidUrl(this.wikiUrls[0])) {
            validationErrors.push("When creating a new standalone wiki, the wiki URL must be valid");
          }

          if (this.farms.some(authSystem => authSystem.name === this.saveAs && !authSystem.isFarm)) {
            validationErrors.push(`A standalone wiki named "${this.saveAs}" is already defined.`);
          }
        } else if (this.creatingWikiFarm) {
          let noValidUrls = true;
          for (const url of this.wikiUrls) {
            if (this.isEmpty(url)) {
              continue;
            }

            if (!this.isValidUrl(url)) {
              validationErrors.push(`Invalid URL: ${url}`);
            } else {
              noValidUrls = false;
            }
          }
          if (noValidUrls) {
            validationErrors.push("When creating a new wiki farm, at least one URL must be non-empty and valid.");
          }

          if (this.farms.some(authSystem => authSystem.name === this.saveAs && authSystem.isFarm)) {
            validationErrors.push(`A wiki farm named "${this.saveAs}" is already defined.`);
          }
        }

        if (this.isEmpty(this.saveAs)) {
          validationErrors.push("When creating a new wiki or farm, the name for the wiki or farm cannot be empty");
        }
      }

      return validationErrors;
    },

    /// Is called when the form was saved successfully.
    async onSaveSuccess() {
      this.accountName = null;
      this.botPasswordName = null;
      this.botPassword = null;
      this.addTo = -2;
      this.wikiUrls = [];
      this.saveAs = null;
      this.farms = await window.api.remote("getAuthSystemList");

      alert("Login data saved successfully!");
      this.blockSaving = false;
    },

    /// Separate function for (asynchronously) updating settings when saving a login.
    async updateSettings(authSystemData, botPasswordData) {
        if (this.addingToExistingWikiOrFarm) {
          await window.api.remote("addBotPasswordForAuthSystem", authSystemData, botPasswordData);
        } else if (this.creatingWikiFarm) {
          // this.wikiUrls gives an "An object could not be cloned." error if provided directly?
          await window.api.remote("createWikiFarmWithUrls", this.saveAs, [...this.wikiUrls]);
          await window.api.remote("addBotPasswordForAuthSystem", authSystemData, botPasswordData);
        } else {
          await window.api.remote("createStandaloneWikiWithUrl", this.saveAs, this.wikiUrls[0]);
          await window.api.remote("addBotPasswordForAuthSystem", authSystemData, botPasswordData);
        }
    },

    /// Validates the form and attempts to save configuration data.
    saveLogin() {
      this.validationErrors = this.validateForm();
      if (this.validationErrors.length === 0) {
        this.blockSaving = true;

        const botPasswordData = {
          accountName: this.accountName,
          botPasswordName: this.botPasswordName,
          botPassword: this.botPassword
        };

        // The auth systems list has structures with the same fields as needed by auth system remotes.
        const authSystemData = this.addingToExistingWikiOrFarm
          ? { ... this.farms[this.addTo - 1] }
          : {
            name: this.saveAs,
            isFarm: this.isWikiFarm
          };

        this.updateSettings(authSystemData, botPasswordData).then(this.onSaveSuccess);
      }
    }
  },
  created: async function() {
    this.farms = await window.api.remote("getAuthSystemList");
    this.restoreData();
  },
  beforeUnmount: function() {
    this.commitChoices();
  },
  components: { SvgIcon },
};
</script>
<style>
.svg-icon-button {
  @apply flex-shrink-0;
  @apply hover:bg-gray-300 dark:hover:bg-gray-600;
  @apply focus:bg-gray-300 dark:focus:bg-gray-600 focus:shadow-inner-focus;
}

.help-text {
  @apply col-start-1 text-right text-sm;
}

.form-wrapper {
  @apply col-start-1;
  @apply overflow-y-auto;
  @apply px-1;
}
.form-input-wrapper {
  @apply col-start-1;
}
.form-wrapper .form-input-wrapper + .form-input-wrapper {
  @apply mt-4;
}
.form-input-wrapper label {
  @apply select-none;
}
.form-input-wrapper input,
.form-input-wrapper select,
.form-input-wrapper textarea {
  @apply dark:bg-gray-700;
  @apply focus:ring-1 focus:ring-yellow-600 dark:focus:ring-yellow-300;
  @apply mt-px;
}
.form-input-wrapper input[type="text"],
.form-input-wrapper textarea,
.form-input-wrapper select {
  @apply block w-full;
}
.form-input-wrapper input:disabled,
.form-input-wrapper textarea:disabled {
  @apply dark:bg-gray-800;
}
.form-input-wrapper textarea {
  @apply border border-gray-500 resize-none text-sm font-mono;
}

.special-option {
  @apply text-green-400;
}

.help-wrapper {
  @apply row-start-2 col-start-2;
  @apply border-l border-gray-800 dark:border-gray-400 pl-1;
  @apply lg:border-r pr-1;
  @apply overflow-y-auto;
}
.help-wrapper .header {
  @apply flex justify-evenly items-center;
}
.help-wrapper .header h3 {
  @apply text-xl;
  @apply flex-shrink min-w-0;
}
.help-wrapper > div p {
  @apply mt-2.5;
}
</style>
