# Open Arkham

Free open-source multi-chain portfolio and transaction tracker.

Built from public RPCs, free price feeds, open label datasets, and free explorer fallbacks.

No proprietary intelligence. Every number comes from a source you can re-query.

## CLI

```bash
node src/check-balances.js 0xYourAddress
```

## Site

Static files in `web/`. Open `web/index.html` in a browser.

The site now shows native and common token balances on Ethereum and Base with USD values from CoinGecko free endpoint, plus a local open label if the address matches. Same public sources as the CLI.

## Data sources

- Balances: public RPCs.
- Prices: CoinGecko free endpoint (CLI and site).
- Labels: open datasets (CLI loads remote; site uses local subset).
- Transfers: RPC + Blockscout (CLI).

## Current scope

- CLI: full balances, USD, labels, transfers, counterparties, flow summary.
- Site: native + token balances with USD, local labels.

## Next

- Port remote labels and transfers to the site where CORS allows.
- Deploy the static site.
- More chains and tokens.

Requires Node 18+ for CLI. Site needs only a browser.
