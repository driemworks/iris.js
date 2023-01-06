export class DataAsset {

    constructor(api) {
        if (api === null) {
            throw new Error("API must not be null");
        }
        this.api = api;
    }

    async tryCreate(account, gatewayAddress, cid, resultHandler) {
        await this.api.tx.dataAssets.createRequest(
            gatewayAddress, 0, cid, '', 1,
        ).signAndSend(account, result => resultHandler(result));
    }

}