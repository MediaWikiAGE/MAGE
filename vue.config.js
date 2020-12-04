module.exports = {
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ["keytar", "@sidemen19/mediawiki.js"]
    }
  }
};
