# Changelog


## v2.0.0 - 2023-01-31

### Updated
- Pump dependencies version

## v2.0.0-rc.4 - 2022-11-22
### Added
- Support RSA key signature.

## v2.0.0-rc.3 - 2022-10-12
### Added
- New endpoint
  - `GET /api/v3/uiKlines`

### Changed
- Add new optional parameter `type` to `GET /api/v3/ticker` and `GET /api/v3/ticker/24hr`

## v2.0.0-rc.2 - 2022-10-04
### Changed
- Delete endpoints for Futures Cross Collateral
  - `POST /sapi/v1/futures/loan/borrow`
  - `POST /sapi/v1/futures/loan/repay`
  - `GET /sapi/v2/futures/loan/configs`
  - `GET /sapi/v2/futures/loan/calcAdjustLevel`
  - `GET /sapi/v1/futures/loan/calcMaxAdjustAmount`
  - `GET /sapi/v2/futures/loan/calcMaxAdjustAmount`
  - `POST /sapi/v2/futures/loan/adjustCollateral`
  - `GET /sapi/v1/futures/loan/collateralRepayLimit`
  - `GET /sapi/v1/futures/loan/collateralRepay`
  - `POST /sapi/v1/futures/loan/collateralRepay`
  - `GET /sapi/v1/futures/loan/collateralRepayResult`
- Fixing `asset` in the endpoints that should not be mandatory #107
  - `GET /sapi/v1/lending/daily/token/position`
  - `GET /sapi/v1/lending/project/position/list`

## v2.0.0-rc.1 - 2022-08-29

- Support timeout
- Support proxy
- Support httpsAgent
- Enable strict mode
- Improve Websocket
  - Add `pingServer` method

## v.1.13.0 - 2022-08-12
### Added
- New endpoint for Portfolio Margin:
  - `GET /sapi/v1/portfolio/pmLoan` to query Portfolio Margin Bankruptcy Loan Record.
  - `POST /sapi/v1/portfolio/repay` to repay Portfolio Margin Bankruptcy Loan.
  - `GET /sapi/v1/portfolio/collateralRate` to get Portfolio Margin Collateral Rate.

### Changed
- Changed endpoints for Trade:
  - `POST /api/v3/order/test` New optional fields `strategyId` and `strategyType`.
  - `POST /api/v3/order` New optional fields `strategyId` and `strategyType`.
  - `POST /api/v3/order/cancelReplace` New optional fields `strategyId` and `strategyType`.
  - `POST /api/v3/order/oco` New optional fields `limitStrategyId`, `limitStrategyType`, `stopStrategyId` and `stopStrategyType`.

## v.1.12.0 - 2022-07-19
### Added
- New endpoint for Margin:
  - `POST /sapi/v3/asset/getUserAsset` to get user assets.

- New endpoint for Wallet:
  - `GET /sapi/v1/margin/dribblet` to query the historical information of user's margin account small-value asset conversion BNB.

## v.1.11.0 - 2022-07-04
### Added
- `<symbol>@ticker_<window-size>` Individual symbol rolling window ticker streams.
- `!ticker_<window-size>@arr` All market rolling window ticker streams
- `GET /api/v3/ticker` for rolling window price change statistics based on windowSize provided.
- `POST /api/v3/order/cancelReplace` to cancel an existing order and place a new order on the same symbol.

### Changed
- `GET /sapi/v1/fiat/orders`: Weight changes from IP(1) to UID(90000)
- `GET /sapi/v1/pay/transactions`: Param names changed: startTimestamp -> startTime; endTimestamp -> endTime.

### Fixed
- Updated `jest` from `^26.0.1` to `^28.1.2` to resolve `jsdom` security issue `GHSA-f4c9-cqv8-9v98`.

## v.1.10.0 - 2022-05-23
### Added
- `GET /sapi/v1/giftcard/cryptography/rsa-public-key` to fetch RSA public key.
- `GET /sapi/v1/staking/productList` to get Staking product list
- `POST /sapi/v1/staking/purchase` to stake product
- `POST /sapi/v1/staking/redeem` to redeem product
- `GET /sapi/v1/staking/position` to get Staking product holding position
- `GET /sapi/v1/staking/stakingRecord` to inquiry Staking history records
- `POST /sapi/v1/staking/setAutoStaking` to set Auto Staking function
- `GET /sapi/v1/staking/personalLeftQuota` to inquiry Staking left quota

### Changed
- `POST /sapi/v1/giftcard/redeemCode`: new optional parameter externalUid. Each external unique ID represents a unique user on the partner platform. The function helps you to identify the redemption behavior of different users.
- `GET /api/v3/ticker/24hr`, `GET /api/v3/ticker/price` and `GET /api/v3/ticker/bookTicker` new optional parameter symbols.

## v.1.9.2 - 2022-05-05
### Added
- `GET /sapi/v1/managed-subaccount/accountSnapshot` to support investor master account query asset snapshot of managed sub-account.
- `GET /sapi/v1/margin/rateLimit/order` to display the user's current margin order count usage for all intervals.
- `GET /sapi/v1/portfolio/account` to support query portfolio margin account info.

