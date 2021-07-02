const pjson = require('../../package.json')

const appName = pjson.name + '-node'
const appVersion = pjson.version

module.exports = {
  appName,
  appVersion
}
