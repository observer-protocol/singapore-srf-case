# Singapore SRF case

**SYNTHETIC. DEMONSTRATION-KEY.**

This repository holds the measurement artifacts behind a contribution to the BuildFin.ai working group
on SAFR v1.0 (Safeguards for Agentic Finance at Runtime): an encoding of the Monetary Authority of
Singapore's Guidelines on Shared Responsibility Framework as a clause register, a synthetic claim
corpus run over that register, and the signed records and published verifier a reader uses to check
the results without the producing party's cooperation. All data here is synthetic: no real
individuals, accounts, institutions, or incidents appear anywhere in it, and no figure is a
measurement of real-world claims. The repository describes correspondence with the SAFR white paper
(v1.0, July 2026) for the purpose of contributing to the working group; it makes no conformance,
certification, or endorsement claim, and SAFR is an industry reference approach, not regulatory
guidance.

## The artifacts, as the contribution's section 6 numbers them

| # | artifact | in this repository |
|---|---|---|
| 1 | The SRF Guidelines source reference, pinned by the SHA-256 digest recorded in the published sources manifest; the reader holds MAS's original document | Not a file here. The manifest is `policy-library/mas-srf-2024/SOURCES.md` at tag `srf-register-accepted-v1` in `observer-protocol/op-policy-engine`; the Guidelines PDF digest it records is `bc5f937a1baffac0758532b3ae95c9f7cc4b7db5ba9d2c2d7b5a5124892af6a1` |
| 2 | The register at tag `srf-register-accepted-v1`, publication form, with per-clause source locators and the full ambiguity register | `data/register.json` |
| 3 | The measurement annex: every figure with its denominator, the corpus construction parameters, the outcome distributions | `data/ANNEX.md` |
| 4 | Sample records and the four tampered copies, SYNTHETIC and DEMONSTRATION-KEY labelled, with the run manifest carrying the demonstration public key against which every record verifies | `data/exhibits/` (seven signed exhibits, `TAMPERED-records.json`), `data/manifest.json`, `data/tamper-test.json` |
| 5 | The verifier: `npm install @observer-protocol/policy-engine@1.0.0-rc.22` (MIT-licensed; the verification code is itself inspectable) | `engine/`: the npm tarball, its `SHASUM`, the extracted package, and `policy-engine.browser.js`, the same package bundled for the browser |
| 6 | The scripts to re-run verification and the tamper test end to end | `cli/verify.mjs`, `cli/tamper.mjs`, with `cli/README.md` |
| 7 | The enforcement exhibits: six v7 determination records, one per Section 6 outcome scenario, and the five signed payment refusals issued when a payment cited a determination whose outcome the mandate did not treat as authorising, the out-of-scope claim among them | `data/enforcement-exhibits/` with `MANIFEST.json`; `cli/verify-enforcement.mjs` |
| 8 | An in-browser case explorer performing the same verification and tamper demonstration locally in the reader's browser, no server involved | `index.html` at the repository root |

## Six steps a reader performs

Node 18 or later; no server, no account, no network beyond the npm install in step 4. The full text
of each step is in `cli/README.md`.

1. **Get the register.** `data/register.json` is the publication form of the register at tag
   `srf-register-accepted-v1`; its source locators point into the MAS Guidelines.
2. **Read the annex.** `data/ANNEX.md`; every figure the page shows is a substring of it.
3. **Hold the records.** `data/exhibits/SRF-SCALE-SYN-*.json`, `data/exhibits/TAMPERED-records.json`,
   and `data/manifest.json` with the run's key, `did:key:z6Mkg4RPWUC5T6d4pSXuYN4cRsBCcQNqBgV6BtUYnTRZBUTW`.
4. **Install the verifier at the pinned version and check the tarball.**
   `npm install --no-save @observer-protocol/policy-engine@1.0.0-rc.22`; expected shasum
   `97ae4964bfde548a25e769a5f634be936f122427`, also in `engine/SHASUM`. Offline, pass
   `--engine engine/package` in the next two steps to use the committed copy.
5. **Verify the seven exhibits.** `node cli/verify.mjs --engine node_modules/@observer-protocol/policy-engine`;
   expected seven `PASS` lines and `7 / 7 exhibits verify against the manifest key`.
6. **Run the tamper test.** `node cli/tamper.mjs --engine node_modules/@observer-protocol/policy-engine`;
   expected four `FAILS AS EXPECTED` lines, each with the reason
   `eddsa-jcs-2022 signature does not verify against the issuer key`.

The enforcement exhibits (artifact 7) have their own check, `node cli/verify-enforcement.mjs`, described
at the end of `cli/README.md`.

**In the browser.** `index.html`, the case explorer, is the same check without a terminal: one static
page, no server and no network use, carrying the register, the Section 6 decision table, the seven
exhibits verified in the browser by the bundled copy of the same package, the tamper demonstration,
and the annex figures with their denominators. Open the file directly or serve the directory from any
static host. The npm package and this page are the two verification paths; no hosted service is
involved.

## Provenance

| what | ref |
|---|---|
| register acceptance | tag `srf-register-accepted-v1`, commit `49540c2c082d524d1d5b7c7cee7d5c64d913f870` (`observer-protocol/op-policy-engine`) |
| register, publication form | `observer-protocol/op-policy-registers`, branch `publication/srf-register`, commit `008af38d7d5879e9a44d9fbdfe5dd9c730fbefe0` |
| verifier | `@observer-protocol/policy-engine@1.0.0-rc.22`, tarball shasum `97ae4964bfde548a25e769a5f634be936f122427` |
| corpus, annex, exhibits, enforcement exhibits | `observer-protocol/op-policy-engine`, branch `session/srf-corpus`, commit `c65a3882b37b4a1f6643c3a1890041cf9bc3f721` (`policy-library/_corpus/srf-scale/` and `policy-library/mas-srf-2024/out/`) |
| register digest the records cite | `c27fccb68b7aaae2a13724ac9e0a873f87cc85565e77c19096339666f08bf033` |

## Layout

| path | what |
|---|---|
| `index.html` | the case explorer; built, self-contained |
| `data/` | register, annex, manifest, tamper-test output, `exhibits/`, `enforcement-exhibits/` |
| `engine/` | the verifier package at the pinned version, and its browser bundle |
| `cli/` | the verification scripts and their six-step README |
| `build/` | page and bundle builders (`npm run build`) |
| `gate/` | the verification gate over the page and its `RESULTS.md` (`npm run gate`; needs a local browser binary at the path in `gate/gate.mjs`) |
| `screenshots/` | one screenshot per section, from the gate's file:// run |
| `contribution/` | the contribution document, added at submission |
| `LICENSE` | MIT for the code and scripts; `data/` contents are synthetic demonstration artifacts |

Attribution: Boyd Cohen, Agentic Terminal / Observer Protocol.
