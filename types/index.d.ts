// The types have been deduced from the javascript code, annotations and the Binance API doc https://binance-docs.github.io/apidocs/
// This file is partial, if the method you want to use is not yet typed, feel free to contribute
declare module '@binance/connector' {
    import { Method, AxiosResponse } from "axios";
    type Logger = {
        debug: () => void;
        log: () => void;
        info: () => void;
        warn: () => void;
        error: () => void;
    }
    export type ClientOptions = {
       baseUrl?: string;
       logger?: Logger;
    }
    // Market
    export type RateLimitType = 'REQUEST_WEIGHT' | 'ORDERS' | 'RAW_REQUESTS';
    export type RateLimitInterval = 'SECOND' | 'MINUTE' | 'DAY';
    export type RateLimit = {
        rateLimitType: RateLimitType;
        interval: RateLimitInterval;
        intervalNum: number;
        limit: number;
    };
    export type FilterType = 'PRICE_FILTER' | 'PERCENT_PRICE' | 'PERCENT_PRICE_BY_SIDE' | 'LOT_SIZE' | 'MIN_NOTIONAL' | 'ICEBERG_PARTS' | 'MARKET_LOT_SIZE' | 'MAX_NUM_ORDERS' | 'MAX_NUM_ALGO_ORDERS' | 'MAX_NUM_ICEBERG_ORDERS' | 'MAX_POSITION' | 'EXCHANGE_MAX_NUM_ORDERS' | 'EXCHANGE_MAX_NUM_ALGO_ORDERS';
    export type PriceFilter = {
        filterType: 'PRICE_FILTER';
        minPrice: string;
        maxPrice: string;
        tickSize: string;
    };
    export type PercentPriceFilter = {
        filterType: 'PERCENT_PRICE';
        multiplierUp: string;
        multiplierDown: string;
        avgPriceMins: number;
    };
    export type PercentPriceBySideFilter = {
        filterType: 'PERCENT_PRICE_BY_SIDE';
        bidMultiplierUp: string;
        bidMultiplierDown: string;
        askMultiplierUp: string;
        askMultiplierDown: string;
        avgPriceMins: number;
    };
    export type LotSizeFilter = {
        filterType: 'LOT_SIZE';
        minQty: string;
        maxQty: string;
        stepSize: string;
    };
    export type MinNotionalFilter = {
        filterType: 'MIN_NOTIONAL';
        minNotional: string;
        applyToMarket: boolean;
        avgPriceMins: number;
    };
    export type IcebergPartsFilter = {
        filterType: 'ICEBERG_PARTS';
        limit: number;
    };
    export type MarketLotSizeFilter = {
        filterType: 'MARKET_LOT_SIZE';
        minQty: string;
        maxQty: string;
        stepSize: string;
    };
    export type MaxNumOrdersFilter = {
        filterType: 'MAX_NUM_ORDERS';
        maxNumOrders: number;
    };
    export type MaxNumAlgoOrdersFilter = {
        filterType: 'MAX_NUM_ALGO_ORDERS';
        maxNumAlgoOrders: number;
    };
    export type MaxNumIcebergOrdersFilter = {
        filterType: 'MAX_NUM_ICEBERG_ORDERS';
        maxNumIcebergOrders: number;
    };
    export type MaxPositionFilter = {
        filterType: 'MAX_POSITION';
        maxPosition: string;
    };
    export type ExchangeMaxNumOrdersFilter = {
        filterType: 'EXCHANGE_MAX_NUM_ORDERS';
        maxNumOrders: number;
    };
    export type ExchangeMaxNumAlgoOrdersFilter = {
        filterType: 'EXCHANGE_MAX_NUM_ALGO_ORDERS';
        maxNumAlgoOrders: number;
    };
    export type Filter = PriceFilter | PercentPriceFilter | PercentPriceBySideFilter | LotSizeFilter | MinNotionalFilter | IcebergPartsFilter | MarketLotSizeFilter | MaxNumOrdersFilter | MaxNumAlgoOrdersFilter | MaxNumIcebergOrdersFilter | MaxPositionFilter | ExchangeMaxNumOrdersFilter | ExchangeMaxNumAlgoOrdersFilter;
    export type SymbolStatus = 'PRE_TRADING' | 'TRADING' | 'POST_TRADING' | 'END_OF_DAY' | 'HALT' | 'AUCTION_MATCH' | 'BREAK';
    export type Permission = 'SPOT' | 'MARGIN' | 'LEVERAGED' | 'TRD_GRP_002';
    export type SymbolInformation = {
        symbol: string;
        status: SymbolStatus;
        baseAsset: string;
        baseAssetPrecision: number;
        baseCommissionPrecision: number;
        quoteAsset: string;
        quotePrecision: number;
        quoteAssetPrecision: number;
        quoteCommissionPrecision: number;
        orderTypes: OrderType[];
        icebergAllowed: boolean;
        ocoAllowed: boolean;
        quoteOrderQtyMarketAllowed: boolean;
        allowTrailingStop: boolean;
        isSpotTradingAllowed: boolean;
        isMarginTradingAllowed: boolean;
        filters: Filter[];
        permissions: Permission[];
    }
    export type ExchangeInformation = {
        timezone: string;
        serverTime: number; // Timestamp
        rateLimits: RateLimit[];
        exchangeFilters: Filter[];
        symbols: SymbolInformation[];
    }

