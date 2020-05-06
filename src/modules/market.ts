import APIBase from "./apiBase";

export default class Market extends APIBase{
    constructor() {
        super('', '');
    }

    public time() {
        return this.send_request().get('/api/v3/time');
    }
}
