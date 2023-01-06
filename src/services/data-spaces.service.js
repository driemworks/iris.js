/**
 * Send a transaction to create a new dataspace
 * @param {*} api 
 * @param {*} account 
 * @param {*} id 
 * @param {*} name 
 * @param {*} existential_deposit 
 * @param {*} isInBlockCallback 
 * @param {*} isFinalizedCallback 
 */
export async function create_dataspace(
    api, account, id, name, existential_deposit,
    isInBlockCallback, isFinalizedCallback,
) {
    await api.tx.dataSpaces.create(
        account.address, name, id, existential_deposit,
    ).signAndSend(account, result => {
        if (result.status.isInBlock) {
            isInBlockCallback(result);
        } else if (result.status.isFinalized) {
            isFinalizedCallback(result);
        }
    });
}

export async function call_mint_dataspace_access(
    api, account, beneficiary, id, amount,
    isInBlockCallback, isFinalizedCallback,
) {
    await api.tx.dataSpaces.mint(
        beneficiary, id, amount,
    ).signAndSend(account, result => {
        if (result.status.isInBlock) {
            isInBlockCallback(result);
        } else if (result.status.isFinalized) {
            isFinalizedCallback(result);
        }
    });
}

export async function query_metadata(
    api, assetId, subscriptionCallback,
) {
    return api === null ? null : 
        api.query.dataSpaces.metadata(assetId, (dataspacesMetadata) => 
            subscriptionCallback(dataspacesMetadata)
        );

}

export class Dataspace {

    constructor(api, id) {
        if (api === null) {
            throw new Error("API must not be null");
        }
        this.api = api;
        this.id = id;
    }

    async checkMembership(address, resultsHandler) {
        await this.api.query.assets.account(this.id, address,
            result => resultsHandler(result));
    }

    async assetDetails(resultHandler) {
        await this.api.query.assets.asset(this.id,
            result => resultHandler(result));
    }

    async metadata(resultHandler) {
        await this.api.query.dataSpaces.metadata(this.id, result => resultHandler(result));
    }

    async mint(account, amount, recipient, resultHandler) { 
        await this.api.tx.dataSpaces
            .mint(recipient, this.id, amount)
            .signAndSend(account, result => resultHandler(result));
    }

    async bond(account, dataspaceId, assetId, resultHandler) {
        await this.api.tx.dataSpaces
            .bond(dataspaceId, assetId)
            .signAndSend(account, result => resultHandler(result));
    }

}
