export async function balance(
    api, account, resultHandler
) {
    return api === null ? null :
        api.query.balances.account(account.address, result => {
            resultHandler(result)
        })
}