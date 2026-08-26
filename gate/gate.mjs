#!/usr/bin/env node
// Verification gate for index.html. Drives a local Chrome (puppeteer-core) over the built page twice:
//   1. from file://            2. from a static host (python3 -m http.server), with the network cut after load
// and checks: no request leaves the page after load; all 7 exhibits PASS; each of the 5 per-card tampers
// FAILS with the signature reason and Restore returns to PASS; the 4 committed tampered copies FAIL with the
// reason recorded in tamper-test.json; every annex figure on screen is a byte-substring of data/ANNEX.md;
// no console errors. Writes gate/RESULTS.md and screenshots/<section>.png (from the file:// run).
//   node gate/gate.mjs [--chrome <path>]
import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const argv = process.argv.slice(2);
const chrome = argv.includes('--chrome') ? argv[argv.indexOf('--chrome') + 1] : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const annex = readFileSync(join(root, 'data/ANNEX.md'), 'utf8');
const tamperTest = JSON.parse(readFileSync(join(root, 'data/tamper-test.json'), 'utf8'));
const SIG_REASON = 'eddsa-jcs-2022 signature does not verify against the issuer key';
const results = []; let failures = 0;
const check = (name, ok, detail) => { results.push({ name, ok, detail }); if (!ok) failures++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`); };

async function drive(page, label, { screenshots }) {
  const consoleErrors = []; page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); }); page.on('pageerror', (e) => consoleErrors.push(String(e)));
  const requests = []; page.on('request', (r) => requests.push(r.url()));
  return {
    consoleErrors, requests,
    async run(url, afterLoad) {
      await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
      await page.goto(url, { waitUntil: 'load' });
      await page.waitForSelector('#cards .card');
      const loadRequests = requests.length;
      if (afterLoad) await afterLoad();
      check(`${label}: page loaded`, true, url);
      check(`${label}: engine present`, await page.evaluate(() => typeof window.OPEngine?.verifyEddsaJcs2022 === 'function' && window.__caseExplorer?.engineVersion === '1.0.0-rc.22'));
      // section a
      const n = await page.$$eval('#register-table tbody tr', (r) => r.length); check(`${label}: register rows`, n === 104, `${n}`);
      await page.select('#f-tier', 'telco'); const nt = await page.$$eval('#register-table tbody tr:not([hidden])', (r) => r.length); check(`${label}: tier filter narrows`, nt > 0 && nt < 104, `${nt} of 104 at tier=telco`);
      await page.select('#f-tier', ''); await page.select('#f-holder', 'fi'); const nh = await page.$$eval('#register-table tbody tr:not([hidden])', (r) => r.length); check(`${label}: holder filter narrows`, nh > 0 && nh < 104, `${nh} of 104 at holder=fi`); await page.select('#f-holder', '');
      // section b
      const wf = await page.$$eval('#waterfall-table tbody tr', (r) => r.length); const ahb = await page.$$eval('#waterfall-table tbody tr.ahb', (r) => r.length);
      check(`${label}: waterfall rows`, wf === 36 && ahb === 2, `${wf} rows, ${ahb} account-holder-bears rows highlighted`);
      check(`${label}: affirmative-findings requirement beside the rows`, (await page.$eval('#waterfall .requirement', (e) => e.textContent)).includes('only on two affirmative findings'));
      // section c: verify all
      await page.click('#verify-all');
      const passes = await page.$$eval('#cards .card[data-verified="pass"]', (c) => c.length);
      check(`${label}: all 7 exhibits PASS`, passes === 7, `${passes} / 7`);
      const keyShown = await page.$$eval('#cards .card .result.pass', (rs) => rs.every((r) => r.textContent.includes('did:key:z6Mkg4RPWUC5T6d4pSXuYN4cRsBCcQNqBgV6BtUYnTRZBUTW')));
      check(`${label}: each PASS names the manifest key`, keyShown);
      // section d, per card: every tamper option on every card fails with the signature reason, restore passes
      const cards = await page.$$('#cards .card');
      const tamperKeys = await page.$eval('#cards .card select', (s) => [...s.options].map((o) => o.value));
      let tamperChecks = 0, tamperOk = 0;
      for (const card of cards) {
        for (const key of tamperKeys) {
          const sel = await card.$('select'); await sel.select(key);
          const [apply, restore] = await card.$$('.tamper-row button');
          await apply.click();
          const txt = await card.$eval('.result', (e) => e.textContent);
          const state = await card.evaluate((c) => c.dataset.verified);
          tamperChecks++; if (state === 'fail' && txt.includes(SIG_REASON)) tamperOk++; else console.log('   tamper did not fail as expected:', key, state, txt.slice(0, 160));
          await restore.click();
          const back = await card.evaluate((c) => c.dataset.verified);
          tamperChecks++; if (back === 'pass') tamperOk++; else console.log('   restore did not return to PASS:', key, back);
        }
      }
      check(`${label}: per-card tampers fail with the signature reason and restore`, tamperOk === tamperChecks, `${tamperOk} / ${tamperChecks} (7 cards x ${tamperKeys.length} tampers, fail then restore)`);
      // section d: committed tampered copies
      await page.click('#verify-tampered');
      const tcards = await page.$$eval('#tampered-cards .card', (cs) => cs.map((c) => ({ tamper: c.dataset.tamper, verified: c.dataset.verified, text: c.querySelector('.result').textContent })));
      const allFail = tcards.length === 4 && tcards.every((c) => c.verified === 'fail' && c.text.includes('verifier reason: ' + tamperTest.cases.find((x) => x.tamper === c.tamper).tampered.reason));
      check(`${label}: 4 committed tampers FAIL with the recorded signature reason`, allFail, tcards.map((c) => `${c.tamper}: ${c.verified}`).join('; '));
      // section e: byte-match against the annex
      const figs = await page.$$eval('[data-annex]', (es) => es.map((e) => ({ raw: e.dataset.annex, text: e.textContent })));
      const bad = figs.filter((f) => !annex.includes(f.raw) || f.text !== f.raw.replace(/`/g, '').replace(/\*\*/g, ''));
      check(`${label}: annex figures on screen byte-match ANNEX.md`, figs.length > 0 && bad.length === 0, `${figs.length - bad.length} / ${figs.length} elements; mismatches: ${bad.slice(0, 3).map((b) => JSON.stringify(b.raw)).join(', ') || 'none'}`);
      const headline = figs.some((f) => f.raw === '7,396 / 18,445 (40.1%)') && figs.some((f) => f.raw.startsWith('**SYNTHETIC. DEMONSTRATION-KEY.**'));
      check(`${label}: 40.1 headline row and the annex's synthetic-property statement present`, headline);
      const banner = await page.$eval('.banner', (e) => e.textContent);
      check(`${label}: banner line`, banner.includes('no real individuals, accounts, institutions, or incidents'));
      const tags = await page.$$eval('.tag', (ts) => ts.map((t) => t.textContent));
      check(`${label}: SYNTHETIC and DEMONSTRATION-KEY tags on every exhibit card`, await page.$$eval('#cards .card', (cs) => cs.every((c) => c.textContent.includes('SYNTHETIC') && c.textContent.includes('DEMONSTRATION-KEY'))), `${tags.length} tags on the page`);
      const footer = await page.$eval('#footer', (e) => e.textContent);
      check(`${label}: footer carries engine version, shasum, tag, commit, manifest digest, CLI link`, ['1.0.0-rc.22', '97ae4964bfde548a25e769a5f634be936f122427', 'srf-register-accepted-v1', '49540c2c082d524d1d5b7c7cee7d5c64d913f870', 'cli/README.md'].every((s) => footer.includes(s)) && await page.$eval('#footer a[href="cli/README.md"]', () => true));
      check(`${label}: no request left the page after load`, requests.length === loadRequests, `${requests.length} requests total, ${loadRequests} at load: ${requests.join(', ')}`);
      check(`${label}: no console errors`, consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
      if (screenshots) {
        mkdirSync(join(root, 'screenshots'), { recursive: true });
        await page.click('#verify-all'); await page.click('#verify-tampered');
        const first = await page.$('#cards .card'); await (await first.$('select')).select('outcome'); await (await first.$$('.tamper-row button'))[0].click();  // leave one card showing a tamper FAIL
        for (const [id, file] of [['header.top', 'a0-header'], ['#register', 'a-register'], ['#waterfall', 'b-waterfall'], ['#records', 'c-records'], ['#tamper', 'd-tamper'], ['#measurements', 'e-measurements'], ['#footer', 'f-footer']]) {
          const h = await page.$(id); await h.screenshot({ path: join(root, 'screenshots', `${file}.png`), captureBeyondViewport: true });
        }
        await (await first.$$('.tamper-row button'))[1].click();
      }
    },
  };
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: 'new', args: ['--allow-file-access-from-files', '--disable-features=Translate'] });
try {
  // 1. file://
  const p1 = await browser.newPage(); const d1 = await drive(p1, 'file://', { screenshots: true });
  await d1.run('file://' + join(root, 'index.html'));
  await p1.close();
  // 2. static host, network cut after load
  const server = spawn('python3', ['-m', 'http.server', '8765', '--bind', '127.0.0.1', '--directory', root], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 800));
  try {
    const p2 = await browser.newPage(); const d2 = await drive(p2, 'http (offline after load)', { screenshots: false });
    await d2.run('http://127.0.0.1:8765/index.html', async () => { await p2.setOfflineMode(true); const cdp = await p2.createCDPSession(); await cdp.send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 }); });
    await p2.close();
  } finally { server.kill(); }
} finally { await browser.close(); }

const md = ['# Verification gate results', '', `Run: ${new Date().toISOString()}; Chrome at \`${chrome}\`; page \`index.html\` (${readFileSync(join(root, 'index.html')).length} bytes).`, '', '| check | result | detail |', '|---|---|---|', ...results.map((r) => `| ${r.name} | ${r.ok ? 'PASS' : 'FAIL'} | ${(r.detail || '').replace(/\|/g, '\\|')} |`), '', `**${results.length - failures} / ${results.length} checks pass.** ${failures === 0 ? 'GATE GREEN.' : 'GATE RED.'}`, ''];
writeFileSync(join(here, 'RESULTS.md'), md.join('\n'));
console.log(`\n${results.length - failures} / ${results.length} checks pass; gate/RESULTS.md written`);
process.exit(failures === 0 ? 0 : 1);
