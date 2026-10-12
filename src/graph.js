// Simple text graph of flows from transfers.
// Shows connections without external libraries.

import { lookupLabel } from './labels.js';

export function printFlowGraph(transfers, ownAddress) {
  if (!transfers.length) return;
  console.log('  Flow summary:');
  const own = ownAddress.toLowerCase();
  const edges = new Set();

  for (const t of transfers) {
    const from = t.from.toLowerCase();
    const to = t.to.toLowerCase();
    if (from === own || to === own) {
      const other = from === own ? to : from;
      const dir = from === own ? 'out' : 'in';
      const label = lookupLabel(other) || other.slice(0, 10);
      edges.add(`${dir} -> ${label}`);
    }
  }

  for (const edge of edges) {
    console.log(`    ${edge}`);
  }
}
