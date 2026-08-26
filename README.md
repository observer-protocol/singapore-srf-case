# Singapore SRF case explorer

**SYNTHETIC. DEMONSTRATION-KEY.** All data here is synthetic: no real individuals, accounts,
institutions, or incidents.

One static page, `index.html`, with no server and no network use: the MAS Shared Responsibility
Framework clause register (104 clauses, publication form), the Section 6 loss-allocation decision
table, seven signed synthetic records with the published verifier running in the browser, a tamper
demonstration, and the measurement annex's figures with their denominators. Open the file directly or
serve the directory from any static host.

| path | what |
|---|---|
| `index.html` | the page; built, self-contained |
| `data/register.json` | the register, publication form, tag `srf-register-accepted-v1` |
| `data/ANNEX.md` | the measurement annex; every figure on the page is a substring of it |
| `data/manifest.json`, `data/tamper-test.json` | the run's key and digests; the verifier's tamper-test output |
| `data/exhibits/` | seven signed exhibits and `TAMPERED-records.json`, the four committed tampered copies |
| `engine/` | `@observer-protocol/policy-engine@1.0.0-rc.22` npm tarball, its `SHASUM`, the extracted package, and `policy-engine.browser.js`, the browser bundle |
| `build/` | `bundle-engine.mjs` (esbuild; Node's `crypto` replaced by bundled @noble Ed25519 and SHA-256), `build-page.mjs`, template, styles, app |
| `cli/` | six steps to re-run verification and the tamper test outside the browser |
| `gate/` | the verification gate (Chrome via puppeteer-core) and its `RESULTS.md` |
| `screenshots/` | one screenshot per section, from the gate's file:// run |

Rebuild: `npm install` then `npm run build`; gate: `npm run gate` (needs a local Chrome).

Attribution: Boyd Cohen, Agentic Terminal / Observer Protocol.
