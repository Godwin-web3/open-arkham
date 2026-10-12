# Open Arkham

Free open-source multi-chain portfolio and transaction tracker.

Built from public RPCs, free price feeds, open label datasets, and free explorer APIs.

No proprietary intelligence. Every number comes from a source you can re-query.

## What this is

A portfolio view of any address across chains. Holdings with USD value, recent transfers, known public labels, top counterparties, and a simple flow summary.

## What this is not

Not a clone of Arkham's Ultra entity engine. Public sources cover known exchange wallets, sanctioned addresses, major protocols, and some high-profile individuals. They do not cover most deposit addresses or deep off-chain linking.

## CLI

```bash
node src/check-balances.js 0xYourAddress
```

## Site

Static site in `web/`. Deployed via the linked Vercel project.

Shows balances (native + common ERC-20s including DAI) with USD on Ethereum, Base, Arbitrum and Optimism. Attempts open eth-labels, recent Blockscout transfers, top counterparties, and flow summary. Same public sources as the CLI.

## Data sources

- Balances: public RPCs (publicnode) via eth_getBalance and ERC-20 balanceOf.
- Prices: CoinGecko free simple/price endpoint.
- Labels: eth-labels public JSON (runtime fetch) + local fallback.
- Transfers: Blockscout free public API.
- Counterparties and flows: derived from the transfer list.

## Current scope

- Ethereum, Base, Arbitrum, Optimism.
- Native + USDC/USDT/DAI/WETH with USD totals.
- Open label lookup.
- Recent transfers with labels.
- Top counterparties by count.
- Text flow summary (in/out).
- Improved loading states and layout on the site.

## Next

- Optional simple visual graph export.
- More tokens per chain.
- Bitcoin/Solana where free public data exists.
- Persistent local label cache.

Requires Node 18+ for the CLI. The site is static HTML and needs only a browser.

Every feature stays inside free, re-queryable sources. The coverage gap versus proprietary entity clustering remains explicit.
