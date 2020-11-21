module.exports = {
    packagerConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-zip'
        }
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'MediaWikiAGE',
                    name: 'MAGE'
                },
                prerelease: true
            }
        }
    ]
};