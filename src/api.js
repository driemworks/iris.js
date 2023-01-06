import { ApiPromise, WsProvider } from "@polkadot/api";

export const connect = async (host, port) => {
    let provider = new WsProvider(`ws://${host}:${port}`);
    let api = await ApiPromise.create({
        provider,
        rpc: {
            iris: {
            encrypt: {
                description: 'Encrypt plaintext and stage data for ingestion into iris.',
                params: [
                    {
                        name: 'plaintext',
                        type: 'Bytes'
                    },
                    {
                        name: 'signature',
                        type: 'Bytes'
                    },
                    {
                        name: 'signer',
                        type: 'Bytes'
                    },
                    {
                        name: 'message',
                        type: 'Bytes'
                    },
                    {
                        name: 'proxy',
                        type: 'Bytes'
                    }
                ],
                type: 'Bytes'
            },
            decrypt: {
                description: 'Decrypt data that was encrypted through Iris',
                params: [
                    {
                        name: 'ciphertext',
                        type: 'Bytes'
                    },
                    {
                        name: 'signature',
                        type: 'Bytes'
                    },
                    {
                        name: 'signer',
                        type: 'Bytes'
                    },
                    {
                        name: 'message',
                        type: 'Bytes'
                    },
                    {
                        name: 'assetId',
                        type: 'u32'
                    }, 
                    {
                        name: 'secretKey',
                        type: 'Bytes'
                    }
                ],
                type: 'Bytes'
            }
            }
        }
    });
    return api;
}