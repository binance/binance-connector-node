# Changelog

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