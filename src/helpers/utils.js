
const cleanEmptyObject = obj => {
  Object.keys(obj).forEach((key) => (obj[key] == null || obj[key] === '') && delete obj[key])
  return obj
}

module.exports = {
  cleanEmptyObject
}
