// Sync the FalcomPlot viewer core from its canonical home.
//
// The engine lives in the FalcomPlot repo (js/js/); this site embeds
// it via the two Svelte wrappers in src/lib/falcomplot/. Everything
// else in that directory is a GENERATED copy — edit it in FalcomPlot
// and re-run:
//
//   node scripts/sync-falcomplot.mjs [path-to-FalcomPlot-checkout]
//
// Default source: ../FalcomPlot (sibling checkout).

import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(process.argv[2] ?? resolve(HERE, '../../FalcomPlot'), 'js/js');
const DEST = resolve(HERE, '../src/lib/falcomplot');

const CORE_FILES = [
  'animationController.js',
  'config.js',
  'dataLoader.js',
  'geometry.js',
  'inputHandler.js',
  'logger.js',
  'mountFalcomPlot.js',
  'overviewRenderer.js',
  'renderer.js',
  'toleranceChecker.js',
  'viewManager.js',
];

const HEADER =
  '// GENERATED — synced from FalcomPlot (js/js/). Do not edit here;\n' +
  '// edit in the FalcomPlot repo and run: node scripts/sync-falcomplot.mjs\n';

if (!existsSync(SRC)) {
  console.error(`FalcomPlot core not found at ${SRC}`);
  process.exit(1);
}

for (const f of CORE_FILES) {
  const from = resolve(SRC, f);
  if (!existsSync(from)) {
    console.error(`missing in FalcomPlot: ${f}`);
    process.exit(1);
  }
  const body = readFileSync(from, 'utf8');
  writeFileSync(resolve(DEST, f), HEADER + body);
  console.log(`synced ${f}`);
}
console.log('done — Svelte wrappers (FalcomPlot.svelte, FalcomPlotControls.svelte) stay local.');
