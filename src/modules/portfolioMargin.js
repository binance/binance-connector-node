/**
 * API Portfolio Margin endpoints
 * @module PortfolioMargin
 * @param {*} superclass
 */
const PortfolioMargin = superclass => class extends superclass {
  /**
   * Get Portfolio Margin Account Info (USER_DATA)<br>
   *
   * GET /sapi/v1/portfolio/account<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#get-portfolio-margin-account-info-user_data}
   *
   * @param {object} [options]
   * @param {number} [options.recvWindow]
   *
   */
  portfolioMarginAccount (options = {}) {
    return this.signRequest(
      'GET',
      '/sapi/v1/portfolio/account',
      options
    )
  }
}
module.exports = PortfolioMargin
