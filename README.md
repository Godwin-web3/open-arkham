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
- Labels: eth-labels + wallet-attribution public JSON (runtime) + local fallback.
- Transfers: public RPC eth_getLogs.
- Counterparties: aggregated from transfers.

## Current scope

- Multi-chain balances with USD values.
- Expanded open label lookup from two public datasets.
- Recent transfers with labels on from/to.
- Top counterparties by transfer count with labels.

## Next

- Graph view of flows.
- Wider transfer window or explorer fallback.
- Solana and Bitcoin support.
- More token coverage.

## Run

```bash
node src/check-balances.js 0xYourAddress
```

Requires Node 18+.

Label coverage depends on what the public JSON files contain at fetch time. Transfers and counterparties depend on recent activity and free RPC limits.
