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
- Prices: CoinGecko free simple price endpoint.
- Transactions: next (Etherscan free or Blockscout).
- Labels: eth-labels, wallet-attribution, GraphSense, OFAC. Local stub with public examples.

## Current scope

- Multi-chain native + common ERC-20 balances.
- USD values from CoinGecko free API.
- Approximate total USD.
- Basic label lookup stub.

## Next

- Load real open label CSVs into the lookup.
- Recent transfers from free explorer endpoints.
- Counterparty list with labels overlaid.
- Graph view of flows.

## Run

```bash
node src/check-balances.js 0xYourAddress
```

Requires Node 18+.
