#!/usr/bin/env node
// Verifies the enforcement exhibits in data/enforcement-exhibits/ with the published verifier, outside the browser.
//   node cli/verify-enforcement.mjs [--engine <dir of an installed @observer-protocol/policy-engine>]
// Without --engine, the copy extracted from engine/observer-protocol-policy-engine-1.0.0-rc.22.tgz is used.
//
// Checks, in order:
//   1. every signed refusal in refusals.json verifies: the bytes are rebuilt by the package's own
//      signableFromRefusalRow -> signableFromRefusal -> refusalPayload, the key is decoded from
//      signature.signedBy (a did:key), and ed25519Verify decides;
//   2. every refusal's attestation.deciderArtifactDigest equals sha256 over the committed bytes of the
//      determination record it cites (SRF-DET-2026-000N cites SRF-SYN-2026-000N), and the outcome the
//      refusal carries is the outcome that record reached;
//   3. the out-of-scope claim (SRF-SYN-2026-0006, outcome out_of_scope) is among the refused, signed;
//   4. control: one field of each refusal is changed after the fact (amountRaw + 1) and the same
//      check must then FAIL, so a verifier that passes everything is caught.
// The determination records themselves carry signature.state "unsigned" and are reported as such,
// not verified: the policy-library run path signs nothing.
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const engineDir = argv.includes('--engine') ? argv[argv.indexOf('--engine') + 1] : join(here, '../engine/package');
const req = createRequire(join(engineDir, '/'));
const engine = req(engineDir), pkg = req('./package.json');
const dir = join(here, '../data/enforcement-exhibits');
const served = JSON.parse(readFileSync(join(dir, 'refusals.json'), 'utf8'));
const index = JSON.parse(readFileSync(join(dir, 'determinations/INDEX.json'), 'utf8'));
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
let failed = 0;
const check = (ok, line) => { if (!ok) failed++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${line}`); };
console.log(`verifier ${pkg.name}@${pkg.version}`);

function verifyRow(row) {
  const key = engine.decodeEd25519DidKey(row.signature?.signedBy);
  if (!key) return { ok: false, reason: 'signature.signedBy is not a decodable Ed25519 did:key' };
  let payload;
  try { payload = engine.refusalPayload(engine.signableFromRefusal(engine.signableFromRefusalRow(row))); }
  catch (e) { return { ok: false, reason: `payload could not be rebuilt: ${e.message}` }; }
  const data = Buffer.from(typeof payload === 'string' ? payload : JSON.stringify(payload), 'utf8');
  const ok = engine.ed25519Verify(Buffer.from(key.publicKey), data, Buffer.from(row.signature.value, 'base64'));
  return { ok, reason: ok ? 'signature ok' : 'ed25519 signature does not verify against signature.signedBy' };
}

// 1 + 2 + 4
const records = readdirSync(join(dir, 'determinations')).filter((f) => /^SRF-SYN-2026-\d+\.json$/.test(f)).sort();
check(records.length === 6, `six determination records committed: ${records.length}`);
for (const f of records) {
  const bytes = readFileSync(join(dir, 'determinations', f));
  const rec = JSON.parse(bytes.toString('utf8'));
  const idx = index.artifacts.find((a) => a.claimId === rec.claimId);
  check(idx && idx.sha256 === sha256(bytes), `${rec.claimId}  bytes match INDEX.json digest; outcome=${rec.mapping?.outcome}; signature.state=${rec.signature?.state} (reported, not verified)`);
}
check(served.refusals.length === 5 && served.count === 5, `five signed refusals served: ${served.refusals.length}`);
for (const row of served.refusals) {
  const r = verifyRow(row);
  check(row.signature?.state === 'signed' && r.ok, `${row.refusalId}  ${row.code}  ${row.signature?.payloadType}  signed by ${row.signature?.signedBy}: ${r.reason}`);
  const n = row.attestation?.decisionId?.match(/SRF-DET-2026-(\d+)$/)?.[1];
  const cited = n ? `SRF-SYN-2026-${n}` : undefined;
  const citedBytes = cited && records.includes(`${cited}.json`) ? readFileSync(join(dir, 'determinations', `${cited}.json`)) : undefined;
  const citedRec = citedBytes ? JSON.parse(citedBytes.toString('utf8')) : undefined;
  const digestOk = citedBytes && row.attestation.deciderArtifactDigest?.value === `sha256:${sha256(citedBytes)}`;
  const outcomeOk = citedRec && citedRec.mapping?.outcome === row.attestation.outcome;
  check(digestOk && outcomeOk, `${row.refusalId}  cites ${row.attestation?.decisionId} -> ${cited}: deciderArtifactDigest ${digestOk ? 'equals' : 'DOES NOT equal'} sha256 of the committed record; outcome ${row.attestation?.outcome} ${outcomeOk ? 'matches' : 'DOES NOT match'} the record`);
  const tampered = JSON.parse(JSON.stringify(row));
  tampered.attempted.amountRaw = String(Number(tampered.attempted.amountRaw) + 1);
  const t = verifyRow(tampered);
  check(!t.ok, `${row.refusalId}  control: amountRaw ${row.attempted.amountRaw} -> ${tampered.attempted.amountRaw} ${t.ok ? 'STILL VERIFIES (control failed)' : `correctly rejected: ${t.reason}`}`);
}
// 3
const oos = served.refusals.find((row) => row.attestation?.outcome === 'out_of_scope');
check(oos && oos.signature?.state === 'signed' && verifyRow(oos).ok && oos.attestation.decisionId === 'SRF-DET-2026-0006', `out-of-scope claim: ${oos ? `${oos.refusalId} cites ${oos.attestation.decisionId}, amount ${oos.attempted.amountRaw} (${oos.attempted.decimals} dp) ${oos.attempted.asset}, signed, verifies` : 'NO signed refusal carries outcome out_of_scope'}`);
console.log(failed === 0 ? 'every check passed' : `${failed} check(s) FAILED`);
process.exit(failed === 0 ? 0 : 1);
