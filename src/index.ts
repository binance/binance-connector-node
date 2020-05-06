
import Market from './modules/market';

export default class Binance {
    // public market: Market;

    private _market: Market;

    constructor() {
        this._market = new Market()
    }

    get market() {
        return this._market || (this._market = new Market());   
    }
}