### Changed
- `POST /sapi/v1/bswap/liquidityAdd` - New optional parameter `type`
- `POST /sapi/v1/sub-account/universalTransfer` - New transfer types `MARGIN`,`ISOLATED_MARGIN` and parameter `symbol`
- `GET /api/v3/depth` - The `limit` value can be outside of the previous values (i.e. 5, 10, 20, 50, 100, 500, 1000, 5000). The limit still cannot exceed 5000.
- `POST /api/v3/order`, `POST /api/v3/order/test` and `/api/v3/order/oco` - New optional parameter `trailingDelta`

## v1.8.0 - 2022-02-24
### Added
- `POST /sapi/v1/giftcard/createCode` to create a code for Binance Gift Card
- `POST /sapi/v1/giftcard/redeemCode` to redeem a code for Binance Gift Card
- `GET /sapi/v1/giftcard/verify` to verify a code for Binance Gift Card
- `POST /sapi/v1/asset/dust-btc` to get assets that can be converted into BNB

### Fixed
- npm audit upgrades

## v1.7.0 - 2022-01-13
### Added
- `GET /sapi/v1/mining/payment/uid` to get Mining account earning
- `GET /sapi/v1/bswap/unclaimedRewards` to get unclaimed rewards record
- `POST /sapi/v1/bswap/claimRewards` to claim swap rewards or liquidity rewards
- `GET /sapi/v1/bswap/claimedHistory` to get history of claimed rewards
- `POST /sapi/v1/sub-account/universalTransfer` to transfer spot and futures asset between master account and sub accounts
- `GET /sapi/v1/sub-account/universalTransfer` to search transfer records
- `GET /sapi/v2/sub-account/futures/account` to get detail on sub-account's USDT margined futures account and COIN margined futures account
- `GET /sapi/v2/sub-account/futures/accountSummary` to get summary of sub-account's USDT margined futures account and COIN margined futures account
- `GET /sapi/v2/sub-account/futures/positionRisk` to get position risk of sub-account's USDT margined futures account and COIN margined futures account

## v1.6.0 - 2021-12-07
### Added
- `GET /api/v3/rateLimit/order` to get the current order count usage for all intervals
- `GET /sapi/v1/loan/income` to support user query crypto loans history
- `POST /sapi/v1/sub-account/subAccountApi/ipRestriction` to support master account enable and disable IP restriction for a sub-account API Key
- `POST /sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` to support master account add IP list for a sub-account API Key
- `GET /sapi/v1/sub-account/subAccountApi/ipRestriction` to support master account query IP restriction for a sub-account API Key
- `DELETE /sapi/v1/sub-account/subAccountApi/ipRestriction/ipList` to support master account delete IP list for a sub-account API Key
- `GET /sapi/v1/pay/transactions` to support user query Pay trade history
- `GET /sapi/v1/convert/tradeFlow` to support user query convert trade history records
- `GET /sapi/v1/rebate/taxQuery` to support user query spot rebate history records
- `GET /sapi/v1/margin/crossMarginData` to get cross margin fee data collection
- `GET /sapi/v1/margin/isolatedMarginData` to get isolated margin fee data collection
- `GET /sapi/v1/margin/isolatedMarginTier` to get isolated margin tier data collection
- `GET /sapi/v1/nft/history/transactions` to get NFT transaction history
- `GET /sapi/v1/nft/history/deposit` to get NFT deposit history
- `GET /sapi/v1/nft/history/withdraw` to get NFT withdraw history
- `GET /sapi/v1/nft/user/getAsset` to get NFT asset

### Fixed
- npm audit upgrades

## v1.5.0 - 2021-10-01
### Added
- `GET /sapi/v1/bswap/poolConfigure` to get pool configure
- `GET /sapi/v1/bswap/addLiquidityPreview` to get add liquidity preview
- `GET /sapi/v1/margin/isolated/accountLimit` to get remove liquidity preview
- Axios version upgrade to `0.21.4`

## v1.4.0 - 2021-09-14
### Added
- `GET /sapi/v1/capital/withdraw/history` has a new optional field withdrawOrderId
- `DELETE /sapi/v1/margin/isolated/account` to disable isolated margin account for a specific symbol
- `POST /sapi/v1/margin/isolated/account` to enable isolated margin account for a specific symbol
- `GET /sapi/v1/margin/isolated/accountLimit` to query enabled isolated margin account limit

## v1.3.1 - 2021-09-02
### Fix
- Fix on websocket close event detection logic

## v1.3.0 - 2021-08-31
### Added
- `POST /sapi/v1/asset/transfer` and `GET /sapi/v1/asset/transfer` optional fields `fromSymbol`, `toSymbol`
- `POST /sapi/v1/margin/order/oco` create a margin account OCO order
- `DELETE /sapi/v1/margin/orderList` cancel a margin account OCO order
- `GET /sapi/v1/margin/orderList` query OCO orders under a margin account
- `GET /sapi/v1/margin/allOrderList` query all OCO orders under a margin account
- `GET /sapi/v1/margin/openOrderList` query open OCO orders under a margin account

## v1.2.0 - 2021-08-20
### Added
- `GET /sapi/v1/c2c/orderMatch/listUserOrderHistory` to query user C2C trade history
- `GET api/v3/myTrades` has a new optional field orderId

## v1.1.0 - 2021-08-12
### Added
- `GET /sapi/v1/fiat/orders` to query user fiat deposit and withdraw history
- `GET /sapi/v1/fiat/payments` to query user fiat payments history


## v1.0.0 - 2021-07-27
### Added
- First release, please find details from `README.md`
