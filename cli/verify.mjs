#!/usr/bin/env node
// Verifies the 7 exhibits in data/exhibits/ with the published verifier, outside the browser.
//   node cli/verify.mjs [--engine <dir of an installed @observer-protocol/policy-engine>]
// Without --engine, the copy extracted from engine/observer-protocol-policy-engine-1.0.0-rc.22.tgz is used.
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const engineDir = argv.includes('--engine') ? argv[argv.indexOf('--engine') + 1] : join(here, '../engine/package');
const req = createRequire(join(engineDir, '/'));
const engine = req(engineDir), pkg = req('./package.json');
const manifest = JSON.parse(readFileSync(join(here, '../data/manifest.json'), 'utf8'));
const key = engine.decodeEd25519DidKey(manifest.key.did);
if (!key) { console.error('manifest key is not a decodable Ed25519 did:key'); process.exit(2); }
const rawPub = Buffer.from(key.publicKey);
const dir = join(here, '../data/exhibits');
const files = readdirSync(dir).filter((f) => /^SRF-SCALE-SYN-\d+\.json$/.test(f)).sort();
let failed = 0;
console.log(`verifier ${pkg.name}@${pkg.version}; key ${manifest.key.did}`);
for (const f of files) {
  const ex = JSON.parse(readFileSync(join(dir, f), 'utf8'));
  const r = engine.verifyEddsaJcs2022(ex, rawPub);
  const vmOk = ex.proof?.verificationMethod === manifest.key.verificationMethod;
  if (!r.ok || !vmOk) failed++;
  console.log(`${r.ok && vmOk ? 'PASS' : 'FAIL'}  ${ex.claimId}  outcome=${ex.mapping?.outcome}  labels=${(ex.labels || []).join(',')}  ${r.ok ? 'signature ok' : r.reason}${vmOk ? '' : '  (signed by a key other than the manifest key)'}`);
}
console.log(`${files.length - failed} / ${files.length} exhibits verify against the manifest key`);
process.exit(failed === 0 && files.length === 7 ? 0 : 1);
