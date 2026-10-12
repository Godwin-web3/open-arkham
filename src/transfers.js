// Recent ERC-20 Transfer events via public RPC eth_getLogs.
// No API key. Limited to recent blocks to stay within free RPC limits.

const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

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

export async function getRecentTransfers(rpc, address, fromBlock = 'latest') {
  const padded = address.toLowerCase().replace('0x', '').padStart(64, '0');
  const fromTopic = '0x' + padded;
  const toTopic = '0x' + padded;

  try {
    const logs = await rpcCall(rpc, 'eth_getLogs', [{
      fromBlock: '0x' + (parseInt(fromBlock, 16) - 10000).toString(16), // last ~10k blocks
      toBlock: 'latest',
      topics: [TRANSFER_TOPIC, null, null], // broad, then filter
    }]);

    const relevant = logs.filter(log => 
      log.topics[1] === fromTopic || log.topics[2] === toTopic
    ).slice(0, 10); // limit output

    return relevant.map(log => ({
      txHash: log.transactionHash,
      from: '0x' + log.topics[1].slice(26),
      to: '0x' + log.topics[2].slice(26),
      token: log.address,
      // value decoding omitted for brevity; raw data available
    }));
  } catch (e) {
    console.log('Transfers unavailable on this RPC:', e.message);
    return [];
  }
}
