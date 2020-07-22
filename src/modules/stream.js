// const { validateParameter } = require('../helpers/validation')

const Stream = superclass => class extends superclass {
  /*
    * Create a ListenKey (USER_STREAM)
    *
    * POST /api/v3/userDataStream
    *
    */
  createListenKey () {
    return this.publicRequest(
      'POST',
      '/api/v3/userDataStream'
    )
  }

  /*
    * Ping/Keep-alive a ListenKey (USER_STREAM)
    *
    * PUT /api/v3/userDataStream
    *
    * @param {string} listenKey
    */
  renewListenKey (listenKey) {
    return this.publicRequest(
      'PUT',
      '/api/v3/userDataStream',
      { listenKey }
    )
  }

  /*
    * Close a ListenKey (USER_STREAM)
    *
    * DELETE /api/v3/userDataStream
    *
    * @param {string} listenKey
    */
  closeListenKey (listenKey) {
    return this.publicRequest(
      'DELETE',
      '/api/v3/userDataStream',
      { listenKey }
    )
  }

  /*
    * Create a Margin ListenKey (USER_STREAM)
    *
    * POST /sapi/v1/userDataStream
    *
    */
  createMarginListenKey () {
    return this.publicRequest(
      'POST',
      '/sapi/v1/userDataStream'
    )
  }

  /*
    * Ping/Keep-alive a Margin ListenKey (USER_STREAM)
    *
    * PUT /sapi/v1/userDataStream
    *
    * @param {string} listenKey
    */
  renewMarginListenKey (listenKey) {
    return this.publicRequest(
      'PUT',
      '/sapi/v1/userDataStream',
      { listenKey }
    )
  }

  /*
    * Close a Margin ListenKey (USER_STREAM)
    *
    * DELETE /sapi/v1/userDataStream
    *
    * @param {string} listenKey
    */
  closeMarginListenKey (listenKey) {
    return this.publicRequest(
      'DELETE',
      '/sapi/v1/userDataStream',
      { listenKey }
    )
  }
}

module.exports = Stream
