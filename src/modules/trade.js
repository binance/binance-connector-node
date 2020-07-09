
const Trade = superclass => class extends superclass {
  test () {
    return this.request.get('/api/v3/ping')
  }
}

module.exports = Trade
