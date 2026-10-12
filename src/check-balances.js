// Multi-chain native + common ERC-20 balance checker.
// Uses public RPCs. No API keys.

const CHAINS = {
  ethereum: {
    rpc: 'https://ethereum-rpc.publicnode.com',
    symbol: 'ETH',
    tokens: {
      USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    },
  },
  base: {
    rpc: 'https://base-rpc.publicnode.com',
    symbol: 'ETH',
    tokens: {
      USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      WETH: '0x4200000000000000000000000000000000000006',
    },
  },
  arbitrum: {
    rpc: 'https://arbitrum-one-rpc.publicnode.com',
    symbol: 'ETH',
    tokens: {
      USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    },
  },
};

const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

async function rpcCall(rpc, method, params) {
  const body = { jsonrpc: '2.0', method, params, id: 1 };
  const res = await fetch(rpc, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

async function getNativeBalance(rpc, address) {
  const wei = BigInt(await rpcCall(rpc, 'eth_getBalance', [address, 'latest']));
  return Number(wei) / 1e18;
}

async function getTokenBalance(rpc, tokenAddress, holder) {
  const data = '0x70a08231' + holder.slice(2).padStart(64, '0');
  const result = await rpcCall(rpc, 'eth_call', [{ to: tokenAddress, data }, 'latest']);
  if (!result || result === '0x') return 0;
  const raw = BigInt(result);
  // Assume 6 or 18 decimals. USDC/USDT usually 6, WETH 18. Hardcoded for common ones.
  const decimals = tokenAddress.toLowerCase().includes('a0b86991') || tokenAddress.toLowerCase().includes('833589') || tokenAddress.toLowerCase().includes('af88d065') ? 6 : 18;
  return Number(raw) / 10 ** decimals;
}

async function main() {
  const address = process.argv[2];
  if (!address || !address.startsWith('0x')) {
    console.log('Usage: node src/check-balances.js 0xAddress');
    process.exit(1);
  }

  console.log(`Portfolio for ${address}\n`);
  for (const [name, chain] of Object.entries(CHAINS)) {
    console.log(`\n${name.toUpperCase()}`);
    try {
      const native = await getNativeBalance(chain.rpc, address);
      console.log(`  Native: ${native.toFixed(6)} ${chain.symbol}`);
      for (const [symbol, token] of Object.entries(chain.tokens)) {
        const bal = await getTokenBalance(chain.rpc, token, address);
        if (bal > 0) console.log(`  ${symbol}: ${bal.toFixed(4)}`);
      }
    } catch (e) {
      console.log(`  error: ${e.message}`);
    }
  }
}

main();
