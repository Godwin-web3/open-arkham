// Open label lookup stub.
// Expand with real CSVs from eth-labels and wallet-attribution.
// All examples are public.

const known = {
  '0xbe0eb53f46cd79a6e9b1c2c5b8c5c5c5c5c5c5c5': 'Binance Hot Wallet',
  '0xd8da6bf26964af9d7eed9e03e53415d37aa96045': 'Vitalik Buterin',
  '0x28c6c06298d514db089934071355e5743bf21d60': 'Binance',
  '0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be': 'Binance',
  '0x1b3cb81e51011b549d78bf720b0d924ac763a7c2': 'Binance',
};

export function lookupLabel(address) {
  return known[address.toLowerCase()] || null;
}

export function isKnown(address) {
  return !!lookupLabel(address);
}
