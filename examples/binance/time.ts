import Binance from '../../src/index';

const client = new Binance()

client.market.time().then( (response: any) => console.log(response.data));
