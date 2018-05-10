const path = require('path');

module.exports = {
    openPage: 'http://localhost:9999',
    proxyConfigPath: path.resolve(__dirname, './proxy.js'),
    mock: {
        root: path.resolve(__dirname, './mock'),
        configFile: path.resolve(__dirname, './mock/config.json')
    }
}
