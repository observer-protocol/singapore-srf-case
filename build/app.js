(function () {
  'use strict';
  const D = JSON.parse(document.getElementById('data').textContent);
  const E = window.OPEngine;
  const $ = (s, r) => (r || document).querySelector(s);
  const el = (tag, attrs, ...kids) => { const n = document.createElement(tag); for (const [k, v] of Object.entries(attrs || {})) { if (k === 'class') n.className = v; else if (k === 'text') n.textContent = v; else if (k === 'html') n.innerHTML = v; else n.setAttribute(k, v); } for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(String(k))); return n; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // annex markdown inline: `code` and **bold** only; everything else verbatim
  const md = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const annexNode = (tag, raw, cls) => { const n = el(tag, { class: cls || '' }); n.innerHTML = md(raw); n.dataset.annex = raw; return n; };
  const fmtKey = (did) => did;

  // ---- key ---------------------------------------------------------------------------------
  const KEY = E.decodeEd25519DidKey(D.manifest.key.did);
  if (!KEY) throw new Error('manifest key is not a decodable Ed25519 did:key');
  const RAW_PUB = KEY.publicKey;
  const verifyRecord = (rec) => {
    const r = E.verifyEddsaJcs2022(rec, RAW_PUB);
    const vm = rec && rec.proof ? rec.proof.verificationMethod : undefined;
    const keyMatches = vm === D.manifest.key.verificationMethod;
    return { ok: r.ok && keyMatches, sigOk: r.ok, reason: r.reason, keyMatches, verificationMethod: vm };
  };
  const renderResult = (box, v, extra) => {
    box.className = 'result ' + (v.ok ? 'pass' : 'fail');
    box.textContent = '';
    if (v.ok) {
      box.append(el('strong', { text: 'PASS' }), ' verified against ', el('code', { text: D.manifest.key.did }), ' (the manifest key: SYNTHETIC, DEMONSTRATION-KEY) with ', el('code', { text: '@observer-protocol/policy-engine@' + E.CORE_VERSION }), '; proof.verificationMethod matches the manifest.');
    } else {
      box.append(el('strong', { text: 'FAIL' }), ' against ', el('code', { text: D.manifest.key.did }), ' with ', el('code', { text: '@observer-protocol/policy-engine@' + E.CORE_VERSION }));
      box.append(el('span', { class: 'reason', text: 'verifier reason: ' + v.reason }));
      if (v.sigOk && !v.keyMatches) box.append(el('span', { class: 'reason', text: 'proof.verificationMethod is not the manifest key: ' + v.verificationMethod }));
    }
    if (extra) box.append(extra);
  };

  // ---- a. register -----------------------------------------------------------------------
  (function register() {
    const tbody = $('#register-table tbody');
    const dispSel = $('#f-disp');
    for (const d of [...new Set(D.clauses.map((c) => c.disposition))].sort()) dispSel.append(el('option', { value: d, text: d }));
    const rows = D.clauses.map((c) => { const tr = el('tr', {}, el('td', {}, el('code', { text: c.id })), el('td', { text: c.assertion }), el('td', { text: c.source_locator }), el('td', { text: c.disposition }), el('td', { class: c.tier ? '' : 'dim', text: c.tier || 'not listed' }), el('td', { class: c.holder ? '' : 'dim', text: c.holder || 'not listed' })); tr.dataset.id = c.id; return { c, tr }; });
    for (const r of rows) tbody.append(r.tr);
    const apply = () => {
      const t = $('#f-tier').value, h = $('#f-holder').value, d = dispSel.value, q = $('#f-text').value.trim().toLowerCase();
      let n = 0;
      for (const { c, tr } of rows) {
        const okT = !t || (t === '__none' ? !c.tier : c.tier === t);
        const okH = !h || (h === '__none' ? !c.holder : c.holder === h);
        const okD = !d || c.disposition === d;
        const okQ = !q || (c.id + ' ' + c.assertion + ' ' + c.source_locator).toLowerCase().includes(q);
        const show = okT && okH && okD && okQ; tr.hidden = !show; if (show) n++;
      }
      $('#f-count').textContent = n + ' of ' + D.clauses.length + ' clauses shown';
    };
    for (const id of ['#f-tier', '#f-holder', '#f-disp', '#f-text']) $(id).addEventListener('input', apply);
    apply();
  })();

  // ---- b. waterfall ------------------------------------------------------------------------
  (function waterfall() {
    const W = D.waterfall;
    const head = $('#waterfall-head');
    head.append(el('p', { class: 'meta' }, 'Clause ', el('code', { text: W.id }), ' (', W.source_locator, '), disposition ', el('code', { text: W.disposition }), '. Inputs: ', ...W.inputs.flatMap((i, k) => [k ? '; ' : '', el('code', { text: i.name }), ' = ', el('code', { text: i.clause }), ' over {', i.declared_domain.join(', '), '}']), '. Cross product ', String(W.cross_product), ', rows ', String(W.rows.length), ': every combination has a row, none defaults.'));
    head.append(el('p', { class: 'meta' }, el('em', { text: 'Source text: ' }), W.text));
    const req = el('div', { class: 'requirement' });
    req.append(el('p', {}, el('strong', { text: 'The two account-holder-bears rows (highlighted below) and the affirmative-findings requirement, in the register\'s own words: ' })));
    req.append((() => { const p = el('p'); p.innerHTML = md(W.assertion); return p; })());
    req.append((() => { const p = el('p'); p.innerHTML = '<em>Disposition basis: </em>' + md(W.disposition_basis); return p; })());
    head.append(req);
    const tbody = $('#waterfall-table tbody');
    for (const r of W.rows) {
      const isAhb = r.outcome === 'account_holder_bears';
      const notes = [r.note, r.decided_on_absence ? 'decided on absence: ' + r.decided_on_absence : null].filter(Boolean);
      const tr = el('tr', { class: isAhb ? 'ahb' : '' }, el('td', { class: 'tok', text: r.match.scope }), el('td', { class: 'tok', text: r.match.fi_tier }), el('td', { class: 'tok', text: r.match.telco_tier }), el('td', { class: 'tok', text: r.outcome }), el('td', { class: 'note', text: notes.join(' ') }));
      if (isAhb) { tr.setAttribute('aria-label', 'account holder bears row'); tr.dataset.ahb = '1'; }
      tbody.append(tr);
    }
  })();

  // ---- c + d. records and tamper -------------------------------------------------------------
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const flipLastChar = (s) => s.slice(0, -1) + (s.endsWith('1') ? '2' : '1');
  const TAMPERS = [
    { key: 'outcome', label: 'outcome token changed (mapping.outcome)', apply: (r) => { const before = r.mapping.outcome; const after = before === 'fi_bears' ? 'telco_bears' : 'fi_bears'; r.mapping.outcome = after; return 'mapping.outcome: ' + before + ' -> ' + after; } },
    { key: 'duty', label: 'one duty status changed (records["srf/4.2.1/cooling-off"].result)', apply: (r) => { const e = r.records['srf/4.2.1/cooling-off']; const before = e.result; const after = before === 'satisfied' ? 'breach' : 'satisfied'; e.result = after; return 'records["srf/4.2.1/cooling-off"].result: ' + JSON.stringify(before) + ' -> ' + JSON.stringify(after); } },
    { key: 'claimId', label: 'claim id changed (claimId)', apply: (r) => { const before = r.claimId; r.claimId = 'SRF-SCALE-SYN-999999'; return 'claimId: ' + before + ' -> SRF-SCALE-SYN-999999'; } },
    { key: 'proofValue', label: 'proofValue altered by one character (proof.proofValue)', apply: (r) => { const before = r.proof.proofValue; r.proof.proofValue = flipLastChar(before); return 'proof.proofValue: last character ' + before.slice(-1) + ' -> ' + r.proof.proofValue.slice(-1); } },
    { key: 'byte', label: 'one byte flipped in the signed body (register.sha256, last character)', apply: (r) => { const before = r.register.sha256; const last = before.slice(-1); const after = before.slice(0, -1) + (last === 'f' ? '0' : String.fromCharCode(last.charCodeAt(0) + 1)); r.register.sha256 = after; return 'register.sha256: last character ' + last + ' -> ' + after.slice(-1); } },
  ];
  const cardResults = [];
  (function records() {
    const wrap = $('#cards');
    for (const ex of D.exhibits) {
      const orig = ex.record; let current = orig; let tampered = null;
      const card = el('article', { class: 'card' }); card.dataset.claim = orig.claimId;
      card.append(el('h3', {}, el('code', { text: orig.claimId }), el('span', { class: 'tag', text: 'SYNTHETIC' }), el('span', { class: 'tag', text: 'DEMONSTRATION-KEY' })));
      const m = orig.mapping;
      card.append(el('dl', {},
        el('dt', { text: 'outcome' }), el('dd', {}, el('code', { text: m.outcome })),
        el('dt', { text: m.stoppedAt ? 'stopped at' : 'closed by' }), el('dd', {}, el('code', { text: m.stoppedAt || (m.closedBy + ' via ' + m.closer) })),
        el('dt', { text: 'open clauses' }), el('dd', { text: String((m.open || []).length) }),
        el('dt', { text: 'population' }), el('dd', { text: orig.population }),
        el('dt', { text: 'payloadType' }), el('dd', {}, el('code', { text: orig.payloadType })),
        el('dt', { text: 'record entries' }), el('dd', { text: String(Object.keys(orig.records).length) }),
        el('dt', { text: 'register' }), el('dd', {}, el('code', { text: orig.register.domain + '@' + orig.register.version + ' ' + orig.register.sha256.slice(0, 16) + '...' })),
        el('dt', { text: 'proof' }), el('dd', {}, el('code', { text: orig.proof.cryptosuite }), ' created ', orig.proof.created),
        el('dt', { text: 'file sha256' }), el('dd', {}, el('code', { text: ex.sha256 })),
      ));
      const result = el('div', { class: 'result idle', text: 'not yet verified in this page' });
      const btn = el('button', { class: 'btn primary', type: 'button', text: 'Verify' });
      const state = el('span', { class: 'tamper-state', text: 'committed bytes' });
      const change = el('div', { class: 'change' });
      const sel = el('select', {}, ...TAMPERS.map((t) => el('option', { value: t.key, text: t.label })));
      const applyBtn = el('button', { class: 'btn', type: 'button', text: 'Apply tamper' });
      const restoreBtn = el('button', { class: 'btn', type: 'button', text: 'Restore' }); restoreBtn.disabled = true;
      const run = () => { const v = verifyRecord(current); renderResult(result, v); card.dataset.verified = v.ok ? 'pass' : 'fail'; cardResults[ex.file] = v; return v; };
      btn.addEventListener('click', run);
      applyBtn.addEventListener('click', () => { const t = TAMPERS.find((x) => x.key === sel.value); tampered = clone(orig); const desc = t.apply(tampered); current = tampered; state.textContent = 'TAMPERED copy in memory (' + t.label.split(' (')[0] + ')'; state.className = 'tamper-state on'; change.textContent = 'changed after signing: ' + desc; restoreBtn.disabled = false; card.dataset.tamper = t.key; run(); });
      restoreBtn.addEventListener('click', () => { current = orig; tampered = null; state.textContent = 'committed bytes restored'; state.className = 'tamper-state'; change.textContent = ''; restoreBtn.disabled = true; delete card.dataset.tamper; run(); });
      card.append(el('div', { class: 'actions' }, btn, result), el('div', { class: 'tamper-row' }, el('span', { text: 'Tamper:' }), sel, applyBtn, restoreBtn), state, change);
      card._run = run;
      wrap.append(card);
    }
    $('#verify-all').addEventListener('click', () => { let pass = 0; for (const c of wrap.querySelectorAll('.card')) if (c._run().ok) pass++; $('#verify-all-result').textContent = pass + ' / ' + D.exhibits.length + ' exhibits PASS in this page (as currently held in memory; tampered cards fail by design)'; });
  })();

  (function committedTampers() {
    const wrap = $('#tampered-cards');
    for (const c of D.tampered.cases) {
      const rec = c.record; const expected = D.tamperTest.cases.find((x) => x.tamper === c.tamper);
      const card = el('article', { class: 'card' }); card.dataset.tamper = c.tamper;
      card.append(el('h3', {}, el('code', { text: rec.claimId }), el('span', { class: 'tag', text: 'TAMPERED' }), el('span', { class: 'tag', text: 'SYNTHETIC' })));
      card.append(el('dl', {},
        el('dt', { text: 'tamper' }), el('dd', { text: c.tamper }),
        el('dt', { text: 'record' }), el('dd', {}, el('code', { text: rec.payloadType }), ' (claim record, ', el('code', { text: 'outcome=' + rec.outcome }), ')'),
        el('dt', { text: 'original, as recorded' }), el('dd', { text: expected ? 'claim ' + expected.claimId + ', verifies=' + expected.original.verifies + ', digest ' + expected.original.digest.slice(0, 16) + '...' : 'not in tamper-test.json' }),
        el('dt', { text: 'copy, as recorded' }), el('dd', { text: expected ? 'verifies=' + expected.tampered.verifies + ': ' + expected.tampered.reason : '' }),
      ));
      const result = el('div', { class: 'result idle', text: 'not yet verified in this page' });
      const btn = el('button', { class: 'btn primary', type: 'button', text: 'Verify this copy' });
      const run = () => { const v = verifyRecord(rec); const matches = expected && v.reason === expected.tampered.reason; renderResult(result, v, el('span', { class: 'reason', text: v.ok ? 'A TAMPERED COPY VERIFIED: FINDING' : (matches ? 'fails, with the reason recorded in tamper-test.json' : 'fails, with a reason different from tamper-test.json') })); card.dataset.verified = v.ok ? 'pass' : 'fail'; return v; };
      btn.addEventListener('click', run); card._run = run;
      card.append(el('div', { class: 'actions' }, btn, result));
      wrap.append(card);
    }
    $('#verify-tampered').addEventListener('click', () => { let fails = 0; for (const c of wrap.querySelectorAll('.card')) if (!c._run().ok) fails++; $('#verify-tampered-result').textContent = fails + ' / ' + D.tampered.cases.length + ' tampered copies FAIL in this page'; });
  })();

  // ---- e. measurements ----------------------------------------------------------------------
  (function measurements() {
    const A = D.annex;
    $('#annex-statement').append(annexNode('p', A.statement), annexNode('p', A.denominators), annexNode('p', A.n));
    const table = (id, rows) => { const t = $(id); t.textContent = ''; const thead = el('thead'), tbody = el('tbody'); thead.append(el('tr', {}, ...rows[0].map((c) => annexNode('th', c)))); for (const r of rows.slice(1)) tbody.append(el('tr', {}, ...r.map((c) => annexNode('td', c)))); t.append(thead, tbody); };
    const line = (id, raw) => { const p = $(id); p.innerHTML = md(raw); p.dataset.annex = raw; };
    // chart: one panel per denominator column of the outcome table, single hue, direct labels are the annex's own cells
    const parseCount = (cell) => { const m = /^([\d,]+) \/ ([\d,]+)/.exec(cell); return m ? [Number(m[1].replace(/,/g, '')), Number(m[2].replace(/,/g, ''))] : null; };
    const grid = el('div', { class: 'chart-grid' });
    for (let col = 1; col < A.outcomes[0].length; col++) {
      const rows = A.outcomes.slice(1).map((r) => ({ outcome: r[0], cell: r[col], counts: parseCount(r[col]) }));
      const max = Math.max(...rows.map((r) => r.counts[0]));
      const W = 560, labelW = 170, valW = 190, barW = W - labelW - valW - 12, rowH = 30, H = rows.length * rowH + 12;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('role', 'img');
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title'); title.textContent = 'Outcome distribution, ' + A.outcomes[0][col].replace(/`/g, ''); svg.append(title);
      const ax = document.createElementNS('http://www.w3.org/2000/svg', 'line'); ax.setAttribute('class', 'axis'); ax.setAttribute('x1', labelW); ax.setAttribute('x2', labelW); ax.setAttribute('y1', 4); ax.setAttribute('y2', H - 4); svg.append(ax);
      rows.forEach((r, i) => {
        const y = 6 + i * rowH; const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text'); t.setAttribute('x', labelW - 8); t.setAttribute('y', y + 18); t.setAttribute('text-anchor', 'end'); t.textContent = r.outcome.replace(/`/g, ''); g.append(t);
        const w = max ? Math.max(0, Math.round((r.counts[0] / max) * barW)) : 0;
        const b = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); b.setAttribute('class', 'bar'); b.setAttribute('x', labelW + 1); b.setAttribute('y', y + 5); b.setAttribute('width', w); b.setAttribute('height', rowH - 12); b.setAttribute('rx', w > 4 ? 3 : 0); g.append(b);
        const v = document.createElementNS('http://www.w3.org/2000/svg', 'text'); v.setAttribute('class', 'val'); v.setAttribute('x', labelW + 1 + w + 8); v.setAttribute('y', y + 18); v.textContent = r.cell; v.dataset.annex = r.cell; g.append(v);
        const tt = document.createElementNS('http://www.w3.org/2000/svg', 'title'); tt.textContent = r.outcome.replace(/`/g, '') + ': ' + r.cell; g.append(tt);
        svg.append(g);
      });
      const panel = el('div', { class: 'chart' }); panel.append(annexNode('h4', A.outcomes[0][col]), svg); grid.append(panel);
    }
    $('#chart').append(grid);
    table('#outcomes-table', A.outcomes);
    line('#scope-undecided', A.scopeUndecided);
    table('#tier-table', A.tierReached);
    line('#headline-heading', A.headline.heading);
    line('#headline-definition', A.headline.definition);
    table('#headline-table', A.headline.rows);
    line('#headline-stopped', A.headline.stoppedAt);
    line('#headline-waiting-intro', A.headline.waitingIntro);
    table('#waiting-table', A.headline.waitingOn);
    line('#headline-duty-intro', A.headline.dutyIntro);
    table('#duty-table', A.headline.dutyOpen);
    line('#headline-bypop', A.headline.byPopulation);
    line('#dangerous-heading', A.dangerous.heading);
    line('#dangerous-intro', A.dangerous.intro);
    table('#dangerous-table', A.dangerous.rows);
    line('#verification-intro', A.verification.intro);
    table('#verification-table', A.verification.rows);
    line('#tamper-intro', A.tamper.intro);
    table('#tamper-table', A.tamper.rows);
    line('#tamper-verdict', A.tamper.verdict);
    line('#custody', A.custody);
    table('#files-table', A.files);
  })();
  window.__caseExplorer = { verifyRecord, engineVersion: E.CORE_VERSION, key: D.manifest.key.did };
})();
