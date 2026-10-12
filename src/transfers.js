// Recent transfers via public RPC logs, with Blockscout free fallback.

const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const BLOCKSCOUT = {
  ethereum: 'https://eth.blockscout.com/api',
  base: 'https://base.blockscout.com/api',
  arbitrum: 'https://arbitrum.blockscout.com/api',
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

async function getRpcTransfers(rpc, address) {
  const latestHex = await rpcCall(rpc, 'eth_blockNumber', []);
  const latest = parseInt(latestHex, 16);
  const fromBlock = Math.max(0, latest - 50000);

  const padded = address.toLowerCase().replace('0x', '').padStart(64, '0');
  const fromTopic = '0x' + padded;
  const toTopic = '0x' + padded;

  const logs = await rpcCall(rpc, 'eth_getLogs', [{
    fromBlock: '0x' + fromBlock.toString(16),
    toBlock: 'latest',
    topics: [TRANSFER_TOPIC],
  }]);

  return logs.filter(log =>
    log.topics && (log.topics[1] === fromTopic || log.topics[2] === toTopic)
  ).slice(0, 15).map(log => ({
    txHash: log.transactionHash,
    from: '0x' + (log.topics[1] || '').slice(26),
    to: '0x' + (log.topics[2] || '').slice(26),
    token: log.address,
  }));
}

async function getBlockscoutTransfers(chain, address) {
  const base = BLOCKSCOUT[chain];
  if (!base) return [];
  const url = `${base}?module=account&action=tokentx&address=${address}&page=1&offset=15&sort=desc`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status !== '1' || !data.result) return [];
  return data.result.slice(0, 15).map(tx => ({
    txHash: tx.hash,
    from: tx.from,
    to: tx.to,
    token: tx.contractAddress,
  }));
}

export async function getRecentTransfers(rpc, address, chainName) {
  try {
    const rpcTransfers = await getRpcTransfers(rpc, address);
    if (rpcTransfers.length > 0) return rpcTransfers;
  } catch (e) {
    // fall through
  }

  try {
    const bs = await getBlockscoutTransfers(chainName, address);
    if (bs.length) console.log('  (using Blockscout fallback)');
    return bs;
  } catch {
    return [];
  }
}
