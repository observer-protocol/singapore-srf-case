#!/usr/bin/env node
// Assembles index.html: template + styles + app + the data (register projection, waterfall, exhibits,
// tampered copies, manifest, and the annex's figures extracted VERBATIM) + the browser engine bundle.
// Every figure the page shows comes from data/ANNEX.md or data/manifest.json; nothing is recomputed here.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { strict as assert } from 'node:assert';
const here = dirname(fileURLToPath(import.meta.url));
const P = (p) => join(here, p);
const read = (p) => readFileSync(P(p), 'utf8');
const sha256 = (b) => createHash('sha256').update(b).digest('hex');

// ---- register (publication form) ------------------------------------------------------------
const registerBytes = readFileSync(P('../data/register.json'));
const register = JSON.parse(registerBytes.toString('utf8'));
assert.equal(register.clauses.length, 104, 'register must carry 104 clauses');
assert.equal(register.domain, 'srf'); assert.equal(register.register_version, '0.1.0');

// ---- annex ----------------------------------------------------------------------------------
const annex = read('../data/ANNEX.md');
const lines = annex.split('\n');
const sectionLines = (start, end) => { const a = lines.findIndex((l) => l.startsWith(start)); const b = end ? lines.findIndex((l, i) => i > a && l.startsWith(end)) : lines.length; assert(a >= 0, `annex section ${start} not found`); return lines.slice(a + 1, b < 0 ? lines.length : b); };
const parseTables = (ls) => { const tables = []; let cur = null; for (const l of ls) { if (l.startsWith('|')) { if (!cur) { cur = []; tables.push(cur); } if (/^\|\s*-{2,}/.test(l)) continue; cur.push(l.slice(1, l.endsWith('|') ? -1 : undefined).split('|').map((c) => c.trim())); } else cur = null; } return tables; };
const paragraph = (ls, startsWith) => { const l = ls.find((x) => x.startsWith(startsWith)); assert(l, `annex paragraph "${startsWith}" not found`); return l; };
const first = (ls, re) => { const l = ls.find((x) => re.test(x)); assert(l, `annex line ${re} not found`); return l; };

