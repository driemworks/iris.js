import { ContractPromise } from '@polkadot/api-contract';

export function contract(api, metadata, address) {
    // The address is the actual on-chain address as ss58 or AccountId object.
    return new ContractPromise(api, metadata, address);
}