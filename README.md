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

Static site in `web/`. Deployed via the linked Vercel project (open-arkham).

Shows balances with USD on Ethereum, Base, Arbitrum and Optimism. Open eth-labels, recent Blockscout transfers, top counterparties, and flow summary. Same public sources as the CLI.

## Data sources

- Balances: public RPCs (publicnode) via eth_getBalance and ERC-20 balanceOf.
- Prices: CoinGecko free simple/price endpoint.
- Labels: eth-labels public JSON (runtime) + local fallback.
- Transfers: public RPC logs with Blockscout free API fallback.
- Counterparties and flows: derived from the transfer list.

## Current scope (complete for public-data thesis)

- Chains: Ethereum, Base, Arbitrum, Optimism.
- Tokens: Native ETH + USDC, USDT, DAI, WETH with USD totals.
- Open label lookup from eth-labels.
- Recent transfers with labels on from/to.
- Top counterparties by transfer count with labels.
- Text flow summary of in/out connections.
- CLI and static site both functional.
- Explicit boundary: no proprietary entity clustering.

## Run

CLI: `node src/check-balances.js 0xAddress`

Site: open the deployed Vercel URL or `web/index.html` locally.

Requires Node 18+ for the CLI. The site needs only a browser.

Every feature stays inside free, re-queryable sources. The coverage gap versus proprietary intelligence remains explicit and intentional.
