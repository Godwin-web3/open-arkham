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

Current site shows native balances plus common ERC-20s on Ethereum and Base, and a local open label if the address matches. Same public RPC calls as the CLI. Full remote labels and transfers can be added where CORS permits.

## Data sources

- Balances: public RPCs.
- Prices: CoinGecko (CLI).
- Labels: open datasets (CLI loads remote; site uses local subset).
- Transfers: RPC + Blockscout (CLI).

## Current scope

- CLI: balances, USD, labels, transfers, counterparties, flow summary.
- Site: native + token balances, local labels.

## Next

- Port remote label fetch and transfers to the site where CORS allows.
- Deploy static site.
- More chains and tokens.

Requires Node 18+ for CLI. Site needs only a browser.
