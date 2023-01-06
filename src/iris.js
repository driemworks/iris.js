import { connect } from './api';
import * as IPFS from 'ipfs-core';
import { Keyring } from '@polkadot/api';
import { stringToU8a, u8aToHex } from '@polkadot/util';

/**
 * The Iris object makes a connection to the specified Iris node and loads a URI into the keyring.
 * It also initializes an IPFS instance that runs in-browser. 
 */
export default class Iris {

    constructor() { }

    /**
     * 
     * @param {*} host 
     * @param {*} port 
     * @param {*} uri 
     */
    async init(host, port, uri) {
        // load api
        let api = await connect(host, port);
        // load keyring w/ uri
        let kr = new Keyring({ type: 'sr25519' });
        let defaultAccount = kr.addFromUri(uri);
        // build ipfs
        // https://github.com/ipfs/js-ipfs/blob/master/docs/MODULE.md#optionsconfig
        const ipfsOptions = {repo: 'ok' + Math.random()};
        let ipfs = await IPFS.create(ipfsOptions);
        await ipfs.bootstrap.clear();
        // should read from Iris instead...
        // await ipfs.bootstrap.add('/ip4/18.118.65.202/tcp/4001/p2p/12D3KooWJ5wuqGnr6u8XV6FeBbP1MBBamUpavwfotRag2JnTrF9p');
        await ipfs.bootstrap.add('/ip4/206.176.195.179/tcp/4001/p2p/12D3KooWCrSfCAAc91iGBxP6uxkcWBzNKxWVN2ZU7CFzvfVYeLWh');
        this.api = api;
        this.keyring = kr;
        this.ipfs = ipfs;
        this.defaultAccount = defaultAccount;
    }

    /**
     * 
     * @param {*} signer 
     * @param {*} proxyAddress 
     * @param {*} plaintext 
     * @param {*} message 
     * @param {*} successCallback 
     * @param {*} errorCallback 
     */
    async encrypt(signer, proxyPubkey, plaintext, message, errorCallback) {
        let signature = signer.sign(stringToU8a(message));
        let sigAsHex = u8aToHex(signature);
        return await this.api.rpc.iris.encrypt(
            plaintext, 
            sigAsHex, 
            u8aToHex(signer.publicKey), 
            message, 
            u8aToHex(proxyPubkey),
        ).then(async ciphertext => {
            console.log(ciphertext);
            let cid = await this.ipfs.add(ciphertext);
            console.log(cid);
            return cid;
        })
        .catch(err => errorCallback(err));
    }
}
