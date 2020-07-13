
const { buildQueryString } = require('../../src/helpers/utils')

const startTime = '1111111'
const endTime = '22222222'
const fromId = '33333'
const limit = 10

const queryString = parameters => buildQueryString(parameters)

module.exports = {
  queryString,
  startTime,
  endTime,
  fromId,
  limit
}
