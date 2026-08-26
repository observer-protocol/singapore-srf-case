#!/usr/bin/env node
// Runs the published verifier over the four committed tampered copies (data/exhibits/TAMPERED-records.json).
// Every copy must FAIL, and the reason must be the signature reason recorded in data/tamper-test.json.
//   node cli/tamper.mjs [--engine <dir>]
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const engineDir = argv.includes('--engine') ? argv[argv.indexOf('--engine') + 1] : join(here, '../engine/package');
const req = createRequire(join(engineDir, '/'));
const engine = req(engineDir), pkg = req('./package.json');
const manifest = JSON.parse(readFileSync(join(here, '../data/manifest.json'), 'utf8'));
const rawPub = Buffer.from(engine.decodeEd25519DidKey(manifest.key.did).publicKey);
const tampered = JSON.parse(readFileSync(join(here, '../data/exhibits/TAMPERED-records.json'), 'utf8'));
const expected = JSON.parse(readFileSync(join(here, '../data/tamper-test.json'), 'utf8'));
let bad = 0;
console.log(`verifier ${pkg.name}@${pkg.version}; key ${manifest.key.did}`);
for (const c of tampered.cases) {
  const r = engine.verifyEddsaJcs2022(c.record, rawPub);
  const exp = expected.cases.find((e) => e.tamper === c.tamper);
  const asExpected = r.ok === false && exp && r.reason === exp.tampered.reason;
  if (!asExpected) bad++;
  console.log(`${asExpected ? 'FAILS AS EXPECTED' : 'UNEXPECTED'}  ${c.record.claimId}  ${c.tamper}: verifies=${r.ok}  reason="${r.reason}"`);
}
console.log(`${tampered.cases.length - bad} / ${tampered.cases.length} tampered copies fail with the recorded signature reason`);
process.exit(bad === 0 && tampered.cases.length === 4 ? 0 : 1);
