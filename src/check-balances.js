// Minimal multi-chain balance checker using public RPCs.
// No API keys. Native balances only for now.

const CHAINS = {
  ethereum: { rpc: 'https://ethereum-rpc.publicnode.com', symbol: 'ETH', decimals: 18 },
  base: { rpc: 'https://base-rpc.publicnode.com', symbol: 'ETH', decimals: 18 },
  arbitrum: { rpc: 'https://arbitrum-one-rpc.publicnode.com', symbol: 'ETH', decimals: 18 },
  polygon: { rpc: 'https://polygon-bor-rpc.publicnode.com', symbol: 'POL', decimals: 18 },
};

async function getNativeBalance(rpc, address) {
  const body = {
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: [address, 'latest'],
    id: 1,
  };
  const res = await fetch(rpc, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const wei = BigInt(data.result);
  return Number(wei) / 1e18;
}

async function main() {
  const address = process.argv[2];
  if (!address || !address.startsWith('0x')) {
    console.log('Usage: node src/check-balances.js 0xAddress');
    process.exit(1);
  }

  console.log(`Balances for ${address}\n`);
  for (const [name, chain] of Object.entries(CHAINS)) {
    try {
      const bal = await getNativeBalance(chain.rpc, address);
      console.log(`${name.padEnd(12)} ${bal.toFixed(6)} ${chain.symbol}`);
    } catch (e) {
      console.log(`${name.padEnd(12)} error: ${e.message}`);
    }
  }
}

main();
