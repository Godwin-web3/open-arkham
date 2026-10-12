# Open Arkham

Free open-source multi-chain portfolio and transaction tracker.

Built from public RPCs, free price feeds, open label datasets, and free explorer fallbacks.

No proprietary intelligence. Every number comes from a source you can re-query.

## What this is

A portfolio view of any address or set of addresses across chains. Holdings, USD value, recent transfers, and known labels from public sources.

## What this is not

Not a clone of Arkham's Ultra entity engine. Public sources cover known exchange wallets, sanctioned addresses, major protocols, and some high-profile individuals. They do not cover most deposit addresses or deep off-chain linking.

## CLI

```bash
node src/check-balances.js 0xYourAddress
```

## Site

A static skeleton lives in `web/index.html`. Open it in a browser. It calls the same public RPCs for native balances. Full labels, tokens, and transfers can be ported client-side where CORS allows, or served from a thin backend.

## Data sources

- Balances: public RPCs.
- Prices: CoinGecko free endpoint.
- Labels: eth-labels + wallet-attribution.
- Transfers: public RPC logs + Blockscout free API.

## Current scope

- CLI with balances, USD, labels, transfers, counterparties, flow summary.
- Basic static web skeleton for native balances.

## Next

- Port the rest of the logic to the site (or a simple backend).
- Deploy the static files.
- More tokens and chains.

Requires Node 18+ for the CLI. The site needs only a browser.
