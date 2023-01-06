const mockPolkadot = jest.genMockFromModule("@polkadot/api");
mockPolkadot.create = jest.fn(() => mockPolkadot);
export default mockPolkadot;