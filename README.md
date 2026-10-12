# Open Arkham

Free open-source multi-chain portfolio and transaction tracker.

Built from public RPCs, free price feeds, explorer APIs, and open label datasets.

No proprietary intelligence. Every number comes from a source you can re-query.

## What this is

A portfolio view of any address or set of addresses across chains. Holdings, USD value, recent transfers, and known labels from public sources.

## What this is not

Not a clone of Arkham's Ultra entity engine. Public sources cover known exchange wallets, sanctioned addresses, major protocols, and some high-profile individuals. They do not cover most deposit addresses or deep off-chain linking.

## Data sources

- Balances: public RPCs (publicnode, ankr, etc.) via standard eth_getBalance and ERC-20 balanceOf.
- Prices: CoinGecko free tier or DefiLlama.
- Transactions: Etherscan free API (rate limited), Blockscout, or Solscan free.
- Labels: eth-labels, wallet-attribution, GraphSense TagPacks, OFAC lists. All open.

## Current scope

- Multi-chain native + common token balances for EVM chains.
- Basic label lookup from local open datasets.
- Transaction list for one address (explorer API).

## Next

- Ingest open label CSVs.
- Counterparty aggregation.
- Simple graph view.
- Solana and Bitcoin support.

## Run

```bash
node src/check-balances.js 0xYourAddress
```

Requires Node 18+.
