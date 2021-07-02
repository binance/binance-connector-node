var pjson = require('../../package.json')

const appName = pjson.name + '-nodejs'
const appVersion = pjson.version

module.exports = {
  appName,
  appVersion
}
