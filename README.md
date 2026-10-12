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
- Labels: eth-labels (raw JSON) and wallet-attribution. Loaded at runtime when available.
- Transactions: next.

## Current scope

- Multi-chain native + common ERC-20 balances.
- USD values from CoinGecko.
- Approximate total USD.
- Dynamic open label lookup (eth-labels + local fallback).
- Label shown next to the queried address if known.

## Next

- Overlay labels on counterparties once transfers are added.
- Recent transfers from free explorer endpoints.
- Counterparty aggregation.
- Graph view.

## Run

```bash
node src/check-balances.js 0xYourAddress
```

Requires Node 18+.

The label loader tries the public eth-labels JSON. If the raw URL changes or is rate-limited, it falls back to the local set.
