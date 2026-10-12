# Open Arkham

Free open-source multi-chain portfolio and transaction tracker.

Built from public RPCs, free price feeds, explorer APIs, and open label datasets.

No proprietary intelligence. Every number comes from a source you can re-query.

## What this is

A portfolio view of any address or set of addresses across chains. Holdings, USD value, recent transfers, and known labels from public sources.

## What this is not

Not a clone of Arkham's Ultra entity engine. Public sources cover known exchange wallets, sanctioned addresses, major protocols, and some high-profile individuals. They do not cover most deposit addresses or deep off-chain linking.

## Data sources

- Balances: public RPCs (publicnode) via eth_getBalance and ERC-20 balanceOf.
- Prices: CoinGecko free tier or DefiLlama (next).
- Transactions: Etherscan free API or Blockscout (next).
- Labels: eth-labels, wallet-attribution, GraphSense, OFAC. Local lookup stub included.

## Current scope

- Multi-chain native balances.
- Common ERC-20 balances (USDC, USDT, WETH) on Ethereum, Base, Arbitrum.
- Basic label lookup stub.

## Next

- Ingest real open label CSVs.
- Transaction history from free explorer endpoints.
- Counterparty aggregation with labels.
- Simple graph view.
- Price feeds for USD totals.

## Run

```bash
node src/check-balances.js 0xYourAddress
```

Requires Node 18+.
