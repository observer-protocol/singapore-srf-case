#!/usr/bin/env node
// Bundles the published engine for the browser. Node's crypto is replaced by build/shims/crypto.mjs
// (Ed25519 and SHA-256 from @noble, bundled); the other node: modules are stubbed to throw on use.
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const stub = join(here, 'shims/node-stub.mjs');
await build({
  entryPoints: [join(here, 'engine-entry.mjs')],
  bundle: true, format: 'iife', globalName: 'OPEngine', platform: 'browser', target: ['es2020'],
  alias: { 'node:crypto': join(here, 'shims/crypto.mjs'), 'node:fs': stub, 'node:os': stub, 'node:path': stub, 'node:zlib': stub, 'node:dns/promises': stub },
  inject: [join(here, 'shims/buffer-inject.mjs')],
  define: { 'process.env.NODE_ENV': '"production"', 'process.pid': '0' },  // process.pid is read at module load beside os.hostname()
  outfile: join(here, '../engine/policy-engine.browser.js'),
  legalComments: 'inline', logLevel: 'info',
});
