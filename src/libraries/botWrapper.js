import MediaWikiJS from "@sidemen19/mediawiki.js";
import keytar from "keytar";

// Should hook into node project varaible REFERENCE TWICE
const projectName = "MediaWikiAGE";
/* WIP
class Bot extends MediaWikiJS {
  constructor(user, site, farm) {
    super({
      server: site.server,
      path: site.scriptpath,
      botUsername: farm.username || user.username,
      botPassword: await keytar.getPassword(projectName, userKey)
    });
    this.
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }
}
*/