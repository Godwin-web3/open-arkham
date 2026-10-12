// Open label lookup.
// Loads from public datasets at runtime. Falls back to local examples.
// Sources: eth-labels, wallet-attribution.

const LOCAL = {
  '0xbe0eb53f46cd79a6e9b1c2c5b8c5c5c5c5c5c5c5': 'Binance Hot Wallet',
  '0xd8da6bf26964af9d7eed9e03e53415d37aa96045': 'Vitalik Buterin',
  '0x28c6c06298d514db089934071355e5743bf21d60': 'Binance',
};

let labelMap = new Map(Object.entries(LOCAL));

async function loadRemoteLabels() {
  try {
    // Try eth-labels accounts JSON (example endpoint; adjust if needed)
    const res = await fetch('https://raw.githubusercontent.com/dawsbot/eth-labels/v1/data/json/accounts.json');
    if (res.ok) {
      const accounts = await res.json();
      for (const acc of accounts) {
        if (acc.address && acc.nameTag) {
          labelMap.set(acc.address.toLowerCase(), acc.nameTag);
        }
      }
      console.log(`Loaded ${accounts.length} labels from eth-labels`);
    }
  } catch (e) {
    console.log('Remote labels unavailable, using local set');
  }
}

export async function initLabels() {
  await loadRemoteLabels();
}

export function lookupLabel(address) {
  return labelMap.get(address.toLowerCase()) || null;
}

export function isKnown(address) {
  return labelMap.has(address.toLowerCase());
}
