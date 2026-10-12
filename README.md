# Open Arkham

Free open-source multi-chain portfolio and transaction tracker.

Built from public RPCs, free price feeds, open label datasets, and free explorer fallbacks.

No proprietary intelligence. Every number comes from a source you can re-query.

## CLI

```bash
node src/check-balances.js 0xYourAddress
```

## Site

Static files in `web/`. Deployed at the Vercel project linked to this repo.

The site shows native and token balances with USD values, attempts to load open eth-labels, and fetches recent transfers from Blockscout public APIs. Same sources as the CLI. CORS on the public endpoints determines what loads in the browser.

## Data sources

- Balances: public RPCs.
- Prices: CoinGecko free endpoint.
- Labels: eth-labels (attempted remote) + local fallback.
- Transfers: Blockscout free API.

## Current scope

- CLI: full feature set.
- Site: balances with USD, label attempt, recent transfers.

## Next

- Improve label coverage and error handling on the site.
- Add counterparties and flow summary to the page.
- More chains.

Requires Node 18+ for CLI. Site is static and needs only a browser.
