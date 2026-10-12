// Multi-chain portfolio with USD values, open labels, and recent transfers.
// Public RPCs + CoinGecko + eth-labels.

import { initLabels, lookupLabel } from './labels.js';
import { getRecentTransfers } from './transfers.js';

const CHAINS = {
  ethereum: {
    rpc: 'https://ethereum-rpc.publicnode.com',
    native: { symbol: 'ETH', coingecko: 'ethereum' },
    tokens: {
      USDC: { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, coingecko: 'usd-coin' },
      USDT: { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, coingecko: 'tether' },
      WETH: { address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18, coingecko: 'weth' },
    },
  },
  base: {
    rpc: 'https://base-rpc.publicnode.com',
    native: { symbol: 'ETH', coingecko: 'ethereum' },
    tokens: {
      USDC: { address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6, coingecko: 'usd-coin' },
      WETH: { address: '0x4200000000000000000000000000000000000006', decimals: 18, coingecko: 'weth' },
    },
  },
  arbitrum: {
    rpc: 'https://arbitrum-one-rpc.publicnode.com',
    native: { symbol: 'ETH', coingecko: 'ethereum' },
    tokens: {
      USDC: { address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6, coingecko: 'usd-coin' },
      USDT: { address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6, coingecko: 'tether' },
      WETH: { address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', decimals: 18, coingecko: 'weth' },
    },
  },
};

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

async function getTokenBalance(rpc, tokenAddress, holder, decimals) {
  const data = '0x70a08231' + holder.slice(2).padStart(64, '0');
  const result = await rpcCall(rpc, 'eth_call', [{ to: tokenAddress, data }, 'latest']);
  if (!result || result === '0x') return 0;
  const raw = BigInt(result);
  return Number(raw) / 10 ** decimals;
}

async function getPrices() {
  const ids = 'ethereum,usd-coin,tether,weth';
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    ethereum: data.ethereum?.usd || 0,
    'usd-coin': data['usd-coin']?.usd || 1,
    tether: data.tether?.usd || 1,
    weth: data.weth?.usd || data.ethereum?.usd || 0,
  };
}

async function main() {
  const address = process.argv[2];
  if (!address || !address.startsWith('0x')) {
    console.log('Usage: node src/check-balances.js 0xAddress');
    process.exit(1);
  }

  await initLabels();
  const label = lookupLabel(address);
  const labelText = label ? ` (${label})` : '';

  const prices = await getPrices();
  console.log(`Portfolio for ${address}${labelText}\n`);
  let totalUsd = 0;

  for (const [name, chain] of Object.entries(CHAINS)) {
    console.log(`\n${name.toUpperCase()}`);
    try {
      const nativeBal = await getNativeBalance(chain.rpc, address);
      const nativeUsd = nativeBal * prices[chain.native.coingecko];
      totalUsd += nativeUsd;
      console.log(`  Native: ${nativeBal.toFixed(6)} ${chain.native.symbol}  ($${nativeUsd.toFixed(2)})`);

      for (const [symbol, token] of Object.entries(chain.tokens)) {
        const bal = await getTokenBalance(chain.rpc, token.address, address, token.decimals);
        if (bal > 0) {
          const usd = bal * (prices[token.coingecko] || 0);
          totalUsd += usd;
          console.log(`  ${symbol}: ${bal.toFixed(4)}  ($${usd.toFixed(2)})`);
        }
      }

      // Recent transfers
      const transfers = await getRecentTransfers(chain.rpc, address);
      if (transfers.length) {
        console.log('  Recent transfers:');
        for (const t of transfers) {
          const fromLabel = lookupLabel(t.from) || t.from.slice(0, 8);
          const toLabel = lookupLabel(t.to) || t.to.slice(0, 8);
          console.log(`    ${fromLabel} -> ${toLabel}  (${t.token.slice(0, 8)}...)`);
        }
      }
    } catch (e) {
      console.log(`  error: ${e.message}`);
    }
  }

  console.log(`\nTotal USD (approx): $${totalUsd.toFixed(2)}`);
}

main();
