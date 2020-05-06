const packageJson = require('../../package.json')

const appName = packageJson.name + '-node'
const appVersion = packageJson.version

module.exports = {
  appName,
  appVersion
}
