# Open Arkham

Free open-source multi-chain portfolio and transaction tracker.

Built from public RPCs, free price feeds, and open label datasets.

No proprietary intelligence. Every number comes from a source you can re-query.

## What this is

A portfolio view of any address or set of addresses across chains. Holdings, USD value, recent transfers, and known labels from public sources.

## What this is not

Not a clone of Arkham's Ultra entity engine. Public sources cover known exchange wallets, sanctioned addresses, major protocols, and some high-profile individuals. They do not cover most deposit addresses or deep off-chain linking.

## Data sources

- Balances: public RPCs via eth_getBalance and ERC-20 balanceOf.
- Prices: CoinGecko free endpoint.
- Labels: eth-labels + wallet-attribution public JSON + local fallback.
- Transfers: public RPC eth_getLogs.
- Counterparties and flows: derived from the same transfer list.

## Current scope

- Multi-chain balances with USD values.
- Open label lookup from two public datasets.
- Recent transfers with labels on from/to.
- Top counterparties by transfer count with labels.
- Basic text flow summary of in/out connections.

## Next

- Wider transfer window or explorer fallback.
- More token coverage.
- Solana and Bitcoin support.
- Optional HTML graph export.

## Run

```bash
node src/check-balances.js 0xYourAddress
```

Requires Node 18+.

All derived views (counterparties, flows) use only the transfers returned by the free RPC. Labels appear only for addresses present in the open datasets.
