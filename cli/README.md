# Re-run the verification outside the browser: six steps

Everything the page does in the browser can be repeated on a machine with Node 18 or later, using the
published verifier package and the files committed in this repository. SYNTHETIC records throughout;
the signing key is a DEMONSTRATION-KEY whose private half was never written.

1. **Get the register.** `data/register.json` is the publication form of the SRF register at tag
   `srf-register-accepted-v1` (commit `49540c2c082d524d1d5b7c7cee7d5c64d913f870`), from
   `op-policy-registers` branch `publication/srf-register` at `008af38d7d5879e9a44d9fbdfe5dd9c730fbefe0`.
   Its source locators point into the MAS Guidelines; the reader holds MAS's own document.

2. **Read the annex.** `data/ANNEX.md` is the measurement annex, copied byte for byte from
   `op-policy-engine` branch `session/srf-corpus` at `c65a3882b37b4a1f6643c3a1890041cf9bc3f721`
   (`policy-library/_corpus/srf-scale/ANNEX.md`). Every figure the page shows is a substring of it.

3. **Hold the records.** `data/exhibits/SRF-SCALE-SYN-*.json` are the seven signed exhibits and
   `data/exhibits/TAMPERED-records.json` the four committed tampered copies; `data/manifest.json`
   carries the run's key (`did:key:z6Mkg4RPWUC5T6d4pSXuYN4cRsBCcQNqBgV6BtUYnTRZBUTW`) and digests.

4. **Install the verifier at the pinned version, and check the tarball.**

       npm install --no-save @observer-protocol/policy-engine@1.0.0-rc.22
       shasum node_modules/@observer-protocol/policy-engine/../../observer-protocol-policy-engine-1.0.0-rc.22.tgz 2>/dev/null || npm pack @observer-protocol/policy-engine@1.0.0-rc.22 --dry-run --json | grep shasum

   Expected shasum: `97ae4964bfde548a25e769a5f634be936f122427` (also in `engine/SHASUM`; the same
   tarball is committed at `engine/`). Without a network, `--engine engine/package` in the next two
   steps uses the committed copy.

5. **Verify the seven exhibits.**

       node cli/verify.mjs --engine node_modules/@observer-protocol/policy-engine

   Expected: seven `PASS` lines, `7 / 7 exhibits verify against the manifest key`, exit 0.

6. **Run the tamper test.**

       node cli/tamper.mjs --engine node_modules/@observer-protocol/policy-engine

   Expected: four `FAILS AS EXPECTED` lines, each with the reason
   `eddsa-jcs-2022 signature does not verify against the issuer key`, and exit 0.

A reader who completes these six steps has checked the signed records with the published package and
the published key material alone. The full-corpus checks (42,188 records, the rebuild from corpus and
engine, parity) are the annex's sections 4 and 5; they need the corpus scripts at the ref in step 2,
which this repository does not carry.
