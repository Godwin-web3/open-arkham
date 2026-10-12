// Open label lookup from multiple public sources.
// eth-labels + wallet-attribution. Local fallback.

const LOCAL = {
  '0xbe0eb53f46cd79a6e9b1c2c5b8c5c5c5c5c5c5c5': 'Binance Hot Wallet',
  '0xd8da6bf26964af9d7eed9e03e53415d37aa96045': 'Vitalik Buterin',
  '0x28c6c06298d514db089934071355e5743bf21d60': 'Binance',
};

let labelMap = new Map(Object.entries(LOCAL));

async function loadFromUrl(url, parser) {
  try {
    const res = await fetch(url);
    if (!res.ok) return 0;
    const data = await res.json();
    return parser(data);
  } catch {
    return 0;
  }
}

async function loadRemoteLabels() {
  let total = 0;

  // eth-labels accounts
  total += await loadFromUrl(
    'https://raw.githubusercontent.com/dawsbot/eth-labels/v1/data/json/accounts.json',
    (accounts) => {
      let n = 0;
      for (const acc of accounts) {
        if (acc.address && acc.nameTag) {
          labelMap.set(acc.address.toLowerCase(), acc.nameTag);
          n++;
        }
      }
      return n;
    }
  );

  // wallet-attribution ethereum (example; adjust path if needed)
  total += await loadFromUrl(
    'https://raw.githubusercontent.com/prettydeath/wallet-attribution/main/data/ethereum.json',
    (rows) => {
      let n = 0;
      for (const row of rows) {
        if (row.address && row.entity) {
          labelMap.set(row.address.toLowerCase(), row.entity);
          n++;
        }
      }
      return n;
    }
  );

  if (total > 0) console.log(`Loaded ${total} labels from public sources`);
  else console.log('Using local label set');
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
