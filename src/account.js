import Keyring from "@polkadot/keyring";

export const load_account = (uri) => {
    const kr = new Keyring({ type: 'sr25519' });
    return kr.addFromUri(uri);
}