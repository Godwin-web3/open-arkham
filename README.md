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
- Labels: eth-labels raw JSON (runtime) + local fallback.
- Transfers: public RPC eth_getLogs for recent ERC-20 Transfer events.

## Current scope

- Multi-chain native + common ERC-20 balances.
- USD values from CoinGecko.
- Approximate total USD.
- Dynamic open label lookup.
- Recent transfers with label overlay on from/to addresses.

## Next

- Aggregate top counterparties from the transfer list.
- Expand label coverage with wallet-attribution CSVs.
- Graph view of flows.
- Solana/Bitcoin support.

## Run

```bash
node src/check-balances.js 0xYourAddress
```

Requires Node 18+.

Transfers are limited to recent blocks and may be empty on rate-limited RPCs. Labels appear when the open dataset contains the address.
