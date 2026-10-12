// Stub for open label lookup.
// Load from local CSV/JSON of eth-labels or wallet-attribution.
// Public sources only.

const known = {
  '0xbe0eb53f46cd79a6e9b1c2c5b8c5c5c5c5c5c5c5': 'Binance Hot Wallet',
  '0xd8da6bf26964af9d7eed9e03e53415d37aa96045': 'Vitalik Buterin',
  // Add more from open datasets.
};

export function lookupLabel(address) {
  return known[address.toLowerCase()] || null;
}

export function isKnown(address) {
  return !!lookupLabel(address);
}
