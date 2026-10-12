// Aggregate top counterparties from a list of transfers.
// Counts frequency and applies open labels.

import { lookupLabel } from './labels.js';

export function getTopCounterparties(transfers, ownAddress, limit = 5) {
  const counts = new Map();
  const own = ownAddress.toLowerCase();

  for (const t of transfers) {
    const other = t.from.toLowerCase() === own ? t.to : t.from;
    if (other.toLowerCase() === own) continue;
    counts.set(other, (counts.get(other) || 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([addr, count]) => ({
      address: addr,
      count,
      label: lookupLabel(addr),
    }));
}