    // Trade
    export type AccountInformation = {
        makerCommission: number;
        takerCommission: number;
        buyerCommission: number;
        sellerCommission: number;
        canTrade: boolean;
        canWithdraw: boolean;
        canDeposit: boolean;
        updateTime: number;
        accountType: 'SPOT';
        balances: {
            asset: string;
            free: string;
            locked: string;
        }[];
        permissions: string[];
    };
    export type OrderSide = 'BUY' | 'SELL';
    export type OrderType = 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT' | 'LIMIT_MAKER';
    export type TimeInForce = 'GTC' | 'IOC' | 'FOK';
    export type NewOrderRespType = 'ACK' | 'RESULT' | 'FULL';
    export type OrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED';
    export type OrderOptions = {
        timeInForce?: TimeInForce;
        quantity?: string | number;
        quoteOrderQty?: string | number;
        price?: string | number;
        newClientOrderId?: string; // A unique id among open orders. Automatically generated if not sent.
        stopPrice?: string | number; // Used with STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders.
        icebergQty?: string | number; // Used with LIMIT, STOP_LOSS_LIMIT, and TAKE_PROFIT_LIMIT to create an iceberg order.
        newOrderRespType?: NewOrderRespType; // Set the response JSON. ACK, RESULT, or FULL; MARKET and LIMIT order types default to FULL, all other orders default to ACK.
        recvWindow?: number; // The value cannot be greater than 60000
    }
    export type NewOrderResponseAck = {
        symbol: string;
        orderId: number;
        orderListId: number; // Unless OCO, value will be -1
        clientOrderId: string;
        transactTime: number; // Timestamp
    }
    export type NewOrderResponseResult = NewOrderResponseAck & {
        price: string;
        origQty: string;
        executedQty: string;
        cummulativeQuoteQty: string;
        status: OrderStatus;
        timeInForce: TimeInForce;
        type: OrderType;
        side: OrderSide;
    }
    export type Fill = {
        price: string;
        qty: string;
        commission: string;
        commissionAsset: string;
        tradeId: number;
    };
    export type NewOrderResponseFull = NewOrderResponseResult & {
        fills: Fill[];
    }

    export class Spot {
        constructor (apiKey ?: string, apiSecret?: string, options?: ClientOptions);

        // APIBase
        publicRequest <ResponseDataType = any>(method: Method, path: string, params?: Record<string, boolean | number | string| string[]>): Promise<AxiosResponse<ResponseDataType>>;
        signRequest <ResponseDataType = any>(method: Method, path: string, params?: Record<string, boolean | number | string| string[]>): Promise<AxiosResponse<ResponseDataType>>;

        // Market
        avgPrice (symbol: string): Promise<AxiosResponse<{ mins: number; price: string; }>>;
        exchangeInfo (options?: { symbol?: string; symbols?: string[]; }): Promise<AxiosResponse<ExchangeInformation>>;

        // Trade
        account (options?: { recvWindow?: number }): Promise<AxiosResponse<AccountInformation>>;
        newOrderTest (symbol: string, side: OrderSide, type: OrderType, options?: OrderOptions): Promise<AxiosResponse<Record<string, never>>>;
        newOrder <NewOrderResponseType extends NewOrderResponseAck | NewOrderResponseResult | NewOrderResponseFull = NewOrderResponseFull>(symbol: string, side: OrderSide, type: OrderType, options?: OrderOptions): Promise<AxiosResponse<NewOrderResponseType>>;
    }
}