// tier / duty holder: annex section 1.1 rows `| tier | holder | clause | ...`
const s11 = sectionLines('### 1.1', '### 1.2');
const t11 = parseTables(s11)[0];
assert.deepEqual(t11[0], ['tier', 'holder', 'clause', 'paths', 'product', 'method', 'claims']);
const tierHolder = new Map();
for (const row of t11.slice(1)) { const m = /^`([^`]+)`$/.exec(row[2]); assert(m, `clause cell ${row[2]}`); tierHolder.set(m[1], { tier: row[0], holder: row[1] }); }
assert.equal(tierHolder.size, 42, 'annex 1.1 lists 42 clauses');
for (const id of tierHolder.keys()) assert(register.clauses.some((c) => c.id === id), `annex clause ${id} is not in the register`);

const clauses = register.clauses.map((c) => ({ id: c.id, assertion: c.assertion, source_locator: c.source_locator, disposition: c.disposition, tier: tierHolder.get(c.id)?.tier ?? null, holder: tierHolder.get(c.id)?.holder ?? null }));

// waterfall: the Section 6 decision table
const wf = register.clauses.find((c) => c.id === 'srf/6.7/outcome');
assert(wf && wf.evaluate.op === 'decision_table');
assert.equal(wf.evaluate.rows.length, 36); assert.equal(wf.evaluate.cross_product, 36);
const seen = new Set(wf.evaluate.rows.map((r) => `${r.match.scope}|${r.match.fi_tier}|${r.match.telco_tier}`)); assert.equal(seen.size, 36, 'rows are distinct');
const ahb = wf.evaluate.rows.filter((r) => r.outcome === 'account_holder_bears'); assert.equal(ahb.length, 2, 'two account-holder-bears rows');
const waterfall = { id: wf.id, source_locator: wf.source_locator, text: wf.text, assertion: wf.assertion, disposition: wf.disposition, disposition_basis: wf.disposition_basis, depends_on: wf.depends_on, inputs: wf.evaluate.inputs.map((i) => ({ name: i.name, clause: i.expr.id, declared_domain: i.declared_domain })), cross_product: wf.evaluate.cross_product, rows: wf.evaluate.rows.map((r) => ({ match: r.match, outcome: r.outcome, note: r.note ?? null, decided_on_absence: r.$decided_on_absence ?? null })) };
const tierClauses = Object.fromEntries(['srf/7.1.1/relevant-claim', 'srf/6/fi-tier', 'srf/6.4/telco-bears', 'srf/6.5/fi-first'].map((id) => { const c = register.clauses.find((x) => x.id === id); assert(c, id); return [id, { id, assertion: c.assertion, source_locator: c.source_locator, disposition: c.disposition }]; }));

// exhibits, tampered copies, manifest, tamper-test
const exDir = P('../data/exhibits');
const exhibitFiles = readdirSync(exDir).filter((f) => /^SRF-SCALE-SYN-\d{6}\.json$/.test(f)).sort();
assert.equal(exhibitFiles.length, 7, 'seven exhibits');
const exhibits = exhibitFiles.map((f) => { const b = readFileSync(join(exDir, f)); return { file: f, sha256: sha256(b), record: JSON.parse(b.toString('utf8')) }; });
for (const e of exhibits) { assert.deepEqual(e.record.labels, ['SYNTHETIC', 'DEMONSTRATION-KEY']); assert.equal(e.record.synthetic, true); }
const tamperedBytes = readFileSync(join(exDir, 'TAMPERED-records.json'));
const tampered = JSON.parse(tamperedBytes.toString('utf8'));
assert.equal(tampered.cases.length, 4);
const manifestBytes = readFileSync(P('../data/manifest.json'));
const manifest = JSON.parse(manifestBytes.toString('utf8'));
assert.deepEqual(manifest.labels, ['SYNTHETIC', 'DEMONSTRATION-KEY']);
assert.equal(manifest.counts.exhibits, 7);
const tamperTest = JSON.parse(read('../data/tamper-test.json'));
assert.equal(tamperTest.cases.length, 4);

// annex figures, verbatim cells. The page renders these strings; the gate checks each against the file.
const head = lines.slice(0, lines.findIndex((l) => l.startsWith('## 1.')));
const s2 = sectionLines('## 2.', '## 3.'), s3 = sectionLines('## 3.', '### 3.1'), s31 = sectionLines('### 3.1', '## 4.'), s4 = sectionLines('## 4.', '## 5.'), s5 = sectionLines('## 5.', '## 6.'), s6 = sectionLines('## 6.', '## 7.'), s7 = sectionLines('## 7.', '## 8.'), s1 = sectionLines('## 1.', '### 1.1');
const t2 = parseTables(s2), t3 = parseTables(s3), t4 = parseTables(s4), t5 = parseTables(s5), t7 = parseTables(s7), t31 = parseTables(s31), t1 = parseTables(s1);
assert.equal(t2[0][0][0], 'outcome'); assert.equal(t2[0].length, 6);
const annexData = {
  title: lines[0].replace(/^# /, ''),
  statement: paragraph(head, '**SYNTHETIC. DEMONSTRATION-KEY.**'),
  denominators: paragraph(head, 'Every percentage carries'),
  n: paragraph(s1, '**N = 42,188'),
  populations: t1[0],
  outcomes: t2[0],
  scopeUndecided: paragraph(s2, 'Claims whose scope could not be decided'),
  byPopulation: t2[1],
  tierReached: t2[2],
  headline: { heading: first(lines, /^## 3\. /).replace(/^## 3\. /, ''), definition: paragraph(s3, '**Definition.**'), rows: t3[0], stoppedAt: paragraph(s3, 'Stopped at the FI tier'), waitingIntro: paragraph(s3, 'What the open duty clauses'), waitingOn: t3[1], dutyIntro: paragraph(s3, 'Which waterfall duty was open'), dutyOpen: t3[2], byPopulation: paragraph(s3, 'By population:') },
  dangerous: { heading: first(lines, /^### 3\.1 /).replace(/^### 3\.1 /, ''), intro: paragraph(s31, 'The headline counts claims'), rows: t31[0] },
  verification: { intro: paragraph(s4, 'Verifier:'), rows: t4[0], after: paragraph(s4, 'Verification findings:') },
  tamper: { intro: paragraph(s5, 'One field modified'), rows: t5[0], verdict: paragraph(s5, '**ALL 4 TAMPERED') },
  custody: paragraph(s6, 'Ephemeral Ed25519 key'),
  files: t7[0],
};
assert.equal(annexData.headline.rows.length, 4); assert.equal(annexData.tamper.rows.length, 5); assert.equal(annexData.verification.rows.length, 11); // header + 10 checks

// ---- footer facts -------------------------------------------------------------------------------
const shasumLine = read('../engine/SHASUM').trim();
const enginePkg = JSON.parse(read('../engine/package/package.json'));
const engineBundle = read('../engine/policy-engine.browser.js');
assert.equal(enginePkg.version, '1.0.0-rc.22');
assert(engineBundle.includes('"1.0.0-rc.22"'), 'bundle carries the version stamp');
const footer = {
  engine: { name: enginePkg.name, version: enginePkg.version, tarball: 'observer-protocol-policy-engine-1.0.0-rc.22.tgz', shasum: shasumLine.split(/\s+/)[0], bundleSha256: sha256(engineBundle) },
  register: { tag: manifest.register.accepted_tag, tagCommit: '49540c2c082d524d1d5b7c7cee7d5c64d913f870', publicationRef: 'op-policy-registers publication/srf-register 008af38d7d5879e9a44d9fbdfe5dd9c730fbefe0', publicationSha256: sha256(registerBytes), signedSha256: manifest.register.sha256, clausesJsonSha256: manifest.register.clauses_json_sha256, version: register.register_version, domain: register.domain },
  manifest: { sha256: sha256(manifestBytes), created: manifest.created },
  tamperedSetSha256: sha256(tamperedBytes),
  annexSha256: sha256(Buffer.from(annex, 'utf8')),
  corpusRef: 'op-policy-engine session/srf-corpus c65a3882b37b4a1f6643c3a1890041cf9bc3f721, policy-library/_corpus/srf-scale/',
  shims: { ed25519: '@noble/ed25519 3.1.0', hashes: '@noble/hashes 2.3.0', buffer: 'buffer 6.0.3', esbuild: 'esbuild 0.21.5' },
  attribution: 'Boyd Cohen, Agentic Terminal / Observer Protocol',

};

const data = { clauses, tierHolderSource: 'ANNEX.md section 1.1', waterfall, tierClauses, exhibits, tampered, manifest, tamperTest, annex: annexData, footer };
const json = JSON.stringify(data).replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
let html = read('page.html');
const sub = (k, v) => { assert(html.includes(k), `placeholder ${k}`); html = html.replace(k, () => v); };
sub('/*__CSS__*/', read('style.css'));
sub('/*__DATA__*/', json);
sub('/*__ENGINE__*/', engineBundle);
sub('/*__APP__*/', read('app.js'));
for (const [k, v] of Object.entries({ ENGINE_VERSION: footer.engine.version, ENGINE_SHASUM: footer.engine.shasum, ENGINE_TARBALL: footer.engine.tarball, BUNDLE_SHA256: footer.engine.bundleSha256, REGISTER_TAG: footer.register.tag, REGISTER_TAG_COMMIT: footer.register.tagCommit, REGISTER_PUBLICATION_REF: footer.register.publicationRef, REGISTER_PUBLICATION_SHA256: footer.register.publicationSha256, REGISTER_SIGNED_SHA256: footer.register.signedSha256, MANIFEST_SHA256: footer.manifest.sha256, MANIFEST_CREATED: footer.manifest.created, TAMPERED_SHA256: footer.tamperedSetSha256, ANNEX_SHA256: footer.annexSha256, CORPUS_REF: footer.corpusRef, KEY_DID: manifest.key.did, ATTRIBUTION: footer.attribution, SHIM_ED25519: footer.shims.ed25519, SHIM_HASHES: footer.shims.hashes, SHIM_BUFFER: footer.shims.buffer, SHIM_ESBUILD: footer.shims.esbuild })) { while (html.includes(`{{${k}}}`)) html = html.replace(`{{${k}}}`, () => v); }
assert(!/\{\{[A-Z_]+\}\}/.test(html), 'unfilled placeholder');
assert(!html.includes('—'), 'no em dashes in the page');
writeFileSync(P('../index.html'), html);
console.log(`index.html written: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB; clauses ${clauses.length}; tier/holder for ${tierHolder.size}; waterfall rows ${waterfall.rows.length}; exhibits ${exhibits.length}; tampered ${tampered.cases.length}`);
