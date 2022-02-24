# Changelog

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