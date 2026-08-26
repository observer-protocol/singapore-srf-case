"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  APPROVER_KEY_ASSURANCE: () => APPROVER_KEY_ASSURANCE,
  APPROVER_KEY_ASSURANCE_SCHEMA_VERSION: () => APPROVER_KEY_ASSURANCE_SCHEMA_VERSION,
  ATTESTATION_ESTABLISHES: () => ATTESTATION_ESTABLISHES,
  CORE_VERSION: () => CORE_VERSION,
  CROSS_RAIL_SCALE: () => CROSS_RAIL_SCALE,
  CrossRailLedger: () => CrossRailLedger,
  DECLARED_UNENFORCEABLE: () => DECLARED_UNENFORCEABLE,
  DEFAULT_EVM_TOKENS: () => DEFAULT_EVM_TOKENS,
  DEFAULT_SOLANA_MINTS: () => DEFAULT_SOLANA_MINTS,
  DENIAL_TAGS: () => DENIAL_TAGS,
  DidKeyConventionError: () => DidKeyConventionError,
  EVALUATION_VERDICT_PAYLOAD_TYPE: () => EVALUATION_VERDICT_PAYLOAD_TYPE,
  FORBIDDEN_ATTESTATION_FIELDS: () => FORBIDDEN_ATTESTATION_FIELDS,
  KNOWN_COUNTERPARTY_KINDS: () => KNOWN_COUNTERPARTY_KINDS,
  KNOWN_SCOPE_KEYS: () => KNOWN_SCOPE_KEYS,
  KNOWN_TM_KEYS: () => KNOWN_TM_KEYS,
  LAPSE_PAYLOAD_TYPE: () => LAPSE_PAYLOAD_TYPE,
  LEDGER_SAFE_FLOOR: () => LEDGER_SAFE_FLOOR,
  NON_NEGOTIABLE: () => NON_NEGOTIABLE,
  OBSERVATION_BOUNDARY_DOES_NOT_INSPECT_POLICY_REF: () => OBSERVATION_BOUNDARY_DOES_NOT_INSPECT_POLICY_REF,
  ObservationRefused: () => ObservationRefused,
  ObserverLedgerContentionError: () => ObserverLedgerContentionError,
  ObserverUrlRefusedError: () => ObserverUrlRefusedError,
  POLICY_REF_CONVENTION: () => POLICY_REF_CONVENTION,
  POLICY_REF_FIELDS_GO_INSIDE_POLICY_REF: () => POLICY_REF_FIELDS_GO_INSIDE_POLICY_REF,
  REFUSAL_PAYLOAD_TYPE: () => REFUSAL_PAYLOAD_TYPE,
  REFUSAL_PAYLOAD_TYPE_V1: () => REFUSAL_PAYLOAD_TYPE_V1,
  REFUSAL_PAYLOAD_TYPE_V2: () => REFUSAL_PAYLOAD_TYPE_V2,
  REFUSAL_PAYLOAD_TYPE_V3: () => REFUSAL_PAYLOAD_TYPE_V3,
  REQUIRED_KEY_CUSTODY: () => REQUIRED_KEY_CUSTODY,
  REQUIRED_KEY_CUSTODY_SCHEMA_VERSION: () => REQUIRED_KEY_CUSTODY_SCHEMA_VERSION,
  RESOLUTION_PAYLOAD_TYPE: () => RESOLUTION_PAYLOAD_TYPE,
  SOLANA_BENIGN_PROGRAMS: () => SOLANA_BENIGN_PROGRAMS,
  SOLANA_PROGRAMS: () => SOLANA_PROGRAMS,
  acceptDecisionAttestation: () => acceptDecisionAttestation,
  appendAudit: () => appendAudit,
  assertFetchableUrl: () => assertFetchableUrl,
  assertLedgerCoreSafe: () => assertLedgerCoreSafe,
  assertNoObservation: () => assertNoObservation,
  base58Decode: () => base58Decode,
  base58Encode: () => base58Encode,
  blockedAddressReason: () => blockedAddressReason,
  capDetail: () => capDetail,
  checkDeciderArtifactRef: () => checkDeciderArtifactRef,
  checkDecisionRefs: () => checkDecisionRefs,
  checkOutcomeInVocabulary: () => checkOutcomeInVocabulary,
  checkPaymentBinding: () => checkPaymentBinding,
  checkStatusEntry: () => checkStatusEntry,
  checkValidityWindow: () => checkValidityWindow,
  compareCoreVersion: () => compareCoreVersion,
  convertToBudgetUnits: () => convertToBudgetUnits,
  declaredUnenforceable: () => declaredUnenforceable,
  decodeEd25519DidKey: () => decodeEd25519DidKey,
  decodeEd25519Multibase: () => decodeEd25519Multibase,
  didWebOrigin: () => didWebOrigin,
  ed25519Verify: () => ed25519Verify,
  enforceMandate: () => enforceMandate,
  evaluateMandate: () => evaluateMandate,
  evaluationVerdictPayload: () => evaluationVerdictPayload,
  findAssertionMethodKey: () => findAssertionMethodKey,
  formatBudgetUnits: () => formatBudgetUnits,
  formatScaled: () => formatScaled,
  guardedFetch: () => guardedFetch,
  isRefusalRow: () => isRefusalRow,
  issueDecisionAttestation: () => issueDecisionAttestation,
  jcsBytes: () => jcsBytes,
  lapsePayload: () => lapsePayload,
  parseConfig: () => parseConfig,
  parseDecimalScaled: () => parseDecimalScaled,
  refusalPayload: () => refusalPayload,
  refuseWrongDidKeyWidth: () => refuseWrongDidKeyWidth,
  resolutionPayload: () => resolutionPayload,
  resolveDidDocument: () => resolveDidDocument,
  resolveDidKeyDocument: () => resolveDidKeyDocument,
  runRuntimeAdapter: () => runRuntimeAdapter,
  sha256: () => sha256,
  signableFromRefusal: () => signableFromRefusal,
  signableFromRefusalRow: () => signableFromRefusalRow,
  statusListOriginDecision: () => statusListOriginDecision,
  stripUndefinedDeep: () => stripUndefinedDeep,
  validateStructure: () => validateStructure,
  verifyCredential: () => verifyCredential,
  verifyCredentialCrypto: () => verifyCredentialCrypto,
  verifyCredentialObject: () => verifyCredentialObject,
  verifyDecisionAttestation: () => verifyDecisionAttestation,
  verifyEddsaJcs2022: () => verifyEddsaJcs2022
});
module.exports = __toCommonJS(src_exports);

// src/core/verify.ts
var import_node_fs4 = require("node:fs");

// src/core/schema.ts
var W3C_VC_V2_CONTEXT = "https://www.w3.org/ns/credentials/v2";
function validateStructure(cred, config) {
  const fail = (reason) => ({ ok: false, reason: `structure: ${reason}` });
  if (!Array.isArray(cred["@context"]) || !cred["@context"].includes(W3C_VC_V2_CONTEXT)) {
    return fail(`@context must include ${W3C_VC_V2_CONTEXT}`);
  }
  if (typeof cred.id !== "string" || !(cred.id.startsWith("https://") || cred.id.startsWith("urn:uuid:"))) {
    return fail("id must be an https: or urn:uuid: URI");
  }
  if (!Array.isArray(cred.type) || !cred.type.includes("VerifiableCredential") || cred.type.length < 2) {
    return fail("type must be an array containing VerifiableCredential plus a concrete type");
  }
  if (typeof cred.issuer !== "string" || !/^did:[a-z]+:.+/.test(cred.issuer)) {
    return fail("issuer must be a DID string");
  }
  if (cred.issuer !== config.issuerDid) {
    return fail(`issuer ${cred.issuer} does not match the pinned trusted issuer ${config.issuerDid}`);
  }
  if (typeof cred.validFrom !== "string" || typeof cred.validUntil !== "string") {
    return fail("validFrom and validUntil are required");
  }
  const schemaRef = cred.credentialSchema;
  if (!schemaRef || schemaRef.type !== "JsonSchema" || typeof schemaRef.id !== "string") {
    return fail('credentialSchema must be { id, type: "JsonSchema" }');
  }
  if (!config.schemaAllowlist.includes(schemaRef.id)) {
    return fail(
      `credentialSchema.id ${schemaRef.id} is not in the schema allowlist [${config.schemaAllowlist.join(", ")}]`
    );
  }
  const subject = cred.credentialSubject;
  if (!subject || typeof subject !== "object") return fail("credentialSubject missing");
  if (typeof subject.id !== "string" || !/^did:[a-z]+:.+/.test(subject.id)) {
    return fail("credentialSubject.id must be a DID");
  }
  if (config.agentDid && subject.id !== config.agentDid) {
    return fail(`credentialSubject.id ${subject.id} does not match the pinned agent DID ${config.agentDid}`);
  }
  if (!subject.actionScope || typeof subject.actionScope !== "object") {
    return fail("credentialSubject.actionScope is required");
  }
  if (!subject.delegationScope || typeof subject.delegationScope.may_delegate_further !== "boolean") {
    return fail("credentialSubject.delegationScope.may_delegate_further is required");
  }
  if (subject.enforcementMode !== "protocol_native" && subject.enforcementMode !== "pre_transaction_check") {
    return fail("credentialSubject.enforcementMode must be protocol_native or pre_transaction_check");
  }
  if (subject.authorizationLevel) {
    const levelKey = { "one-time": "oneTime", recurring: "recurring", policy: "policy" }[subject.authorizationLevel];
    if (!levelKey) return fail(`unknown authorizationLevel ${String(subject.authorizationLevel)}`);
    const cfg = subject.authorizationConfig;
    if (!cfg || typeof cfg !== "object" || !cfg[levelKey]) {
      return fail(`authorizationLevel ${subject.authorizationLevel} requires authorizationConfig.${levelKey}`);
    }
  }
  if (cred.credentialStatus !== void 0 && !Array.isArray(cred.credentialStatus)) {
    return fail("credentialStatus must be an array of BitstringStatusListEntry when present");
  }
  return { ok: true };
}
function checkValidityWindow(cred, nowMs) {
  const from = Date.parse(cred.validFrom);
  const until = Date.parse(cred.validUntil);
  if (Number.isNaN(from) || Number.isNaN(until)) {
    return { ok: false, reason: "validity: validFrom/validUntil are not parseable timestamps" };
  }
  if (nowMs < from) return { ok: false, reason: `validity: credential not yet valid (validFrom ${cred.validFrom})` };
  if (nowMs > until) return { ok: false, reason: `validity: credential expired (validUntil ${cred.validUntil})` };
  return { ok: true };
}

// src/core/resolve.ts
var import_node_fs = require("node:fs");

// src/core/url-guard.ts
var import_promises = require("node:dns/promises");
var ObserverUrlRefusedError = class extends Error {
  constructor(url, why) {
    super(`[url-guard] refusing to fetch ${url}: ${why}`);
    this.url = url;
    this.why = why;
    this.name = "ObserverUrlRefusedError";
  }
};
function ipv4Blocked(a, b, c) {
  if (a === 0) return "unspecified/this-network 0.0.0.0/8";
  if (a === 10) return "private RFC1918 10.0.0.0/8";
  if (a === 100 && b >= 64 && b <= 127) return "CGNAT RFC6598 100.64.0.0/10";
  if (a === 127) return "loopback 127.0.0.0/8";
  if (a === 169 && b === 254) return "link-local RFC3927 169.254.0.0/16 (includes cloud metadata)";
  if (a === 172 && b >= 16 && b <= 31) return "private RFC1918 172.16.0.0/12";
  if (a === 192 && b === 0 && c === 0) return "IETF protocol assignments 192.0.0.0/24";
  if (a === 192 && b === 0 && c === 2) return "documentation TEST-NET-1 192.0.2.0/24";
  if (a === 192 && b === 88 && c === 99) return "deprecated 6to4 relay anycast 192.88.99.0/24";
  if (a === 192 && b === 168) return "private RFC1918 192.168.0.0/16";
  if (a === 198 && (b === 18 || b === 19)) return "benchmarking RFC2544 198.18.0.0/15";
  if (a === 198 && b === 51 && c === 100) return "documentation TEST-NET-2 198.51.100.0/24";
  if (a === 203 && b === 0 && c === 113) return "documentation TEST-NET-3 203.0.113.0/24";
  if (a >= 224 && a <= 239) return "multicast 224.0.0.0/4";
  if (a >= 240) return "reserved 240.0.0.0/4";
  return null;
}
function blockedAddressReason(addr) {
  const v4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(addr);
  if (v4) {
    const o = v4.slice(1).map(Number);
    if (o.some((n) => n > 255)) return "malformed IPv4 address";
    return ipv4Blocked(o[0], o[1], o[2]);
  }
  const v6 = addr.toLowerCase().replace(/^\[|\]$/g, "");
  if (!v6.includes(":")) return "not a recognizable IP literal";
  const embedded = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/.exec(v6);
  if (embedded) {
    const inner = blockedAddressReason(embedded[1]);
    if (inner) return `IPv6-embedded IPv4: ${inner}`;
  }
  if (v6 === "::1") return "IPv6 loopback ::1";
  if (v6 === "::" || v6 === "::0") return "IPv6 unspecified ::";
  const head = v6.split(":")[0] ?? "";
  const h = parseInt(head || "0", 16);
  if (head.length && (h & 65472) === 65152) return "IPv6 link-local fe80::/10";
  if (head.length && (h & 65024) === 64512) return "IPv6 unique-local fc00::/7";
  if (head.length && (h & 65280) === 65280) return "IPv6 multicast ff00::/8";
  if (v6.startsWith("64:ff9b:")) return "NAT64 well-known prefix 64:ff9b::/96";
  return null;
}
async function assertFetchableUrl(raw, sanctioned) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    throw new ObserverUrlRefusedError(raw, "not a parseable absolute URL");
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") {
    throw new ObserverUrlRefusedError(raw, `scheme ${u.protocol} is not http(s)`);
  }
  if ((sanctioned ?? []).some((o) => o === u.origin)) return;
  const host = u.hostname;
  const literal = blockedAddressReason(host);
  if (literal !== null && literal !== "not a recognizable IP literal") {
    throw new ObserverUrlRefusedError(raw, `host is a ${literal}`);
  }
  if (literal !== null) {
    if (host.toLowerCase() === "localhost" || host.toLowerCase().endsWith(".localhost")) {
      throw new ObserverUrlRefusedError(raw, "host resolves to loopback by definition (localhost)");
    }
    let addrs;
    try {
      addrs = await (0, import_promises.lookup)(host, { all: true, verbatim: true });
    } catch (e) {
      throw new ObserverUrlRefusedError(raw, `host does not resolve (${e.message})`);
    }
    if (addrs.length === 0) throw new ObserverUrlRefusedError(raw, "host resolves to no addresses");
    for (const { address } of addrs) {
      const why = blockedAddressReason(address);
      if (why !== null) throw new ObserverUrlRefusedError(raw, `host resolves to ${address}, a ${why}`);
    }
  }
}
async function guardedFetch(url, timeoutMs, opts = {}) {
  const maxHops = opts.maxHops ?? 5;
  const sanctioned = opts.sanctionedOrigins;
  let current = url;
  let wasHttps = new URL(url).protocol === "https:";
  for (let hop = 0; hop <= maxHops; hop++) {
    await assertFetchableUrl(current, sanctioned);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let res;
    try {
      res = await fetch(current, { signal: controller.signal, redirect: "manual" });
    } finally {
      clearTimeout(timer);
    }
    if (res.status >= 300 && res.status < 400) {
      const next = res.headers.get("location");
      if (!next) throw new ObserverUrlRefusedError(current, `HTTP ${res.status} with no Location header`);
      const resolved = new URL(next, current);
      if (wasHttps && resolved.protocol === "http:") {
        throw new ObserverUrlRefusedError(current, `redirect downgrades https to http (${resolved.href})`);
      }
      wasHttps = wasHttps || resolved.protocol === "https:";
      current = resolved.href;
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  }
  throw new ObserverUrlRefusedError(url, `more than ${maxHops} redirects`);
}
function didWebOrigin(did) {
  if (!did.startsWith("did:web:")) return null;
  const [host] = did.slice("did:web:".length).split(":");
  if (!host) return null;
  return `https://${decodeURIComponent(host)}`;
}
function statusListOriginDecision(issuerDid, statusListUrl, allowlist) {
  let origin;
  try {
    origin = new URL(statusListUrl).origin;
  } catch {
    return { ok: false, reason: `statusListCredential ${JSON.stringify(statusListUrl)} is not a parseable absolute URL` };
  }
  if ((allowlist ?? []).some((a) => a === origin)) return { ok: true };
  const pinned = didWebOrigin(issuerDid);
  if (pinned !== null && origin === pinned) return { ok: true };
  const where = pinned !== null ? `is neither the pinned issuer's origin ${pinned} nor a listed origin` : `is not a listed origin, and issuer ${issuerDid} is a did:key with no origin to pin against`;
  return {
    ok: false,
    reason: `statusListCredential origin ${origin} ${where} (issuer ${issuerDid}). Add it to config.statusListOriginAllowlist to permit it; the list is empty by default and therefore refuses.`
  };
}

// src/core/resolve.ts
var import_node_path = require("node:path");

// src/core/crypto.ts
var import_node_crypto = require("node:crypto");

// src/core/base58.ts
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var INDEX = {};
for (let i = 0; i < ALPHABET.length; i++) INDEX[ALPHABET[i]] = i;
function base58Decode(s) {
  if (s.length === 0) return Buffer.alloc(0);
  let acc = 0n;
  for (const ch of s) {
    const d = INDEX[ch];
    if (d === void 0) throw new Error(`base58: invalid character ${JSON.stringify(ch)}`);
    acc = acc * 58n + BigInt(d);
  }
  const bytes = [];
  while (acc > 0n) {
    bytes.push(Number(acc & 0xffn));
    acc >>= 8n;
  }
  bytes.reverse();
  let leadingZeros = 0;
  for (const ch of s) {
    if (ch === "1") leadingZeros++;
    else break;
  }
  return Buffer.concat([Buffer.alloc(leadingZeros), Buffer.from(bytes)]);
}
function base58Encode(buf) {
  let acc = 0n;
  for (const b of buf) acc = (acc << 8n) + BigInt(b);
  let out = "";
  while (acc > 0n) {
    out = ALPHABET[Number(acc % 58n)] + out;
    acc /= 58n;
  }
  for (const b of buf) {
    if (b === 0) out = "1" + out;
    else break;
  }
  return out;
}

// src/core/crypto.ts
var ED25519_SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");
var MULTICODEC_ED25519_PUB = Buffer.from([237, 1]);
function decodeEd25519Multibase(s) {
  if (!s.startsWith("z")) {
    throw new Error(`publicKeyMultibase must be multibase base58btc (prefix 'z'), got ${JSON.stringify(s.slice(0, 4))}\u2026`);
  }
  const decoded = base58Decode(s.slice(1));
  if (decoded.length === 34 && decoded[0] === MULTICODEC_ED25519_PUB[0] && decoded[1] === MULTICODEC_ED25519_PUB[1]) {
    return { key: decoded.subarray(2) };
  }
  if (decoded.length === 32) {
    return { key: decoded, note: "publicKeyMultibase lacked the ed25519-pub multicodec prefix; accepted bare 32-byte key" };
  }
  throw new Error(`publicKeyMultibase decodes to ${decoded.length} bytes; expected 34 (multicodec) or 32 (bare)`);
}
function ed25519Verify(rawPublicKey, data, signature) {
  if (rawPublicKey.length !== 32) throw new Error("Ed25519 public key must be 32 bytes");
  const keyObject = (0, import_node_crypto.createPublicKey)({
    key: Buffer.concat([ED25519_SPKI_PREFIX, rawPublicKey]),
    format: "der",
    type: "spki"
  });
  return (0, import_node_crypto.verify)(null, data, keyObject, signature);
}
function sha256(data) {
  return (0, import_node_crypto.createHash)("sha256").update(data).digest();
}

// src/core/resolve.ts
function didWebToUrl(did) {
  if (!did.startsWith("did:web:")) throw new Error(`not a did:web DID: ${did}`);
  const rest = did.slice("did:web:".length);
  const parts = rest.split(":").map((p) => decodeURIComponent(p));
  const host = parts[0];
  if (!host) throw new Error(`malformed did:web DID: ${did}`);
  if (parts.length === 1) return `https://${host}/.well-known/did.json`;
  return `https://${host}/${parts.slice(1).join("/")}/did.json`;
}
async function fetchWithTimeout(url, timeoutMs, sanctionedOrigins) {
  return guardedFetch(url, timeoutMs, sanctionedOrigins ? { sanctionedOrigins } : {});
}
function cachePathFor(cacheDir, url) {
  return (0, import_node_path.join)(cacheDir, sha256(url).toString("hex") + ".json");
}
async function cachedFetch(url, cacheDir, timeoutMs, maxStalenessHours, sanctionedOrigins) {
  (0, import_node_fs.mkdirSync)(cacheDir, { recursive: true });
  const cachePath = cachePathFor(cacheDir, url);
  let fetchError;
  try {
    const body = await fetchWithTimeout(url, timeoutMs, sanctionedOrigins);
    (0, import_node_fs.writeFileSync)(cachePath, JSON.stringify({ fetchedAt: (/* @__PURE__ */ new Date()).toISOString(), url, body }));
    return { body, fresh: true, ageHours: 0 };
  } catch (e) {
    fetchError = e.message;
  }
  if ((0, import_node_fs.existsSync)(cachePath)) {
    try {
      const cached = JSON.parse((0, import_node_fs.readFileSync)(cachePath, "utf8"));
      const ageHours = (Date.now() - Date.parse(cached.fetchedAt)) / 36e5;
      if (ageHours <= maxStalenessHours) {
        return {
          body: cached.body,
          fresh: false,
          ageHours,
          note: `refresh of ${url} failed (${fetchError}); served from cache aged ${ageHours.toFixed(1)}h (limit ${maxStalenessHours}h)`
        };
      }
      throw new Error(
        `unreachable (${fetchError}) and cache is ${ageHours.toFixed(1)}h old, beyond the ${maxStalenessHours}h staleness window`
      );
    } catch (e) {
      if (e.message.includes("staleness window")) throw e;
      throw new Error(`unreachable (${fetchError}) and cache unreadable: ${e.message}`);
    }
  }
  throw new Error(`unreachable (${fetchError}) and no cached copy exists`);
}
function resolveDidKeyDocument(did) {
  if (!did.startsWith("did:key:")) throw new Error(`not a did:key DID: ${did}`);
  const keyId = did.slice("did:key:".length);
  if (!keyId.startsWith("z")) {
    throw new Error(`did:key must use multibase base58btc (z prefix): ${did}`);
  }
  const vmId = `${did}#${keyId}`;
  return {
    id: did,
    verificationMethod: [{ id: vmId, type: "Multikey", controller: did, publicKeyMultibase: keyId }],
    assertionMethod: [vmId]
  };
}
async function resolveDidDocument(did, opts) {
  if (did.startsWith("did:key:")) {
    return { doc: resolveDidKeyDocument(did) };
  }
  if (opts.offlinePath) {
    const doc2 = JSON.parse((0, import_node_fs.readFileSync)(opts.offlinePath, "utf8"));
    return { doc: doc2, note: `issuer DID document loaded from offline override ${opts.offlinePath}` };
  }
  const url = didWebToUrl(did);
  const res = await cachedFetch(url, opts.cacheDir, opts.timeoutMs, opts.maxStalenessHours);
  const doc = JSON.parse(res.body);
  return { doc, note: res.note };
}
function findAssertionMethodKey(doc, vmId) {
  const assertion = doc.assertionMethod ?? [];
  const referenced = assertion.find((a) => typeof a === "string" ? a === vmId : a.id === vmId);
  if (!referenced) {
    throw new Error(
      `verification method ${vmId} is not listed in assertionMethod on ${doc.id} \u2014 refusing (mis-scoped or non-assertion key)`
    );
  }
  if (typeof referenced !== "string") return { entry: referenced };
  const entry = (doc.verificationMethod ?? []).find((vm) => vm.id === vmId);
  if (!entry) {
    throw new Error(`assertionMethod references ${vmId} but no matching verificationMethod entry exists`);
  }
  return { entry };
}

// src/core/jcs.ts
function jcsCanonicalize(value) {
  if (value === null || typeof value !== "object") {
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new Error("JCS: non-finite numbers are not representable in JSON");
    }
    if (value === void 0) {
      throw new Error("JCS: undefined is not representable in JSON");
    }
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return "[" + value.map((v) => jcsCanonicalize(v === void 0 ? null : v)).join(",") + "]";
  }
  const obj = value;
  const keys = Object.keys(obj).sort();
  const parts = [];
  for (const k of keys) {
    const v = obj[k];
    if (v === void 0) continue;
    parts.push(JSON.stringify(k) + ":" + jcsCanonicalize(v));
  }
  return "{" + parts.join(",") + "}";
}
function jcsBytes(value) {
  return Buffer.from(jcsCanonicalize(value), "utf8");
}
function stripUndefinedDeep(value) {
  if (Array.isArray(value)) return value.filter((v) => v !== void 0).map(stripUndefinedDeep);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).filter(([, v]) => v !== void 0).map(([k, v]) => [k, stripUndefinedDeep(v)])
    );
  }
  return value;
}

// src/core/proof.ts
var PROOF_TYPE = "DataIntegrityProof";
var CRYPTOSUITE = "eddsa-jcs-2022";
function verifyEddsaJcs2022(document, rawPublicKey) {
  const notes = [];
  const proof = document["proof"];
  if (!proof || typeof proof !== "object") {
    return { ok: false, reason: "credential has no proof block", notes };
  }
  if (proof.type !== PROOF_TYPE) {
    return {
      ok: false,
      reason: `proof.type must be ${PROOF_TYPE} (got ${JSON.stringify(proof.type)}); legacy suites are not accepted`,
      notes
    };
  }
  if (proof.cryptosuite !== CRYPTOSUITE) {
    return {
      ok: false,
      reason: `proof.cryptosuite must be ${CRYPTOSUITE} (got ${JSON.stringify(proof.cryptosuite)})`,
      notes
    };
  }
  if (proof.proofPurpose !== "assertionMethod") {
    return { ok: false, reason: `proof.proofPurpose must be assertionMethod (got ${JSON.stringify(proof.proofPurpose)})`, notes };
  }
  if (!proof.created || !proof.verificationMethod || typeof proof.proofValue !== "string") {
    return { ok: false, reason: "proof must carry created, verificationMethod, and proofValue", notes };
  }
  if (!proof.proofValue.startsWith("z")) {
    return { ok: false, reason: "proof.proofValue must be multibase base58btc (prefix 'z')", notes };
  }
  let signature;
  try {
    signature = base58Decode(proof.proofValue.slice(1));
  } catch (e) {
    return { ok: false, reason: `proof.proofValue decode failed: ${e.message}`, notes };
  }
  if (signature.length !== 64) {
    return { ok: false, reason: `Ed25519 signature must be 64 bytes (got ${signature.length})`, notes };
  }
  const documentNoProof = {};
  for (const [k, v] of Object.entries(document)) if (k !== "proof") documentNoProof[k] = v;
  if ("@context" in proof) {
    const proofCtx = Array.isArray(proof["@context"]) ? proof["@context"] : [proof["@context"]];
    const docCtxRaw = documentNoProof["@context"];
    const docCtx = Array.isArray(docCtxRaw) ? docCtxRaw : docCtxRaw !== void 0 ? [docCtxRaw] : [];
    if (docCtx.length < proofCtx.length) {
      return { ok: false, reason: "document.@context does not start with proof.@context", notes };
    }
    for (let i = 0; i < proofCtx.length; i++) {
      if (docCtx[i] !== proofCtx[i]) {
        return { ok: false, reason: "document.@context does not start with proof.@context", notes };
      }
    }
    documentNoProof["@context"] = proof["@context"];
  }
  const proofConfig = {};
  for (const [k, v] of Object.entries(proof)) if (k !== "proofValue") proofConfig[k] = v;
  const hashData = Buffer.concat([sha256(jcsBytes(proofConfig)), sha256(jcsBytes(documentNoProof))]);
  let valid;
  try {
    valid = ed25519Verify(rawPublicKey, hashData, signature);
  } catch (e) {
    return { ok: false, reason: `signature verification errored: ${e.message}`, notes };
  }
  return valid ? { ok: true, reason: "ok", notes } : { ok: false, reason: "eddsa-jcs-2022 signature does not verify against the issuer key", notes };
}

// src/core/revocation.ts
var import_node_zlib = require("node:zlib");
var import_node_fs2 = require("node:fs");
function decodeEncodedList(encoded) {
  const candidates = encoded.startsWith("u") ? [encoded.slice(1), encoded] : [encoded];
  let lastError;
  for (const candidate of candidates) {
    try {
      const compressed = Buffer.from(candidate, "base64url");
      return (0, import_node_zlib.gunzipSync)(compressed);
    } catch (e) {
      lastError = e;
    }
  }
  throw new Error(`encodedList decode failed: ${lastError?.message}`);
}
function getBit(raw, index) {
  const total = raw.length * 8;
  if (index < 0 || index >= total) {
    throw new Error(`status list index ${index} out of range [0, ${total})`);
  }
  const byte = raw[index >> 3];
  return byte >> 7 - index % 8 & 1;
}
async function checkStatusEntry(entry, config) {
  const notes = [];
  if (entry.type !== "BitstringStatusListEntry") {
    throw new Error(`unsupported credentialStatus type ${JSON.stringify(entry.type)}`);
  }
  const index = Number.parseInt(entry.statusListIndex, 10);
  if (!Number.isInteger(index) || index < 0) {
    throw new Error(`statusListIndex must be a non-negative integer string, got ${JSON.stringify(entry.statusListIndex)}`);
  }
  const originDecision = statusListOriginDecision(
    config.issuerDid,
    entry.statusListCredential,
    config.statusListOriginAllowlist
  );
  if (!originDecision.ok) throw new Error(originDecision.reason);
  let body;
  if (config.offline?.statusListPath) {
    body = (0, import_node_fs2.readFileSync)(config.offline.statusListPath, "utf8");
    notes.push(`status list loaded from offline override ${config.offline.statusListPath}`);
  } else {
    const res = await cachedFetch(
      entry.statusListCredential,
      config.cacheDir,
      config.revocation.fetchTimeoutMs,
      config.revocation.maxStalenessHours,
      config.statusListOriginAllowlist
    );
    if (res.note) notes.push(res.note);
    body = res.body;
  }
  const listCredential = JSON.parse(body);
  const types = listCredential["type"];
  if (!Array.isArray(types) || !types.includes("BitstringStatusListCredential")) {
    throw new Error("status list credential type must include BitstringStatusListCredential");
  }
  const listIssuer = listCredential["issuer"];
  if (listIssuer !== config.issuerDid) {
    throw new Error(
      `status list credential issuer ${JSON.stringify(listIssuer)} does not match the pinned issuer ${config.issuerDid}`
    );
  }
  const { doc, note } = await resolveDidDocument(config.issuerDid, {
    cacheDir: config.cacheDir,
    timeoutMs: config.revocation.fetchTimeoutMs,
    maxStalenessHours: config.didCache.maxStalenessHours,
    offlinePath: config.offline?.didDocumentPath
  });
  if (note) notes.push(note);
  const proof = listCredential["proof"];
  if (!proof?.verificationMethod) {
    throw new Error("status list credential has no proof.verificationMethod");
  }
  const { entry: vm } = findAssertionMethodKey(doc, proof.verificationMethod);
  if (!vm.publicKeyMultibase) {
    throw new Error(`verification method ${vm.id} has no publicKeyMultibase`);
  }
  const { key, note: keyNote } = decodeEd25519Multibase(vm.publicKeyMultibase);
  if (keyNote) notes.push(`status list issuer key: ${keyNote}`);
  const proofResult = verifyEddsaJcs2022(listCredential, key);
  if (!proofResult.ok) {
    throw new Error(`status list credential proof invalid: ${proofResult.reason}`);
  }
  const subject = listCredential["credentialSubject"];
  if (subject?.type !== "BitstringStatusList") {
    throw new Error("status list credentialSubject.type must be BitstringStatusList");
  }
  if (subject.statusPurpose !== entry.statusPurpose) {
    throw new Error(
      `statusPurpose mismatch: entry says ${entry.statusPurpose}, list says ${String(subject.statusPurpose)}`
    );
  }
  if (typeof subject.encodedList !== "string") {
    throw new Error("status list credentialSubject.encodedList missing");
  }
  const raw = decodeEncodedList(subject.encodedList);
  const bit = getBit(raw, index);
  if (bit === 1) {
    return {
      revoked: true,
      detail: `credential is ${entry.statusPurpose === "suspension" ? "suspended" : "revoked"} (status list index ${index})`,
      notes
    };
  }
  return { revoked: false, detail: `status clear (purpose ${entry.statusPurpose}, index ${index})`, notes };
}

// src/core/cross-rail.ts
var import_node_fs3 = require("node:fs");
var import_node_path2 = require("node:path");
var import_node_os = require("node:os");
var CROSS_RAIL_SCALE = 6;
var RATE_SCALE = 12;
var WINDOW_MS = 24 * 60 * 60 * 1e3;
var MONTH_WINDOW_MS = 30 * 24 * 60 * 60 * 1e3;
var PRUNE_AFTER_MS = MONTH_WINDOW_MS + 60 * 60 * 1e3;
var RESERVE_TTL_MS = 5 * 60 * 1e3;
var PROCESS_INSTANCE = `${(0, import_node_os.hostname)()}:${process.pid}`;
var ObserverLedgerContentionError = class extends Error {
  constructor(foreignWriter) {
    super(
      `cross-rail ledger contention: a second writer (${foreignWriter}) wrote the same ledger path concurrently with this process (${PROCESS_INSTANCE}). The file ledger is single-writer per path (rewrite races and under-counts across writers); refusing to race \u2014 fail-closed. Co-locate every adapter sharing a budget in ONE process against ONE path, or use a shared-counter service for multi-process.`
    );
    this.foreignWriter = foreignWriter;
    this.name = "ObserverLedgerContentionError";
  }
};
function concurrentForeign(e, offset, claimOffset) {
  return typeof e.w === "string" && e.w !== PROCESS_INSTANCE && offset >= claimOffset ? e.w : null;
}
function convertToBudgetUnits(amountRaw, assetDecimals, rate) {
  if (amountRaw < 0n) throw new Error("cross-rail conversion: negative amount");
  const rateScaled = parseDecimalScaled(rate, RATE_SCALE);
  const divisor = 10n ** BigInt(assetDecimals + RATE_SCALE - CROSS_RAIL_SCALE);
  return (amountRaw * rateScaled + divisor - 1n) / divisor;
}
function formatBudgetUnits(scaled) {
  const s = 10n ** BigInt(CROSS_RAIL_SCALE);
  const frac = (scaled % s).toString().padStart(CROSS_RAIL_SCALE, "0").replace(/0+$/, "");
  return `${scaled / s}${frac ? "." + frac : ""}`;
}
var CrossRailLedger = class {
  path;
  /** CLAIM_OFFSET: the file's size when this instance opened it.
   *
   * Everything before it was already there and is history, whoever wrote it.
   * Everything at or after it was appended while we were live, so a foreign writer
   * there is genuinely concurrent. That is the whole of the single-writer guard, and
   * it needs no clock: an append-only file already carries a total order, and a byte
   * offset cannot go backwards when the host's clock does.
   *
   * Reset after a successful `rewrite`, because a rewrite compacts the file and
   * invalidates every offset. Safe to reset: `rewrite` runs the same guard over every
   * line first and throws before compacting, so a file it has just written contains
   * no concurrent foreign records by construction. */
  claimOffset;
  constructor(path) {
    if (!path) throw new Error("CrossRailLedger: path required");
    this.path = path;
    (0, import_node_fs3.mkdirSync)((0, import_node_path2.dirname)(path), { recursive: true });
    if (!(0, import_node_fs3.existsSync)(path)) (0, import_node_fs3.writeFileSync)(path, "", { encoding: "utf8", mode: 384 });
    this.claimOffset = this.fileSize();
  }
  fileSize() {
    try {
      return (0, import_node_fs3.statSync)(this.path).size;
    } catch {
      return 0;
    }
  }
  /** Record a committed spend immediately (signer-boundary path: the signature
   * IS the spend commitment — settlement timing is the facilitator's). */
  record(spend) {
    this.append({ ...spend, ts: Date.now(), state: "committed", w: PROCESS_INSTANCE });
  }
  /** Reserve budget headroom before an out-of-process payment executes.
   * Counted by sums immediately; expires after 5 minutes if abandoned. */
  reserve(spend) {
    const reserveId = Date.now().toString(36) + Math.random().toString(36).slice(2);
    this.append({ ...spend, ts: Date.now(), state: "reserved", reserveId, expiresAt: Date.now() + RESERVE_TTL_MS, w: PROCESS_INSTANCE });
    return reserveId;
  }
  commit(reserveId) {
    if (!reserveId) return;
    this.rewrite((e) => {
      if (e.reserveId !== reserveId || e.state !== "reserved") return e;
      const { expiresAt: _x, reserveId: _r, ...rest } = e;
      return { ...rest, state: "committed" };
    });
  }
  release(reserveId) {
    if (!reserveId) return;
    this.rewrite((e) => e.reserveId === reserveId && e.state === "reserved" ? null : e);
  }
  /** Rolling-24h total across ALL rails, converted into the budget currency at
   * the supplied principal-attested rates (CROSS_RAIL_SCALE units, per-entry
   * round-up). An in-window entry whose asset has no rate, or that cannot be
   * parsed as a spend, makes the total unestablishable: {ok:false} — the
   * caller MUST fail closed, because an unpriceable spend still consumed the
   * budget. */
  sumWindowConverted(rates, nowMs = Date.now()) {
    let total = 0n;
    try {
      for (const e of this.window(nowMs)) {
        const rate = rates[e.asset];
        if (rate === void 0) {
          return { ok: false, reason: `ledger holds an in-window ${e.asset} spend (rail ${e.rail}) with no principal-attested rate in the mandate \u2014 cross-rail total cannot be established` };
        }
        try {
          total += convertToBudgetUnits(BigInt(e.amountRaw), e.decimals, rate);
        } catch (err) {
          return { ok: false, reason: `ledger entry unparseable (${err.message}) \u2014 cross-rail total cannot be established` };
        }
      }
    } catch (err) {
      if (err instanceof ObserverLedgerContentionError) return { ok: false, reason: err.message };
      throw err;
    }
    return { ok: true, total };
  }
  /** Rolling-24h raw total for ONE asset — feeds tm.velocity.dailyVolumeCap as
   * ctx.spending.daily_total. Rolling 24h is a superset of the calendar-day
   * counter the velocity note documents, so the cap trips early, never late.
   * Entries that do not parse are skipped here (they cannot lower a same-asset
   * sum; the binding cross-rail path above still fails closed on them).
   * @throws ObserverLedgerContentionError if a second writer is detected on this
   * path — callers MUST treat the throw as a DENY (never a zero counter). */
  sumWindowRaw(asset, nowMs = Date.now()) {
    let total = 0n;
    for (const e of this.window(nowMs)) {
      if (e.asset !== asset) continue;
      try {
        total += BigInt(e.amountRaw);
      } catch {
        continue;
      }
    }
    return total;
  }
  /** Rolling 30-day raw total for ONE asset, for tm.velocity.monthlyVolumeCap.
   * Same shape and same conservative posture as sumWindowRaw: unparseable entries
   * are skipped (they cannot lower a same-asset sum) and the binding cross-rail
   * path still fails closed on them.
   * @throws ObserverLedgerContentionError if a second writer is detected. */
  sumMonthWindowRaw(asset, nowMs = Date.now()) {
    let total = 0n;
    for (const e of this.window(nowMs, MONTH_WINDOW_MS)) {
      if (e.asset !== asset) continue;
      try {
        total += BigInt(e.amountRaw);
      } catch {
        continue;
      }
    }
    return total;
  }
  /** Drop entries older than the longest served window and expired reservations. */
  prune(nowMs = Date.now()) {
    this.rewrite((e) => {
      if (e.ts < nowMs - PRUNE_AFTER_MS) return null;
      if (e.state === "reserved" && e.expiresAt !== void 0 && e.expiresAt < nowMs) return null;
      return e;
    });
  }
  *window(nowMs, spanMs = WINDOW_MS) {
    const cutoff = nowMs - spanMs;
    let raw;
    try {
      raw = (0, import_node_fs3.readFileSync)(this.path, "utf8");
    } catch {
      return;
    }
    let offset = 0;
    for (const line of raw.split("\n")) {
      const lineStart = offset;
      offset += Buffer.byteLength(line, "utf8") + 1;
      if (!line.trim()) continue;
      let e;
      try {
        e = JSON.parse(line);
      } catch {
        continue;
      }
      const foreign = concurrentForeign(e, lineStart, this.claimOffset);
      if (foreign) throw new ObserverLedgerContentionError(foreign);
      if (typeof e.ts !== "number" || e.ts < cutoff) continue;
      if (e.state !== "committed" && e.state !== "reserved") continue;
      if (e.state === "reserved" && e.expiresAt !== void 0 && e.expiresAt < nowMs) continue;
      yield e;
    }
  }
  append(e) {
    (0, import_node_fs3.appendFileSync)(this.path, JSON.stringify(e) + "\n", { encoding: "utf8" });
  }
  rewrite(transform) {
    let raw;
    try {
      raw = (0, import_node_fs3.readFileSync)(this.path, "utf8");
    } catch {
      return;
    }
    const kept = [];
    let offset = 0;
    for (const line of raw.split("\n")) {
      const lineStart = offset;
      offset += Buffer.byteLength(line, "utf8") + 1;
      if (!line.trim()) continue;
      let parsed;
      try {
        parsed = JSON.parse(line);
      } catch {
        kept.push(line);
        continue;
      }
      const foreign = concurrentForeign(parsed, lineStart, this.claimOffset);
      if (foreign) throw new ObserverLedgerContentionError(foreign);
      let out;
      try {
        out = transform(parsed);
      } catch {
        kept.push(line);
        continue;
      }
      if (out !== null) kept.push(JSON.stringify(out));
    }
    const tmp = this.path + ".tmp";
    (0, import_node_fs3.writeFileSync)(tmp, kept.join("\n") + (kept.length ? "\n" : ""), { encoding: "utf8", mode: 384 });
    (0, import_node_fs3.renameSync)(tmp, this.path);
    this.claimOffset = this.fileSize();
  }
};

// src/core/vocabulary.ts
var KNOWN_SCOPE_KEYS = /* @__PURE__ */ new Set([
  // Registered here or the unknown-rule gate refuses the credential, which is fail-closed working:
  // a field the engine reads but never declared would be a control nobody could audit from this set.
  // Registered 2026-08-01. Until then a credential declaring an escalation threshold was REFUSED by the
  // catch-all below — fail-closed, and the correct half of an earlier fix: the v2.1-lineage
  // authorizationConfig.policy.escalation_threshold emitted a NOTE and silently auto-approved the whole
  // band between the threshold and the ceiling. Relocating it to this enumerated surface turned that
  // silent auto-approval into a refusal. THE RELOCATION HAPPENED AND THE REGISTRATION DID NOT, so the
  // constraint was unusable rather than unenforced.
  // ─── NUMBER 22 ON THE NOT-ENFORCED LIST, AND IT IS A COMPROMISE RATHER THAN A DECISION ─────────
  //
  // `requiredEnforcement` names the capabilities an evaluator must honour to evaluate this credential
  // at all. Its whole purpose is PREVENTING PARTIAL EVALUATION. Registering it here as
  // recognised-and-passing means this engine reads it and does nothing with it, which is that purpose
  // unenforced. Recorded plainly so nobody later reads the registration as enforcement.
  //
  // WHY NOT THE CAPABILITY CHECK, which is the right fix. The engine would have to compare the
  // credential's capabilities against its own and refuse the difference. Measured 2026-08-08, this
  // engine can honour almost none of them: `budget.period-accounting` is unenforced (999999 USDC
  // against a 10 USDC cumulative_budget ALLOWS), `approval.assurance-verification` is never read, and
  // `attestation.citation-required` lives in the payment server rather than here.
  //
  // AND REFUSING ON THOSE WOULD BE WRONG, which is the actual argument. THE ENGINE IS NOT THE
  // EVALUATOR; it is one component of it. Required-mode citation enforcement is in
  // `op-mcp-payment-server`, and the approval channel is its queue. An engine refusing on capabilities
  // IT personally lacks would refuse credentials the composed system genuinely honours.
  //
  // THE REAL FIX IS QUEUED AND HAS A FOURTH PART: the HOST declares its capability set, the engine
  // compares against THAT, and refuses the difference. That needs a new input threaded through
  // `evaluateMandate` and every caller updated, which is why it is not this change.
  //
  // WITHOUT THIS REGISTRATION the unknown-rule catch-all denies every schema-valid credential carrying
  // the field, and the schema REQUIRES it alongside fifteen other actionScope fields. So the choice was
  // between a field enforced at schema validation and ignored here, and an estate with no evaluable
  // credential at all.
  "requiredEnforcement",
  "escalationThreshold",
  "approvers",
  "requiredPurchaseTerms",
  "allowed_rails",
  "per_transaction_ceiling",
  "allowed_transaction_categories",
  "cumulative_budget",
  "geographic_restriction"
]);
var KNOWN_TM_KEYS = /* @__PURE__ */ new Set([
  "unit",
  "maxNotionalPerOrder",
  "counterparty",
  "temporal",
  "geographic",
  "velocity",
  "allowedVenues",
  "allowedInstruments",
  "maxPosition",
  "dailyDrawdownCap",
  "crossRailBudget"
]);
var DECLARED_UNENFORCEABLE = [
  {
    container: "actionScope",
    property: "allowed_counterparty_types",
    // Deliberately names no unminted schema version. An earlier draft said
    // "withdrawn at v2.5", which would ship stale the moment the reservation
    // set moved. The frozen schema versions that ACCEPT the property are facts
    // and safe to name; the version that drops it is not yet one.
    reason: "declared in AIP v0.8 \xA71.3 and accepted by delegation schemas v2.1/v2.3/v2.4, but no enforcement path exists in any Observer Protocol engine and none is planned. The property is withdrawn from the constraint vocabulary, and the AIP \xA71.3 recommendation to encode a merchant taxonomy through it is retracted. Credentials issued against a schema version that accepts it will continue to deny"
  },
  {
    container: "authorizationConfig.policy",
    property: "escalation_threshold",
    reason: "declared here in the v2.1 lineage and never enforced: the evaluator emitted a NOTE saying human notification was expected upstream, which silently auto-approved every payment between the threshold and the per-transaction ceiling. Relocated to actionScope.escalationThreshold, which is an enumerated surface where an unknown key fails closed, and which requires actionScope.approvers so the band has somewhere to route. A credential declaring the old field names a constraint no evaluator honours, so it is refused rather than noted"
  },
  {
    container: "actionScope",
    property: "cancellationAuthority",
    // NAMES THE SERVED SCHEMA VERSIONS, WHICH ARE FACTS. v2.5 is published and frozen at
    // observerprotocol.org/schemas/delegation/v2.5.json, so naming it here cannot go stale
    // the way "withdrawn at v2.5" would have.
    //
    // THE CASE THIS EXISTS FOR IS ABSENCE, NOT PRESENCE. A credential issued against v2.1,
    // v2.3 or v2.4 carries no cancellationAuthority, because the field did not exist. That
    // is not a mandate refusing cancellation; it is a mandate that never spoke to the
    // question. Without this entry the two are indistinguishable, and the reassuring reading
    // wins: every cancellation under an older credential refuses, which is a blanket refusal
    // arriving through the credential's AGE rather than through any decision.
    //
    // So the engine reports not-expressed rather than no, and an agent is told to seek a
    // reissued credential instead of being told it may not cancel.
    reason: "introduced in delegation schema v2.5 and absent from v2.1/v2.3/v2.4, which predate it. A credential issued against those versions expressed NO cancellation authority, which is not the same as expressing that nobody may cancel. Cancellation under such a credential resolves to not-expressed rather than refused, and the remedy is a reissued credential rather than an escalation. The engine does not infer an authority the issuer never declared"
  },
  {
    container: "delegation.scope.spending_limits",
    property: "per_asset",
    reason: "per-asset caps are not evaluated by this engine (out of scope); the enforced path is per_rail.per_transaction"
  }
];
function declaredUnenforceable(container, property) {
  return DECLARED_UNENFORCEABLE.find((d) => d.container === container && d.property === property);
}
var KNOWN_COUNTERPARTY_KINDS = /* @__PURE__ */ new Set(["address", "did"]);
var KNOWN_PURCHASE_TERMS_TYPES = /* @__PURE__ */ new Map([
  ["ap2-cart-mandate", {
    signer: "merchant",
    why: "AP2 CartMandate. The merchant states items and an exact price and signs it, which is the price guarantee the protocol is built around."
  }],
  ["x402-payment-required", {
    signer: "resource server",
    why: "The 402 response IS the price statement on this rail, which is why x402 could never surface the need for this field."
  }],
  ["signed-invoice", {
    signer: "counterparty",
    why: "The party being paid states what is owed. The ordinary case, and the one v2.5 described as if it were the only one."
  }],
  ["payor-adjudication", {
    signer: "payor, who is NOT the counterparty",
    why: "A claims payout. The payor adjudicates and signs; the TPA is the constrained party; the counterparty is a claimant who signs nothing. NAIC model law requires that claims paid by a third-party administrator be paid only as authorized by the payor, so this is statutory rather than contractual. It is also the FIRST artifact requirement with a natural signer: the party who benefits from the control is not the party producing the evidence, which is the defect that sent payer consent to an external artifact."
  }]
]);

// src/core/denial.ts
var DENIAL_TAGS = [
  "allowed-rails",
  "asset",
  "category",
  "ceiling",
  "counterparty",
  "cross-rail",
  "did",
  "entry",
  "failClosed",
  "geographic",
  "issuer-class",
  "notional",
  "one-time",
  "per-rail-cap",
  "rails",
  "recurring",
  "same-currency",
  "spending-limits",
  "structure",
  "temporal",
  "trading-mandate",
  "unenforceable",
  "unknown-rule",
  "velocity",
  "revocation",
  "proof",
  "validity",
  "issuer-linkage",
  "bind",
  "url-guard"
];
function formatScaled(v, decimals) {
  if (decimals === 0) return v.toString();
  const s = 10n ** BigInt(decimals);
  const whole = v / s;
  const frac = (v % s).toString().padStart(decimals, "0").replace(/0+$/, "");
  return frac ? `${whole}.${frac}` : `${whole}`;
}
function capDetail(args) {
  const { tag, constraint, cap, observed, priorTotal = 0n, decimals, unit } = args;
  const headroom = cap > priorTotal ? cap - priorTotal : 0n;
  return {
    tag,
    constraint,
    limit: formatScaled(cap, decimals),
    observed: formatScaled(observed, decimals),
    headroom: formatScaled(headroom, decimals),
    unit,
    ...headroom > 0n ? { remedy: `a request at or below ${formatScaled(headroom, decimals)} ${unit} is within this cap` } : {}
  };
}
var NON_NEGOTIABLE = "This limit is set by the principal in a signed credential and cannot be raised by this request, by retrying, or by asking differently.";

// src/core/mandate.ts
var ESCALATION_SCOPE_KEY = "escalationThreshold";
var deny = (reason, notes, detail) => detail ? { ok: false, reason, notes, detail } : { ok: false, reason, notes };
function parseDecimalScaled(amount, decimals) {
  const m = /^(\d+)(?:\.(\d+))?$/.exec(amount.trim());
  if (!m) throw new Error(`amount ${JSON.stringify(amount)} is not a plain decimal string`);
  const whole = m[1];
  const frac = m[2] ?? "";
  if (frac.length > decimals) {
    throw new Error(`amount ${amount} has more fractional digits than the rail supports (${decimals})`);
  }
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(frac.padEnd(decimals, "0") || "0");
}
function parseIntegerValue(value) {
  if (!/^\d+$/.test(value)) throw new Error(`transaction.value ${JSON.stringify(value)} is not an integer string`);
  return BigInt(value);
}
function entryValue(e) {
  if (typeof e === "string") return { value: e };
  if (!KNOWN_COUNTERPARTY_KINDS.has(e.kind)) return { unknownKind: e.kind };
  return { value: e.value };
}
function matchCounterparty(to, list, map, caseExact) {
  const norm = (s) => caseExact ? s : s.toLowerCase();
  const target = norm(to);
  const unmappedDids = [];
  const unknownKinds = [];
  for (const raw of list) {
    const flat = entryValue(raw);
    if ("unknownKind" in flat) {
      unknownKinds.push(flat.unknownKind);
      continue;
    }
    const entry = flat.value;
    if (entry.startsWith("did:")) {
      const addrs = map?.[entry];
      if (!addrs) {
        unmappedDids.push(entry);
        continue;
      }
      if (addrs.some((a) => norm(a) === target)) return { matched: true, unmappedDids, unknownKinds };
    } else if (norm(entry) === target) {
      return { matched: true, unmappedDids, unknownKinds };
    }
  }
  return { matched: false, unmappedDids, unknownKinds };
}
function inTimeWindows(windows, atMs) {
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  for (const w of windows) {
    let parts;
    try {
      parts = new Intl.DateTimeFormat("en-US", {
        timeZone: w.timezone,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short"
      }).formatToParts(new Date(atMs));
    } catch {
      continue;
    }
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
    const hour = get("hour") === "24" ? "00" : get("hour");
    const hhmm = `${hour}:${get("minute")}`;
    const weekday = get("weekday").toLowerCase().slice(0, 3);
    if (w.daysOfWeek && w.daysOfWeek.length > 0 && !w.daysOfWeek.includes(weekday)) continue;
    if (!dayNames.includes(weekday)) continue;
    if (w.start <= w.end ? hhmm >= w.start && hhmm <= w.end : hhmm >= w.start || hhmm <= w.end) return true;
  }
  return false;
}
function railMatches(entry, railDef, chainId) {
  return entry === railDef.rail || entry === chainId;
}
function evaluateMandate(ctx, cred, config, resolved) {
  const notes = [];
  const subject = cred.credentialSubject;
  const scope = subject.actionScope;
  const tm = subject.tradingMandate;
  const nowMs = Date.parse(ctx.timestamp) || Date.now();
  const railDef = config.rails[ctx.chain_id];
  if (!railDef) {
    return deny(
      `[rails] chain ${ctx.chain_id} has no rail mapping in config.rails \u2014 cannot establish mandate scope on an unmapped chain`,
      notes
    );
  }
  if (Array.isArray(scope?.requiredPurchaseTerms) && scope.requiredPurchaseTerms.length > 0) {
    const accepted = scope.requiredPurchaseTerms;
    const presented = ctx.purchase_terms;
    const unknownAccepted = accepted.filter((t) => !KNOWN_PURCHASE_TERMS_TYPES.has(t));
    if (unknownAccepted.length > 0) {
      return deny(
        `[purchase-terms] mandate accepts artifact type(s) this engine does not recognize: ${unknownAccepted.join(", ")}. Recognized: ${[...KNOWN_PURCHASE_TERMS_TYPES.keys()].join(", ")}. An open vocabulary is not an open door: a type we cannot evaluate is a control we cannot perform, so the credential is refused rather than partially honoured`,
        notes
      );
    }
    if (!presented) {
      return deny(
        `[purchase-terms] this mandate requires a signed statement of what is owed (${accepted.join(" or ")}) and none was presented. ABSENT IS NOT EMPTY: a payment with no stated terms is the agent asserting, unchallenged, what the other party wanted`,
        notes
      );
    }
    if (!presented.verified) {
      return deny(
        `[purchase-terms] the presented ${presented.type} was not verified. This engine refuses an unverified artifact rather than accepting one on the strength of its shape: an artifact read as evidence of itself is not evidence`,
        notes
      );
    }
    if (!accepted.includes(presented.type)) {
      return deny(
        `[purchase-terms] presented ${presented.type}, which this mandate does not accept (accepts ${accepted.join(", ")})`,
        notes
      );
    }
    const known = KNOWN_PURCHASE_TERMS_TYPES.get(presented.type);
    notes.push(`[purchase-terms] ${presented.type} accepted, signed by ${known?.signer ?? "an unrecorded party"}`);
  }
  const cpCaseExact = railDef.family !== "evm";
  notes.push(...resolved.notes);
  const tx = ctx.transaction ?? {};
  const delegation = subject.delegation;
  if (delegation !== void 0) {
    const scopeObj = delegation.scope;
    const spending = scopeObj?.spending_limits;
    if (!spending || typeof spending !== "object" || typeof spending.per_rail !== "object" || spending.per_rail === null) {
      return deny("[failClosed] credentialSubject.delegation without a recognized scope.spending_limits.per_rail shape \u2014 refusing to enforce a mandate it cannot fully read", notes);
    }
    const perRail = spending.per_rail[railDef.rail] ?? spending.per_rail[ctx.chain_id];
    if (!perRail || typeof perRail !== "object") {
      return deny(`[spending-limits] no per_rail entry for ${railDef.rail} \u2014 no authority on this rail (fail-closed)`, notes);
    }
    if (perRail.per_asset !== void 0) {
      return deny("[spending-limits] per_asset caps are not evaluated by this engine (per-asset enforcement is out of scope for this engine) \u2014 fail-closed", notes);
    }
    if (resolved.unenforceable) {
      return deny(`[unenforceable] ${resolved.unenforceable} \u2014 spending_limits cap cannot be established`, notes);
    }
    const pt = perRail.per_transaction;
    if (!pt || pt.max_amount === void 0 || pt.currency === void 0) {
      return deny("[spending-limits] per_transaction.{max_amount,currency} required to establish the cap (fail-closed)", notes);
    }
    if (resolved.assetSymbol !== void 0 && pt.currency !== resolved.assetSymbol) {
      return deny(`[spending-limits] same-currency invariant: cap currency ${pt.currency} != transferred ${resolved.assetSymbol} (no FX)`, notes);
    }
    if (resolved.amount === void 0 || resolved.decimals === void 0) {
      return deny("[spending-limits] transfer amount/decimals unavailable \u2014 cannot establish the per_transaction cap (fail-closed)", notes);
    }
    const cap = parseDecimalScaled(pt.max_amount, resolved.decimals);
    if (resolved.amount > cap) {
      return deny(
        `[spending-limits] value ${formatScaled(resolved.amount, resolved.decimals)} exceeds per_transaction cap ${pt.max_amount} ${pt.currency} on ${railDef.rail}. ${NON_NEGOTIABLE}`,
        notes,
        capDetail({ tag: "spending-limits", constraint: "delegation.scope.spending_limits.per_rail.per_transaction.max_amount", cap, observed: resolved.amount, decimals: resolved.decimals, unit: pt.currency })
      );
    }
    if (perRail.per_day !== void 0) {
      const dailyTotal = ctx.spending?.daily_total !== void 0 ? parseIntegerValue(ctx.spending.daily_total) : void 0;
      if (dailyTotal === void 0) {
        return deny("[spending-limits] per_day cap present but no daily counter supplied \u2014 fail-closed", notes);
      }
      if (perRail.per_day.max_amount !== void 0) {
        const dcap = parseDecimalScaled(perRail.per_day.max_amount, resolved.decimals);
        if (dailyTotal + resolved.amount > dcap) {
          return deny(
            `[spending-limits] 24h volume would exceed per_day cap ${perRail.per_day.max_amount} ${perRail.per_day.currency ?? pt.currency} on ${railDef.rail}. ${NON_NEGOTIABLE}`,
            notes,
            capDetail({ tag: "spending-limits", constraint: "delegation.scope.spending_limits.per_rail.per_day.max_amount", cap: dcap, observed: dailyTotal + resolved.amount, priorTotal: dailyTotal, decimals: resolved.decimals, unit: perRail.per_day.currency ?? pt.currency })
          );
        }
      }
    }
    return { ok: true, reason: "spending_limits satisfied", notes };
  }
  const authCfg = subject.authorizationConfig;
  const level = subject.authorizationLevel;
  const needsAmount = scope.per_transaction_ceiling !== void 0 || tm?.maxNotionalPerOrder !== void 0 || tm?.velocity?.dailyVolumeCap !== void 0 || tm?.velocity?.monthlyVolumeCap !== void 0 || tm?.crossRailBudget !== void 0 || level === "one-time" && !!authCfg?.oneTime || level === "recurring" && !!authCfg?.recurring || level === "policy" && !!authCfg?.policy?.per_rail_caps;
  const needsCounterparty = level === "one-time" && !!authCfg?.oneTime || level === "recurring" && !!authCfg?.recurring || (tm?.counterparty?.allowList?.length ?? 0) > 0 || (tm?.counterparty?.blockList?.length ?? 0) > 0;
  let asset = resolved.assetSymbol;
  let decimals = resolved.decimals ?? railDef.decimals;
  let value = resolved.amount;
  let to = resolved.recipient;
  if ((needsAmount || needsCounterparty) && resolved.unenforceable) {
    const evmNativeFallback = config.allowContractCalls && railDef.family === "evm" && typeof tx.value === "string";
    if (!evmNativeFallback) {
      return deny(`[unenforceable] ${resolved.unenforceable}`, notes);
    }
    value = parseIntegerValue(tx.value);
    asset = railDef.currency;
    decimals = railDef.decimals;
    to = typeof tx.to === "string" ? tx.to : void 0;
    notes.push(
      "allowContractCalls=true: an unrecognised call was measured by NATIVE value only \u2014 token/contract spend may bypass amount ceilings"
    );
  }
  if (needsCounterparty && to === void 0) {
    return deny(
      "[counterparty] the transaction has no resolvable recipient but the mandate binds counterparties \u2014 cannot establish who receives",
      notes
    );
  }
  if (needsCounterparty && resolved.recipientKind === "spl-token-account") {
    notes.push(
      "counterparty matching on this SPL transfer is against the destination TOKEN ACCOUNT address; matching by wallet/DID requires that token account to be listed in the allowlist or counterpartyAddressMap (owner resolution is not done offline)"
    );
  }
  const sameCurrencyOrDeny = (currency, what) => {
    if (asset === void 0) {
      return deny(`[same-currency] ${what} requires a known asset but the transfer asset could not be established`, notes);
    }
    if (currency !== asset) {
      return deny(
        `[same-currency] ${what} is denominated in ${currency} but this transfer moves ${asset} \u2014 no FX conversion is performed (AIP v0.8 same-currency invariant), so scope cannot be established`,
        notes
      );
    }
    return null;
  };
  if (scope.allowed_rails && scope.allowed_rails.length > 0) {
    if (!scope.allowed_rails.some((r) => railMatches(r, railDef, ctx.chain_id))) {
      return deny(
        `[allowed-rails] rail ${railDef.rail} (${ctx.chain_id}) is not in the mandate's allowed_rails [${scope.allowed_rails.join(", ")}]`,
        notes
      );
    }
  }
  if (scope.per_transaction_ceiling) {
    const c = scope.per_transaction_ceiling;
    const mismatch = sameCurrencyOrDeny(c.currency, "per_transaction_ceiling");
    if (mismatch) return mismatch;
    const ceiling = parseDecimalScaled(c.amount, decimals);
    if (value > ceiling) {
      return deny(
        `[ceiling] transaction value exceeds per_transaction_ceiling of ${c.amount} ${c.currency}. ${NON_NEGOTIABLE}`,
        notes,
        capDetail({ tag: "ceiling", constraint: "actionScope.per_transaction_ceiling", cap: ceiling, observed: value, decimals, unit: c.currency })
      );
    }
  }
  if (scope[ESCALATION_SCOPE_KEY]) {
    const t = scope[ESCALATION_SCOPE_KEY];
    const mismatch = sameCurrencyOrDeny(t.currency, ESCALATION_SCOPE_KEY);
    if (mismatch) return mismatch;
    const threshold = parseDecimalScaled(t.amount, decimals);
    if (value >= threshold) {
      return {
        ok: false,
        reason: `[escalation] transaction value ${formatScaled(value, decimals)} ${t.currency} is at or above the escalationThreshold of ${t.amount} ${t.currency}; a human approver must authorise it`,
        notes,
        escalation: {
          threshold: { amount: t.amount, currency: t.currency },
          requested: { amount: formatScaled(value, decimals), currency: t.currency },
          // FROM `approvers.keys`, WHICH IS THE SHAPE THE SCHEMA DEFINES. This read
          // `Array.isArray(scope.approvers)`, and delegation v2.6 defines the field as an OBJECT
          // carrying `keys`. So a schema-VALID credential naming an approver escalated with
          // `approvers: []`: the mandate panel showed a named approver and the approval record showed
          // nobody. Fixed here rather than downstream, because a consumer filling the list in from the
          // credential would be producing a verdict's contents rather than reading them.
          approvers: Array.isArray(scope.approvers?.keys) ? scope.approvers.keys : [],
          // WHICH RULE ROUTED THIS, from the same symbol the rule reads. See ESCALATION_SCOPE_KEY.
          constraint: `actionScope.${ESCALATION_SCOPE_KEY}`
        }
      };
    }
  }
  if (scope.allowed_transaction_categories && scope.allowed_transaction_categories.length > 0) {
    if (!config.transactionCategory) {
      return deny(
        "[category] mandate restricts allowed_transaction_categories but config.transactionCategory is not declared for this key \u2014 cannot establish the category of this transaction",
        notes
      );
    }
    if (!scope.allowed_transaction_categories.includes(config.transactionCategory)) {
      return deny(
        `[category] declared category ${config.transactionCategory} is not in allowed_transaction_categories [${scope.allowed_transaction_categories.join(", ")}]`,
        notes
      );
    }
  }
  for (const key of Object.keys(scope)) {
    if (!KNOWN_SCOPE_KEYS.has(key)) {
      const known = declaredUnenforceable("actionScope", key);
      if (known) {
        return deny(
          `[unenforceable] actionScope.${key}: ${known.reason}`,
          notes,
          { tag: "unenforceable", constraint: `actionScope.${key}`, terminal: true }
        );
      }
      return deny(
        `[unknown-rule] unrecognized actionScope constraint "${key}" \u2014 cannot evaluate; fail-closed per AIP v0.8`,
        notes,
        { tag: "unknown-rule", constraint: `actionScope.${key}`, terminal: true }
      );
    }
  }
  const checkCounterpartyDid = (did, label) => {
    const { matched, unmappedDids } = matchCounterparty(to, [did], config.counterpartyAddressMap, cpCaseExact);
    if (matched) return null;
    if (unmappedDids.length > 0) {
      return deny(
        `[counterparty] ${label} pins counterparty ${did} but no address mapping exists in config.counterpartyAddressMap \u2014 cannot establish that ${to} is that counterparty`,
        notes
      );
    }
    return deny(`[counterparty] recipient ${to} is not the ${label} counterparty ${did}`, notes);
  };
  if (level === "one-time" && authCfg?.oneTime) {
    const ot = authCfg.oneTime;
    if (!railMatches(ot.rail, railDef, ctx.chain_id)) {
      return deny(`[one-time] authorized rail is ${ot.rail}, not ${railDef.rail} (${ctx.chain_id})`, notes);
    }
    const mismatch = sameCurrencyOrDeny(ot.currency, "one-time amount");
    if (mismatch) return mismatch;
    const exact = parseDecimalScaled(ot.amount, decimals);
    if (value !== exact) {
      return deny(`[one-time] amount must be exactly ${ot.amount} ${ot.currency}`, notes);
    }
    if (ot.execution_deadline && nowMs > Date.parse(ot.execution_deadline)) {
      return deny(`[one-time] execution_deadline ${ot.execution_deadline} has passed`, notes);
    }
    const cp = checkCounterpartyDid(ot.counterparty_did, "one-time");
    if (cp) return cp;
    notes.push("one-time credential: single-use consumption is not trackable at this layer \u2014 revoke after settlement");
  }
  if (level === "recurring" && authCfg?.recurring) {
    const rc = authCfg.recurring;
    if (rc.valid_until && nowMs > Date.parse(rc.valid_until)) {
      return deny(`[recurring] authorization expired (valid_until ${rc.valid_until})`, notes);
    }
    if (rc.allowed_rails && rc.allowed_rails.length > 0 && !rc.allowed_rails.some((r) => railMatches(r, railDef, ctx.chain_id))) {
      return deny(`[recurring] rail ${railDef.rail} not in recurring allowed_rails [${rc.allowed_rails.join(", ")}]`, notes);
    }
    const cp = checkCounterpartyDid(rc.counterparty_did, "recurring");
    if (cp) return cp;
    const mismatch = sameCurrencyOrDeny(rc.ceiling_currency, "recurring ceiling");
    if (mismatch) return mismatch;
    if (rc.per_transaction_max !== void 0) {
      const cap = parseDecimalScaled(rc.per_transaction_max, decimals);
      if (value > cap) {
        return deny(`[recurring] value exceeds per_transaction_max ${rc.per_transaction_max} ${rc.ceiling_currency}`, notes);
      }
    }
    const ceiling = parseDecimalScaled(rc.ceiling_amount, decimals);
    const dailyTotal = ctx.spending?.daily_total !== void 0 ? parseIntegerValue(ctx.spending.daily_total) : void 0;
    if (dailyTotal !== void 0 && dailyTotal + value > ceiling) {
      return deny(
        `[recurring] this key's observed spend today plus this transaction exceeds the recurring ceiling ${rc.ceiling_amount} ${rc.ceiling_currency} (period ${rc.period})`,
        notes
      );
    }
    notes.push(
      `recurring ceiling ${rc.ceiling_amount}/${rc.period}: enforced deny-side only \u2014 the available counter is per-API-key, per-day, native-value; full-period accounting needs a stateful evaluator`
    );
  }
  if (level === "policy" && authCfg?.policy) {
    const pol = authCfg.policy;
    const caps = pol.per_rail_caps?.[railDef.rail] ?? pol.per_rail_caps?.[ctx.chain_id];
    if (caps) {
      const capCurrency = caps.currency ?? asset ?? railDef.currency;
      const mismatch = sameCurrencyOrDeny(capCurrency, `per_rail_caps[${railDef.rail}]`);
      if (mismatch) return mismatch;
      if (caps.per_transaction !== void 0) {
        const cap = parseDecimalScaled(caps.per_transaction, decimals);
        if (value > cap) {
          return deny(`[per-rail-cap] value exceeds per_transaction cap ${caps.per_transaction} ${capCurrency} on ${railDef.rail}`, notes);
        }
      }
      if (caps.aggregate !== void 0) {
        const agg = parseDecimalScaled(caps.aggregate, decimals);
        const dailyTotal = ctx.spending?.daily_total !== void 0 ? parseIntegerValue(ctx.spending.daily_total) : void 0;
        if (dailyTotal !== void 0 && dailyTotal + value > agg) {
          return deny(`[per-rail-cap] observed spend today plus this transaction exceeds aggregate cap ${caps.aggregate} ${capCurrency} on ${railDef.rail}`, notes);
        }
        notes.push(`per-rail aggregate cap: enforced deny-side only via the per-key daily counter (period ${caps.period ?? "unspecified"})`);
      }
    }
    if (pol.rail_preference && !pol.rail_preference.some((r) => railMatches(r, railDef, ctx.chain_id))) {
      notes.push(`rail ${railDef.rail} is outside the policy rail_preference list (preference ordering is advisory)`);
    }
    if (pol.escalation_threshold !== void 0) {
      const known = declaredUnenforceable("authorizationConfig.policy", "escalation_threshold");
      return deny(
        `[unenforceable] authorizationConfig.policy.escalation_threshold: ${known?.reason ?? "not enforced at this layer"}`,
        notes
      );
    }
  }
  if (tm) {
    if (tm.maxNotionalPerOrder !== void 0) {
      if (!tm.unit) return deny("[trading-mandate] maxNotionalPerOrder present without unit \u2014 verifiers MUST NOT infer units", notes);
      const mismatch = sameCurrencyOrDeny(tm.unit, "tradingMandate.maxNotionalPerOrder");
      if (mismatch) return mismatch;
      const cap = BigInt(tm.maxNotionalPerOrder) * 10n ** BigInt(decimals);
      if (value > cap) {
        return deny(
          `[notional] transaction value exceeds maxNotionalPerOrder ${tm.maxNotionalPerOrder} ${tm.unit}. ${NON_NEGOTIABLE}`,
          notes,
          capDetail({ tag: "notional", constraint: "tradingMandate.maxNotionalPerOrder", cap, observed: value, decimals, unit: tm.unit })
        );
      }
    }
    const cp = tm.counterparty;
    if (cp?.blockList && cp.blockList.length > 0 && to) {
      const { matched, unknownKinds } = matchCounterparty(to, cp.blockList, config.counterpartyAddressMap, cpCaseExact);
      if (unknownKinds.length > 0) {
        return deny(
          `[counterparty] blockList carries counterparty identifier kind(s) [${unknownKinds.join(", ")}] this engine cannot match; recognized: [${[...KNOWN_COUNTERPARTY_KINDS].join(", ")}]. An unmatched blockList entry would mean the list silently blocked nothing, so this fails closed`,
          notes,
          { tag: "counterparty", constraint: "tradingMandate.counterparty.blockList", terminal: true }
        );
      }
      if (matched) return deny(
        `[counterparty] recipient ${to} is on the mandate blockList`,
        notes,
        { tag: "counterparty", constraint: "tradingMandate.counterparty.blockList", terminal: true }
      );
    }
    if (cp?.allowList && cp.allowList.length > 0) {
      const { matched, unmappedDids, unknownKinds } = matchCounterparty(to, cp.allowList, config.counterpartyAddressMap, cpCaseExact);
      if (!matched && unknownKinds.length > 0) {
        return deny(
          `[counterparty] recipient ${to} matched no readable allowList entry, and the list carries identifier kind(s) [${unknownKinds.join(", ")}] this engine cannot match; recognized: [${[...KNOWN_COUNTERPARTY_KINDS].join(", ")}]. The kind vocabulary is open by design so a new rail needs no new schema version; an unreadable entry means this engine cannot say whether the recipient was permitted, which is not the same as saying it was not`,
          notes,
          { tag: "counterparty", constraint: "tradingMandate.counterparty.allowList", terminal: true }
        );
      }
      if (!matched) {
        const hint = unmappedDids.length > 0 ? ` (${unmappedDids.length} DID entr${unmappedDids.length === 1 ? "y" : "ies"} had no address mapping in config.counterpartyAddressMap)` : "";
        return deny(`[counterparty] recipient ${to} is not on the mandate allowList${hint}`, notes);
      }
    }
    if (cp?.requireIssuerClassIn && cp.requireIssuerClassIn.length > 0) {
      return deny(
        "[issuer-class] mandate requires counterparty issuer_class verification, but this verifier has no attestation source for the recipient \u2014 cannot establish issuer class (fail closed)",
        notes
      );
    }
    if (tm.temporal?.allowedTimeWindows && tm.temporal.allowedTimeWindows.length > 0) {
      if (!inTimeWindows(tm.temporal.allowedTimeWindows, nowMs)) {
        return deny("[temporal] transaction time is outside the mandate allowedTimeWindows", notes);
      }
    }
    if (tm.geographic?.allowedJurisdictionsOnly && tm.geographic.allowedJurisdictionsOnly.length > 0) {
      return deny(
        "[geographic] mandate restricts to allowedJurisdictionsOnly and the counterparty jurisdiction is unknown at this layer (fail-closed per AIP v0.8 \xA72.3)",
        notes
      );
    }
    if (tm.geographic?.blockedJurisdictions && tm.geographic.blockedJurisdictions.length > 0) {
      notes.push("blockedJurisdictions declared: counterparty jurisdiction unknown at this layer \u2014 fail-open per AIP v0.8 \xA72.3, NOT ENFORCED");
    }
    const vel = tm.velocity;
    if (vel && (vel.dailyVolumeCap !== void 0 || vel.monthlyVolumeCap !== void 0)) {
      if (!tm.unit) return deny("[velocity] velocity caps present without tradingMandate.unit", notes);
      const mismatch = sameCurrencyOrDeny(tm.unit, "tradingMandate.velocity caps");
      if (mismatch) return mismatch;
      const dailyTotal = ctx.spending?.daily_total !== void 0 ? parseIntegerValue(ctx.spending.daily_total) : void 0;
      if (dailyTotal === void 0) {
        return deny("[velocity] mandate carries velocity caps but the signing context provided no spending.daily_total counter", notes);
      }
      const projected = dailyTotal + value;
      const scale = 10n ** BigInt(decimals);
      if (vel.dailyVolumeCap !== void 0 && projected > BigInt(vel.dailyVolumeCap) * scale) {
        return deny(
          `[velocity] projected daily volume exceeds dailyVolumeCap ${vel.dailyVolumeCap} ${tm.unit}. ${NON_NEGOTIABLE}`,
          notes,
          capDetail({ tag: "velocity", constraint: "tradingMandate.velocity.dailyVolumeCap", cap: BigInt(vel.dailyVolumeCap) * scale, observed: projected, priorTotal: dailyTotal, decimals, unit: tm.unit })
        );
      }
      if (vel.monthlyVolumeCap !== void 0) {
        const monthlyTotal = ctx.spending?.monthly_total !== void 0 ? parseIntegerValue(ctx.spending.monthly_total) : void 0;
        if (monthlyTotal === void 0) {
          return deny(
            "[velocity] mandate carries monthlyVolumeCap but the signing context provided no spending.monthly_total counter (30-day window cannot be established) \u2014 fail-closed",
            notes
          );
        }
        if (monthlyTotal + value > BigInt(vel.monthlyVolumeCap) * scale) {
          return deny(
            `[velocity] projected 30-day volume exceeds monthlyVolumeCap ${vel.monthlyVolumeCap} ${tm.unit}. ${NON_NEGOTIABLE}`,
            notes,
            capDetail({ tag: "velocity", constraint: "tradingMandate.velocity.monthlyVolumeCap", cap: BigInt(vel.monthlyVolumeCap) * scale, observed: monthlyTotal + value, priorTotal: monthlyTotal, decimals, unit: tm.unit })
          );
        }
      }
      notes.push("velocity caps enforced against the supplied rolling counters; a cap whose counter is unestablished denies rather than being skipped");
    }
    const crb = tm.crossRailBudget;
    if (crb) {
      if (typeof crb.amount !== "string" || typeof crb.currency !== "string" || !crb.rates || typeof crb.rates !== "object") {
        return deny("[cross-rail] crossRailBudget requires amount, currency and rates \u2014 malformed budget cannot be evaluated", notes);
      }
      if (crb.window !== "P1D") {
        return deny(`[cross-rail] window ${JSON.stringify(crb.window)} is not supported by this evaluator (only P1D / rolling 24h) \u2014 cannot establish the accounting window`, notes);
      }
      if (asset === void 0 || value === void 0) {
        return deny("[cross-rail] the transfer asset/amount could not be established but the mandate carries a cross-rail budget", notes);
      }
      const rate = crb.rates[asset];
      if (rate === void 0) {
        return deny(`[cross-rail] no principal-attested rate for ${asset} in crossRailBudget.rates \u2014 this asset cannot be scoped against the ${crb.currency} budget`, notes);
      }
      const cr = ctx.cross_rail;
      if (!cr) {
        return deny("[cross-rail] mandate carries a crossRailBudget but the signing context supplied no cross-rail counter (ctx.cross_rail)", notes);
      }
      if (cr.currency !== crb.currency) {
        return deny(`[cross-rail] supplied counter is denominated in ${cr.currency} but the budget is ${crb.currency} \u2014 totals are not comparable`, notes);
      }
      let converted;
      let cap;
      let priorTotal;
      try {
        converted = convertToBudgetUnits(value, decimals, rate);
        cap = parseDecimalScaled(crb.amount, CROSS_RAIL_SCALE);
        priorTotal = parseIntegerValue(cr.total);
      } catch (e) {
        return deny(`[cross-rail] ${e.message}`, notes);
      }
      const projected = priorTotal + converted;
      if (projected > cap) {
        return deny(
          `[cross-rail] projected rolling-24h cross-rail spend ${formatBudgetUnits(projected)} ${crb.currency} exceeds the budget ${crb.amount} ${crb.currency} (this payment: ${formatBudgetUnits(converted)} ${crb.currency} as ${asset} at the principal-attested rate ${rate})`,
          notes
        );
      }
      notes.push(
        `cross-rail budget: ${formatBudgetUnits(projected)} of ${crb.amount} ${crb.currency} consumed including this payment \u2014 counter is the shared rolling-24h ledger; rates are principal-attested in the mandate (no oracle)`
      );
    }
    if (tm.allowedVenues || tm.allowedInstruments || tm.dailyDrawdownCap) {
      notes.push(
        "order-plane constraints declared (allowedVenues/allowedInstruments/dailyDrawdownCap): NOT ENFORCED here \u2014 these require order context and belong to an order-aware Observer Protocol evaluator"
      );
    }
    for (const key of Object.keys(tm)) {
      if (!KNOWN_TM_KEYS.has(key)) {
        const known = declaredUnenforceable("tradingMandate", key);
        if (known) {
          return deny(
            `[unenforceable] tradingMandate.${key}: ${known.reason}`,
            notes,
            { tag: "unenforceable", constraint: `tradingMandate.${key}`, terminal: true }
          );
        }
        return deny(
          `[unknown-rule] unrecognized tradingMandate constraint "${key}" \u2014 cannot evaluate; fail-closed per AIP v0.8`,
          notes
        );
      }
    }
  }
  if (scope.cumulative_budget) {
    notes.push(
      `cumulative_budget declared (${scope.cumulative_budget.amount} ${scope.cumulative_budget.currency} over ${scope.cumulative_budget.window}): advisory per AIP v0.8 \u2014 not enforced at this layer; enforced path: tradingMandate.velocity.dailyVolumeCap or monthlyVolumeCap`
    );
  }
  if (scope.geographic_restriction) {
    notes.push(
      "actionScope.geographic_restriction declared: advisory per AIP v0.8 \u2014 not enforced at this layer; enforced path: tradingMandate.geographic.allowedJurisdictionsOnly (fail-closed) or blockedJurisdictions (fail-open)"
    );
  }
  return { ok: true, reason: "mandate satisfied", notes };
}

// src/core/verify.ts
async function verifyCredential(config, nowMs) {
  let cred;
  try {
    cred = JSON.parse((0, import_node_fs4.readFileSync)(config.credentialPath, "utf8"));
  } catch (e) {
    return { allow: false, reason: `[credential] cannot read ${config.credentialPath}: ${e.message}`, notes: [] };
  }
  return verifyCredentialObject(cred, config, nowMs);
}
async function verifyCredentialObject(cred, config, nowMs) {
  const structure = validateStructure(cred, config);
  if (!structure.ok) return { allow: false, reason: `[schema] ${structure.reason}`, notes: [] };
  return verifyCredentialCrypto(cred, config, nowMs);
}
async function verifyCredentialCrypto(cred, config, nowMs) {
  const notes = [];
  const checks = {};
  const window = checkValidityWindow(cred, nowMs);
  if (!window.ok) return { allow: false, reason: window.reason ?? "[validity] credential not currently valid", notes };
  checks.validityWindow = "passed";
  const rawIssuer = cred.issuer;
  const issuerId = typeof rawIssuer === "string" ? rawIssuer : rawIssuer && typeof rawIssuer === "object" && typeof rawIssuer.id === "string" ? rawIssuer.id : void 0;
  if (!issuerId) return { allow: false, reason: "[proof] credential issuer is missing or malformed", notes };
  try {
    const { doc, note } = await resolveDidDocument(issuerId, {
      cacheDir: config.cacheDir,
      timeoutMs: config.revocation.fetchTimeoutMs,
      maxStalenessHours: config.didCache.maxStalenessHours,
      offlinePath: config.offline?.didDocumentPath
    });
    if (note) notes.push(note);
    if (doc.id !== issuerId) {
      return { allow: false, reason: `[did] resolved DID document id ${doc.id} does not match issuer ${issuerId}`, notes };
    }
    checks.issuerResolution = config.offline?.didDocumentPath ? "offline-pinned" : issuerId.startsWith("did:key:") ? "did:key-inline" : "network";
    const vmId = cred.proof?.verificationMethod;
    if (!vmId) return { allow: false, reason: "[proof] proof.verificationMethod missing", notes };
    if (!vmId.startsWith(issuerId + "#")) {
      return { allow: false, reason: `[proof] verificationMethod ${vmId} is not a key of the issuer ${issuerId}`, notes };
    }
    const { entry } = findAssertionMethodKey(doc, vmId);
    if (!entry.publicKeyMultibase) {
      return { allow: false, reason: `[did] verification method ${entry.id} has no publicKeyMultibase`, notes };
    }
    const { key, note: keyNote } = decodeEd25519Multibase(entry.publicKeyMultibase);
    if (keyNote) notes.push(keyNote);
    const proofResult = verifyEddsaJcs2022(cred, key);
    notes.push(...proofResult.notes);
    if (!proofResult.ok) return { allow: false, reason: `[proof] ${proofResult.reason}`, notes };
    checks.issuerProof = "eddsa-jcs-2022-verified";
    const signingDid = vmId.includes("#") ? vmId.split("#")[0] : vmId;
    if (config.agentDid && signingDid === config.agentDid) {
      return {
        allow: false,
        reason: "[signer-boundary] mandate signing key is agent-controlled \u2014 a principal key is required (operator key in dev mode, OP key in full mode)",
        notes
      };
    }
    checks.signerBoundary = config.agentDid ? "passed" : "not-configured";
  } catch (e) {
    return { allow: false, reason: `[proof] ${e.message}`, notes };
  }
  const rawStatus = cred.credentialStatus;
  let statusEntries;
  if (rawStatus === void 0 || rawStatus === null) {
    statusEntries = [];
  } else if (Array.isArray(rawStatus)) {
    statusEntries = rawStatus;
  } else if (typeof rawStatus === "object") {
    statusEntries = [rawStatus];
    notes.push("credentialStatus was a single object, not an array \u2014 accepted for compatibility; the schema requires an array");
  } else {
    return {
      allow: false,
      reason: `[revocation] credentialStatus must be an array or a single entry object, got ${typeof rawStatus}`,
      notes
    };
  }
  if (statusEntries.length > 0) {
    for (const entry of statusEntries) {
      try {
        const outcome = await checkStatusEntry(entry, config);
        notes.push(...outcome.notes);
        if (outcome.revoked) return { allow: false, reason: `[revocation] ${outcome.detail}`, notes };
      } catch (e) {
        return { allow: false, reason: `[revocation] status could not be established: ${e.message}`, notes };
      }
    }
    checks.revocation = "not-revoked";
  } else {
    notes.push("credential carries no credentialStatus entry \u2014 revocation not checkable for this credential");
    checks.revocation = "status-absent";
  }
  return { allow: true, reason: "credential verified", notes, cred, checks };
}
function enforceMandate(ctx, cred, config, resolved) {
  const railDef = config.rails[ctx.chain_id];
  if (!railDef) {
    return { allow: false, reason: `[rails] chain ${ctx.chain_id} has no rail mapping in config.rails`, notes: [] };
  }
  const mandate = evaluateMandate(ctx, cred, config, resolved);
  if (!mandate.ok && mandate.escalation) {
    return { allow: false, reason: mandate.reason, notes: mandate.notes, escalation: mandate.escalation };
  }
  if (!mandate.ok) {
    return mandate.detail ? { allow: false, reason: mandate.reason, notes: mandate.notes, detail: mandate.detail } : { allow: false, reason: mandate.reason, notes: mandate.notes };
  }
  return { allow: true, reason: mandate.reason, notes: mandate.notes };
}

// src/core/runtime-adapter.ts
var import_node_fs5 = require("node:fs");
async function verifyWbc(config, nowMs) {
  const notes = [];
  let wbc;
  try {
    wbc = JSON.parse((0, import_node_fs5.readFileSync)(config.walletBindingCredentialPath, "utf8"));
  } catch (e) {
    return { ok: false, reason: `cannot read WBC at ${config.walletBindingCredentialPath}: ${e.message}`, notes };
  }
  if (!wbc.issuer || typeof wbc.issuer !== "string") {
    return { ok: false, reason: "WBC missing issuer", notes };
  }
  if (!wbc.credentialSubject?.walletAddress) {
    return { ok: false, reason: "WBC credentialSubject.walletAddress missing", notes };
  }
  const from = Date.parse(wbc.validFrom);
  const until = wbc.validUntil ? Date.parse(wbc.validUntil) : Infinity;
  if (nowMs < from) return { ok: false, reason: `WBC not yet valid (validFrom ${wbc.validFrom})`, notes };
  if (nowMs > until) return { ok: false, reason: `WBC expired (validUntil ${wbc.validUntil})`, notes };
  try {
    const { doc, note } = await resolveDidDocument(wbc.issuer, {
      cacheDir: config.cacheDir,
      timeoutMs: config.revocation.fetchTimeoutMs,
      maxStalenessHours: config.didCache.maxStalenessHours
    });
    if (note) notes.push(note);
    const vmId = wbc.proof?.verificationMethod;
    if (!vmId) return { ok: false, reason: "WBC proof.verificationMethod missing", notes };
    if (!vmId.startsWith(wbc.issuer + "#")) {
      return {
        ok: false,
        reason: `WBC verificationMethod ${vmId} is not a key of the WBC issuer ${wbc.issuer}`,
        notes
      };
    }
    const { entry } = findAssertionMethodKey(doc, vmId);
    if (!entry.publicKeyMultibase) {
      return { ok: false, reason: `WBC verification method ${entry.id} has no publicKeyMultibase`, notes };
    }
    const { key, note: keyNote } = decodeEd25519Multibase(entry.publicKeyMultibase);
    if (keyNote) notes.push(`WBC issuer key: ${keyNote}`);
    const proofResult = verifyEddsaJcs2022(wbc, key);
    notes.push(...proofResult.notes);
    if (!proofResult.ok) return { ok: false, reason: `WBC proof: ${proofResult.reason}`, notes };
  } catch (e) {
    return { ok: false, reason: `WBC proof: ${e.message}`, notes };
  }
  return { ok: true, notes, wbc };
}
async function runRuntimeAdapter(ctx, config, resolved, nowMs) {
  const credVerdict = await verifyCredential(config, nowMs);
  if (!credVerdict.allow || !credVerdict.cred) return credVerdict;
  const mandate = credVerdict.cred;
  const notes = [...credVerdict.notes];
  if (!config.walletBindingCredentialPath) {
    const authResult2 = enforceMandate(ctx, mandate, config, resolved);
    return { ...authResult2, notes: [...notes, ...authResult2.notes] };
  }
  const wbcResult = await verifyWbc(config, nowMs);
  if (!wbcResult.ok) {
    return { allow: false, reason: `[bind] ${wbcResult.reason}`, notes: [...notes, ...wbcResult.notes] };
  }
  notes.push(...wbcResult.notes);
  const wbc = wbcResult.wbc;
  if (ctx.wallet_id && wbc.credentialSubject.walletAddress.toLowerCase() !== ctx.wallet_id.toLowerCase()) {
    return {
      allow: false,
      reason: `[bind] WBC walletAddress ${wbc.credentialSubject.walletAddress} does not match transaction wallet ${ctx.wallet_id}`,
      notes
    };
  }
  const wbcController = wbc.issuer;
  const mandatePrincipal = mandate.issuer;
  const mode = config.issuanceMode ?? wbc.credentialSubject.issuanceMode ?? "dev";
  if (mode === "dev") {
    if (wbcController !== mandatePrincipal) {
      return {
        allow: false,
        reason: `[issuer-linkage] dev-mode: WBC controller (${wbcController}) !== mandate principal (${mandatePrincipal}) \u2014 both must be the same operator DID`,
        notes
      };
    }
    notes.push(`issuer-linkage/dev: operator DID equality confirmed (${wbcController})`);
  } else {
    return {
      allow: false,
      reason: `[issuer-linkage] full-mode: L1 principal-binding chain verification required (wbcController=${wbcController}, mandatePrincipal=${mandatePrincipal}) \u2014 not implemented in v1 scaffold; wire cosign_verify gate before deploying full mode`,
      notes
    };
  }
  const authResult = enforceMandate(ctx, mandate, config, resolved);
  if (!authResult.allow) {
    return { ...authResult, notes: [...notes, ...authResult.notes] };
  }
  return { allow: true, reason: authResult.reason, notes: [...notes, ...authResult.notes] };
}

// src/core/version.ts
var CORE_VERSION = "1.0.0-rc.22".length > 0 ? "1.0.0-rc.22" : "0.0.0-unstamped";
var LEDGER_SAFE_FLOOR = "0.3.2";
function parse(v) {
  const m = /^(\d+)\.(\d+)\.(\d+)/.exec(v);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : [0, 0, 0];
}
function compareCoreVersion(a, b) {
  const [a0, a1, a2] = parse(a);
  const [b0, b1, b2] = parse(b);
  if (a0 !== b0) return a0 < b0 ? -1 : 1;
  if (a1 !== b1) return a1 < b1 ? -1 : 1;
  if (a2 !== b2) return a2 < b2 ? -1 : 1;
  return 0;
}
function assertLedgerCoreSafe(opts = {}) {
  const unstamped = CORE_VERSION === "0.0.0-unstamped";
  const safe = !unstamped && compareCoreVersion(CORE_VERSION, LEDGER_SAFE_FLOOR) >= 0;
  const status = { coreVersion: CORE_VERSION, floor: LEDGER_SAFE_FLOOR, safe, unstamped };
  if (!safe) {
    const msg = `[op-policy-engine] bundled core ${CORE_VERSION} is below the ledger-safe floor ${LEDGER_SAFE_FLOOR}` + (unstamped ? " (version stamp missing \u2014 built without --define)" : "") + `: the cross-rail ledger in this build may under-count or false-contend. Rebuild the adapter against @observer-protocol/policy-engine@^${LEDGER_SAFE_FLOOR}.`;
    if ((opts.mode ?? "warn") === "refuse") throw new Error(msg);
    (opts.logger ?? console.warn)(msg);
  }
  return status;
}

// src/core/audit.ts
var import_node_fs6 = require("node:fs");
var import_node_path3 = require("node:path");
function appendAudit(path, entry) {
  try {
    (0, import_node_fs6.mkdirSync)((0, import_node_path3.dirname)(path), { recursive: true });
    (0, import_node_fs6.appendFileSync)(path, JSON.stringify(entry) + "\n", { mode: 384 });
    return void 0;
  } catch (e) {
    return `audit log write failed: ${e.message}`;
  }
}

// src/core/config.ts
var import_node_os2 = require("node:os");
var import_node_path4 = require("node:path");
var DEFAULT_RAILS = {
  "eip155:1": { rail: "ethereum-mainnet", currency: "ETH", decimals: 18, family: "evm" },
  "eip155:8453": { rail: "base-mainnet", currency: "ETH", decimals: 18, family: "evm" },
  "eip155:137": { rail: "polygon-mainnet", currency: "POL", decimals: 18, family: "evm" },
  "eip155:42161": { rail: "arbitrum-one", currency: "ETH", decimals: 18, family: "evm" },
  "eip155:10": { rail: "optimism-mainnet", currency: "ETH", decimals: 18, family: "evm" },
  // Solana mainnet — CAIP-2 chain id IS the genesis-hash identifier. The
  // signed message carries a recentBlockhash, NOT the genesis hash, so the
  // cluster cannot be re-derived from the static payload offline; this
  // mapping is the source of truth for which cluster ctx.chain_id names.
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": { rail: "solana-mainnet", currency: "SOL", decimals: 9, family: "solana" },
  // Solana devnet, for completeness (distinct genesis-hash CAIP-2).
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1": { rail: "solana-devnet", currency: "SOL", decimals: 9, family: "solana" },
  "bip122:000000000019d6689c085ae165831e93": { rail: "bitcoin-mainnet", currency: "BTC", decimals: 8, family: "other" },
  "tron:mainnet": { rail: "usdt-trc20", currency: "TRX", decimals: 6, family: "other" }
};
function expandHome(p) {
  return p.startsWith("~/") ? (0, import_node_path4.join)((0, import_node_os2.homedir)(), p.slice(2)) : p;
}
function parseConfig(raw) {
  if (!raw || typeof raw !== "object") {
    throw new Error(
      "policy_config missing \u2014 the OWS policy file must carry a `config` object (see README: Configuration)"
    );
  }
  const c = raw;
  const credentialPath = c["credentialPath"];
  if (typeof credentialPath !== "string" || credentialPath.length === 0) {
    throw new Error("config.credentialPath is required (path to the agent ObserverDelegationCredential JSON)");
  }
  const issuerDid = c["issuerDid"];
  if (typeof issuerDid !== "string" || !issuerDid.startsWith("did:")) {
    throw new Error("config.issuerDid is required and must be a DID (pinned trusted issuer)");
  }
  const schemaAllowlist = c["schemaAllowlist"];
  if (!Array.isArray(schemaAllowlist) || schemaAllowlist.length === 0 || !schemaAllowlist.every((s) => typeof s === "string")) {
    throw new Error("config.schemaAllowlist is required and must be a non-empty array of schema URLs");
  }
  const revocationRaw = c["revocation"] ?? {};
  const KNOWN_REVOCATION_KEYS = /* @__PURE__ */ new Set(["maxStalenessHours", "onUnreachable", "fetchTimeoutMs"]);
  for (const k of Object.keys(revocationRaw)) {
    if (!KNOWN_REVOCATION_KEYS.has(k)) {
      throw new Error(
        `config.revocation.${k} is not a recognized key [${[...KNOWN_REVOCATION_KEYS].join(", ")}] \u2014 refusing rather than silently applying a default`
      );
    }
  }
  const KNOWN_DIDCACHE_KEYS = /* @__PURE__ */ new Set(["maxStalenessHours"]);
  for (const k of Object.keys(c["didCache"] ?? {})) {
    if (!KNOWN_DIDCACHE_KEYS.has(k)) {
      throw new Error(`config.didCache.${k} is not a recognized key [maxStalenessHours] \u2014 refusing rather than silently applying a default`);
    }
  }
  const maxStalenessHours = typeof revocationRaw["maxStalenessHours"] === "number" ? revocationRaw["maxStalenessHours"] : 24;
  const onUnreachable = revocationRaw["onUnreachable"] ?? "cache-then-deny";
  if (onUnreachable !== "cache-then-deny") {
    throw new Error(
      `config.revocation.onUnreachable: only 'cache-then-deny' is implemented (refresh-first; cache under the staleness window; deny otherwise)`
    );
  }
  const fetchTimeoutMs = typeof revocationRaw["fetchTimeoutMs"] === "number" ? revocationRaw["fetchTimeoutMs"] : 1500;
  const didCacheRaw = c["didCache"] ?? {};
  const didStaleness = typeof didCacheRaw["maxStalenessHours"] === "number" ? didCacheRaw["maxStalenessHours"] : maxStalenessHours;
  const railsOverride = c["rails"] ?? {};
  const slOriginRaw = c["statusListOriginAllowlist"];
  if (slOriginRaw !== void 0 && (!Array.isArray(slOriginRaw) || !slOriginRaw.every((x) => typeof x === "string"))) {
    throw new Error("config.statusListOriginAllowlist must be an array of origin strings when present");
  }
  const statusListOriginAllowlist = (slOriginRaw ?? []).map((o) => {
    try {
      return new URL(o).origin;
    } catch {
      throw new Error(`config.statusListOriginAllowlist entry ${JSON.stringify(o)} is not a parseable origin`);
    }
  });
  const offlineRaw = c["offline"];
  return {
    credentialPath: expandHome(credentialPath),
    issuerDid,
    schemaAllowlist,
    agentDid: typeof c["agentDid"] === "string" ? c["agentDid"] : void 0,
    revocation: { maxStalenessHours, onUnreachable: "cache-then-deny", fetchTimeoutMs },
    didCache: { maxStalenessHours: didStaleness },
    cacheDir: expandHome(typeof c["cacheDir"] === "string" ? c["cacheDir"] : "~/.cache/ows-op-policy"),
    auditLog: expandHome(typeof c["auditLog"] === "string" ? c["auditLog"] : "~/.cache/ows-op-policy/decisions.jsonl"),
    rails: { ...DEFAULT_RAILS, ...railsOverride },
    evmTokens: c["evmTokens"] ?? void 0,
    solanaMints: c["solanaMints"] ?? void 0,
    trc20Tokens: c["trc20Tokens"] ?? void 0,
    allowContractCalls: c["allowContractCalls"] === true,
    transactionCategory: typeof c["transactionCategory"] === "string" ? c["transactionCategory"] : void 0,
    counterpartyAddressMap: c["counterpartyAddressMap"] ?? void 0,
    statusListOriginAllowlist,
    offline: offlineRaw ? {
      didDocumentPath: offlineRaw.didDocumentPath ? expandHome(offlineRaw.didDocumentPath) : void 0,
      statusListPath: offlineRaw.statusListPath ? expandHome(offlineRaw.statusListPath) : void 0
    } : void 0
  };
}

// src/core/tokens.ts
var DEFAULT_EVM_TOKENS = {
  // USDC
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { symbol: "USDC", decimals: 6 },
  // Ethereum
  "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913": { symbol: "USDC", decimals: 6 },
  // Base
  "0xaf88d065e77c8cc2239327c5edb3a432268e5831": { symbol: "USDC", decimals: 6 },
  // Arbitrum
  "0x0b2c639c533813f4aa9d7837caf62653d097ff85": { symbol: "USDC", decimals: 6 },
  // Optimism
  "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359": { symbol: "USDC", decimals: 6 },
  // Polygon
  // USDT
  "0xdac17f958d2ee523a2206206994597c13d831ec7": { symbol: "USDT", decimals: 6 }
  // Ethereum
};
var DEFAULT_SOLANA_MINTS = {
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: { symbol: "USDC", decimals: 6 },
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: { symbol: "USDT", decimals: 6 }
};
var SOLANA_PROGRAMS = {
  SYSTEM: "11111111111111111111111111111111",
  TOKEN: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  TOKEN_2022: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
};
var SOLANA_BENIGN_PROGRAMS = /* @__PURE__ */ new Set([
  "ComputeBudget111111111111111111111111111111",
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
  // SPL Memo v2
  "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"
  // SPL Memo v1
]);

// src/core/did-key.ts
var ED25519_MULTICODEC = [237, 1];
var DidKeyConventionError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "DidKeyConventionError";
  }
};
function decodeEd25519DidKey(did) {
  if (typeof did !== "string" || !did.startsWith("did:key:z")) return void 0;
  let body;
  try {
    body = base58Decode(did.slice("did:key:z".length));
  } catch {
    return void 0;
  }
  if (body.length !== 34) return void 0;
  if (body[0] !== ED25519_MULTICODEC[0] || body[1] !== ED25519_MULTICODEC[1]) return void 0;
  return { multicodec: body, publicKey: body.subarray(2) };
}
function refuseWrongDidKeyWidth(raw, parameter) {
  if (raw === void 0 || raw.length !== 32) return;
  throw new DidKeyConventionError(
    `The \`${parameter}\` callback returned 32 bytes. This parameter requires the 34-byte multicodec-prefixed form (\`0xed 0x01\` then the key); it is \`resolveDeciderDidWeb\`, the parameter beside it, that takes the 32-byte raw key. Both are typed \`(did: string) => Uint8Array | undefined\`, so nothing in the signature distinguishes them. THIS IS A DEFECT IN THE CALLER AND NOT A FACT ABOUT THE DECIDER: answering \`cited-invalid\` here would publish "the decider is not a well-formed ed25519 did:key" about an artifact that may be entirely sound, and a verification product must not assert a defect in a third party's document because of one in its own call. Use \`decodeEd25519DidKey(did)?.multicodec\`.`
  );
}

// src/core/attestation-jcs.ts
var NotCanonicalisable = class extends Error {
};
var str = (s) => JSON.stringify(s);
function canonicalise(value, path = "$") {
  if (typeof value === "string") return str(value);
  if (Array.isArray(value)) return `[${value.map((v, i) => canonicalise(v, `${path}[${i}]`)).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== void 0).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
    return `{${entries.map(([k, v]) => `${str(k)}:${canonicalise(v, `${path}.${k}`)}`).join(",")}}`;
  }
  throw new NotCanonicalisable(
    `Cannot canonicalise ${path}: ${value === null ? "null" : typeof value}. This canonicaliser covers objects, arrays and strings, which is everything this package signs. Numbers, booleans and null are REFUSED rather than guessed at, because RFC 8785's number rules are where a canonicaliser goes subtly wrong and produces bytes that look right and no other implementation reproduces. If this type now needs one, that is a decision about the PAYLOAD and not about this file: adding a number to a signed attestation means this canonicaliser and jcsBytes stop agreeing, so it needs a ruling rather than a wider domain here.`
  );
}

// src/core/records/refusal.ts
var REFUSAL_PAYLOAD_TYPE = "op.enforcement.refusal.v3";
var REFUSAL_PAYLOAD_TYPE_V1 = "op.enforcement.refusal.v1";
var REFUSAL_PAYLOAD_TYPE_V2 = "op.enforcement.refusal.v2";
var REFUSAL_PAYLOAD_TYPE_V3 = "op.enforcement.refusal.v3";
var CITATION_BEARING = /* @__PURE__ */ new Set([
  REFUSAL_PAYLOAD_TYPE_V2,
  REFUSAL_PAYLOAD_TYPE_V3
]);
var REASON_BEARING = /* @__PURE__ */ new Set([REFUSAL_PAYLOAD_TYPE_V3]);
var REASON_VALUES = /* @__PURE__ */ new Set(
  ["no-authority", "not-reached", "none-configured"]
);
var nonEmpty = (v) => typeof v === "string" && v !== "";
function requireFields(r, fields, context) {
  for (const f of fields) {
    if (!nonEmpty(r[f])) {
      throw new Error(
        `Cannot sign a refusal with no ${f}${context}. An absent field canonicalises to the same bytes as an omitted one, so this would produce a signature over a refusal that does not say what it stopped or on whose authority.`
      );
    }
  }
}
function enumeratedSpend(s) {
  if (!nonEmpty(s?.amountRaw) || typeof s?.decimals !== "number" || !nonEmpty(s?.rail) || !nonEmpty(s?.asset)) {
    throw new Error(
      "Cannot sign a refusal whose spend does not carry rail, asset, amountRaw and numeric decimals. A refusal that cannot say what it stopped, in units a reader can sum, does not answer the question a refusal log exists for."
    );
  }
  return {
    rail: s.rail,
    asset: s.asset,
    amountRaw: s.amountRaw,
    decimals: String(s.decimals),
    // ENUMERATED, so a property attached to the spend object cannot ride into the signed bytes.
    ...s.counterparty === void 0 ? {} : { counterparty: s.counterparty }
  };
}
function enumeratedBound(b, type) {
  if (b?.state === "recorded") {
    if (!nonEmpty(b.limit)) {
      throw new Error(
        "Cannot sign a refusal whose appliedBound is `recorded` with no limit. The arithmetic is the substance of the claim \u2014 a signed bound that names no limit asserts only that some bound existed."
      );
    }
    return {
      state: "recorded",
      limit: b.limit,
      ...b.unit === void 0 ? {} : { unit: b.unit },
      ...b.observed === void 0 ? {} : { observed: b.observed },
      ...b.headroom === void 0 ? {} : { headroom: b.headroom },
      ...REASON_BEARING.has(type) && b.note !== void 0 ? { note: b.note } : {}
    };
  }
  if (b?.state === "not-supplied") {
    if (!nonEmpty(b.note)) {
      throw new Error(
        "Cannot sign a refusal whose appliedBound is `not-supplied` with no note. The note is what makes the absence a claim rather than a silence."
      );
    }
    if (REASON_BEARING.has(type) && !REASON_VALUES.has(b.reason)) {
      throw new Error(
        `Cannot sign a ${type} refusal whose appliedBound reason is ${JSON.stringify(b.reason)}. The reasons are ${[...REASON_VALUES].join(", ")}; an unrecognised one is refused rather than omitted, because a bound whose absence this service cannot explain must not carry a signature saying it can.`
      );
    }
    return {
      state: "not-supplied",
      ...b.constraint === void 0 ? {} : { constraint: b.constraint },
      ...REASON_BEARING.has(type) ? { reason: b.reason } : {},
      note: b.note
    };
  }
  throw new Error(
    `Cannot sign a refusal whose appliedBound state is ${JSON.stringify(b?.state)}. The two states are \`recorded\` and \`not-supplied\`; an unrecognised one is refused rather than signed, because a bound this service cannot describe must not carry a signature saying it can.`
  );
}
function enumeratedCredential(c) {
  if (c?.state === "digest") {
    if (!nonEmpty(c.value)) {
      throw new Error(
        "Cannot sign a refusal whose credential state is `digest` with no value. A digest field with no digest in it is a placeholder wearing the name of the thing it stands for."
      );
    }
    return { state: "digest", value: c.value };
  }
  if (c?.state === "not-supplied") {
    if (!nonEmpty(c.note)) throw new Error("Cannot sign a refusal whose credential is `not-supplied` with no note.");
    return { state: "not-supplied", note: c.note };
  }
  throw new Error(
    `Cannot sign a refusal whose credential state is ${JSON.stringify(c?.state)}.`
  );
}
function citationOf(a) {
  if (a === void 0) return void 0;
  if (a.state !== "attested") return { state: a.state };
  return { state: a.state, decisionId: a.decisionId, decider: a.decider, outcome: a.outcome };
}
function refusalPayload(r) {
  requireFields(
    r,
    ["refusalId", "at", "code", "agentId", "mandateId"],
    ""
  );
  const type = r.payloadType ?? REFUSAL_PAYLOAD_TYPE_V1;
  const citation = CITATION_BEARING.has(type) ? citationOf(r.attestation) : void 0;
  const base = {
    // FROM THE RECORD, NOT FROM THIS BUILD. See REFUSAL_PAYLOAD_TYPE_V1.
    type,
    refusalId: r.refusalId,
    at: r.at,
    code: r.code,
    agentId: r.agentId,
    mandateId: r.mandateId,
    spend: enumeratedSpend(r.spend),
    credential: enumeratedCredential(r.credential),
    ...citation === void 0 ? {} : { citation }
  };
  if (r.authority === "mandate") {
    if (!nonEmpty(r.breachedConstraint)) {
      throw new Error(
        "Cannot sign a MANDATE refusal with no breachedConstraint. This is the claim that a signed credential's own constraint stopped the payment; without naming which, the signature asserts only that something did."
      );
    }
    if (r.appliedBound === void 0) {
      throw new Error(
        "Cannot sign a MANDATE refusal with no appliedBound. The bound arithmetic is what a third party checks the refusal against \u2014 an unsupplied bound is recorded as `not-supplied` with a note, which is a claim, rather than omitted, which is a silence."
      );
    }
    return canonicalise({
      ...base,
      authority: "mandate",
      breachedConstraint: r.breachedConstraint,
      appliedBound: enumeratedBound(r.appliedBound, type)
    });
  }
  if (r.authority === "deployment-guard") {
    if (r.breachedConstraint !== void 0) {
      throw new Error(
        "A deployment-guard refusal must not carry a breachedConstraint. It breached no mandate constraint \u2014 it never consulted a mandate \u2014 and signing one would attribute a deployment decision to a credential's own rule, which is the reverse of what this record exists to show."
      );
    }
    if (r.appliedBound !== void 0 && r.appliedBound.state === "recorded") {
      throw new Error(
        "A deployment-guard refusal must not carry a RECORDED appliedBound. It consulted no mandate, so a limit here would attribute a deployment decision to a credential's own arithmetic. A `not-supplied` bound stating why no bound was evaluated is correct and is kept."
      );
    }
    if (!nonEmpty(r.network)) {
      throw new Error(
        "Cannot sign a DEPLOYMENT-GUARD refusal with no network. The network is the guard's whole subject: a test-only deployment refusing a mainnet identifier is the claim being made."
      );
    }
    return canonicalise({
      ...base,
      authority: "deployment-guard",
      network: r.network,
      ...r.appliedBound === void 0 ? {} : { appliedBound: enumeratedBound(r.appliedBound, type) }
    });
  }
  throw new Error(
    `Cannot sign a refusal whose authority is ${JSON.stringify(r.authority)}. The two authorities are \`mandate\` and \`deployment-guard\`; an unrecognised one is refused rather than signed, because a refusal whose authority this service cannot name must not carry a signature saying it can.`
  );
}
function signableFromRefusal(r) {
  const sig = r.signature;
  if (sig !== null && typeof sig === "object" && "state" in sig) {
    throw new Error(
      "signableFromRefusal was handed a SERVED refusal row (the shape GET /v1/refusals sends and a console copy button emits: `refusedBy`, `attempted`, a signature OBJECT). It reads the store shape. Rebuild a served row with signableFromRefusalRow(row) first: refusalPayload(signableFromRefusal(signableFromRefusalRow(row)))."
    );
  }
  const digest = r.credentialDigest;
  return {
    // ABSENT MEANS v1, and this is the ONLY place that decision is made, so a record written before
    // the type was persisted rebuilds under the rules it was actually signed with.
    payloadType: r.payloadType ?? REFUSAL_PAYLOAD_TYPE_V1,
    // CARRIED SO v2 CAN SIGN IT. The record has held this since required-mode landed; nothing
    // signed it and nothing served it, so a refused party could not see what refused them.
    ...r.attestation === void 0 ? {} : { attestation: r.attestation },
    refusalId: r.refusalId,
    at: r.at,
    authority: r.authority,
    code: r.code,
    agentId: r.attribution?.agentId ?? "",
    mandateId: r.attribution?.mandateId ?? "",
    spend: r.spend,
    // ─── THE NOTE IS INSIDE THE SIGNATURE, SO IT MUST BE TRUE OF EVERY RECORD IT LANDS ON ────────
    //
    // It read: "A deployment-guard refusal happens before any verdict exists, so no credential was
    // evaluated." That is true of the network guard and of NO_VERDICT. It is FALSE of
    // DECIDER_IS_EVALUATOR, ATTESTATION_INVALID, ATTESTATION_CONTRADICTS_PAYMENT and
    // VERDICT_CONTRADICTS_PAYMENT, every one of which runs with a verdict in hand.
    //
    // A FALSE CLAIM ON A SCREEN CAN BE CORRECTED. A false claim inside a signature is durable, and
    // the signature attests to it: every refusal already issued under that wording is permanently
    // wrong about how it came to exist.
    //
    // THE DISCRIMINATOR IS THE RECORD'S OWN attribution.agentId, which is copied from the verdict and
    // is therefore present exactly when a verdict existed. Derived rather than passed in, so a new
    // refusal site cannot pick the wrong sentence by forgetting to choose one.
    //
    // AND A GUARD NEVER SPEAKS FOR THE EVALUATOR. Both guard sentences describe what the GUARD did.
    // The first draft of the with-verdict case said "the evaluator supplied no credentialDigest with
    // it" — a guard asserting something about a party it did not consult. Caught by an existing
    // assertion that encodes exactly that rule, which is the test being right and the change wrong.
    credential: nonEmpty(digest) ? { state: "digest", value: digest } : {
      state: "not-supplied",
      note: r.authority !== "deployment-guard" ? "The evaluator supplied no credentialDigest with this verdict, so this service cannot say which credential document the bound came from." : nonEmpty(r.attribution?.agentId) ? "A deployment guard refused this with a verdict present, and a guard reads no credential, so there is no digest to record. This describes the GUARD, not the evaluator." : "A deployment guard refused this BEFORE any verdict existed, so no credential was evaluated and there is no digest to record."
    },
    ...r.breachedConstraint === void 0 ? {} : { breachedConstraint: r.breachedConstraint },
    ...r.appliedBound === void 0 ? {} : { appliedBound: r.appliedBound },
    ...r.network === void 0 ? {} : { network: r.network }
  };
}

// src/core/records/refusal-row.ts
function withoutNulls(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === void 0) continue;
    out[k] = v;
  }
  return out;
}
function isRefusalRow(r) {
  if (r === null || typeof r !== "object") return false;
  const sig = r.signature;
  return sig !== null && typeof sig === "object" && "state" in sig;
}
function signableFromRefusalRow(row) {
  const sig = row.signature;
  const sigPayloadType = sig !== null && typeof sig === "object" && "payloadType" in sig ? sig.payloadType : void 0;
  const bound = row.appliedBound === null || row.appliedBound === void 0 ? void 0 : withoutNulls(row.appliedBound);
  const att = row.attestation;
  const attestation = att === null || att === void 0 || att.state === "not-evaluated" ? void 0 : att;
  const attempted = row.attempted ?? {};
  return {
    refusalId: row.refusalId,
    at: row.at,
    authority: row.refusedBy,
    code: row.code,
    attribution: withoutNulls({ agentId: row.agentId, mandateId: row.mandateId }),
    spend: withoutNulls({
      rail: attempted.rail,
      asset: attempted.asset,
      amountRaw: attempted.amountRaw,
      decimals: attempted.decimals,
      counterparty: attempted.counterparty
    }),
    ...row.credential?.state === "digest" && typeof row.credential.value === "string" && row.credential.value !== "" ? { credentialDigest: row.credential.value } : {},
    ...row.constraint === null || row.constraint === void 0 ? {} : { breachedConstraint: row.constraint },
    ...bound === void 0 ? {} : { appliedBound: bound },
    ...row.network === null || row.network === void 0 ? {} : { network: row.network },
    ...sigPayloadType === void 0 ? {} : { payloadType: sigPayloadType },
    ...attestation === void 0 ? {} : { attestation }
  };
}

// src/core/records/lapse.ts
var LAPSE_PAYLOAD_TYPE = "op.approval.lapse.v1";
function lapsePayload(l) {
  for (const field of ["handleId", "at", "expiresAt"]) {
    const value = l[field];
    if (typeof value !== "string" || value === "") {
      throw new Error(
        `Cannot sign a lapse with no ${field}. An absent field canonicalises to the same bytes as an omitted one, so this would produce a signature over a lapse that does not say what closed.`
      );
    }
  }
  return canonicalise({
    type: LAPSE_PAYLOAD_TYPE,
    handleId: l.handleId,
    at: l.at,
    expiresAt: l.expiresAt
  });
}

// src/core/records/resolution.ts
var RESOLUTION_PAYLOAD_TYPE = "op.approval.resolution.v1";
function resolutionPayload(r) {
  for (const [field, value] of [
    ["handleId", r.handleId],
    ["at", r.at],
    ["actor.issuer", r.actor?.issuer],
    ["actor.approverRef", r.actor?.approverRef],
    ["actor.assurance", r.actor?.assurance]
  ]) {
    if (typeof value !== "string" || value === "") {
      throw new Error(
        `Cannot sign a resolution with no ${field}. An absent field canonicalises to the same bytes as an omitted one, so this would produce a signature over a record that does not say what the caller believes it says.`
      );
    }
  }
  if (r.how === "denied" && (typeof r.reason !== "string" || r.reason === "")) {
    throw new Error(
      "Cannot sign a denial with no reason. The surface already refuses a reasonless denial with a 400, and a signature that did not cover the reason would leave the kept field uncorroborated."
    );
  }
  return canonicalise({
    type: RESOLUTION_PAYLOAD_TYPE,
    handleId: r.handleId,
    how: r.how,
    at: r.at,
    actor: { issuer: r.actor.issuer, approverRef: r.actor.approverRef, assurance: r.actor.assurance },
    // Omitted on an approval rather than sent as an empty string: an empty reason is a value, and a
    // reader would be entitled to read it as "denied for no stated reason".
    ...r.how === "denied" ? { reason: r.reason } : {}
  });
}

// src/core/records/verdict.ts
var EVALUATION_VERDICT_PAYLOAD_TYPE = "op.evaluation.verdict.v4";
var SIGNED_FIELDS = [
  "decision",
  "mandateId",
  "agentId",
  "issuerId",
  "rail",
  "asset",
  "amountRaw",
  "decimals",
  "counterpartyMatchedAs",
  "notBefore",
  "notAfter"
];
var SIGNED_DETAIL_FIELDS = ["limit", "observed", "headroom", "unit"];
function evaluationVerdictPayload(v) {
  for (const field of SIGNED_FIELDS) {
    const value = v[field];
    if (typeof value !== "string" || value === "") {
      throw new Error(
        `Cannot sign a verdict with no ${field}. An absent field canonicalises to the same bytes as an omitted one, so this would produce a signature over a payment that does not say what the evaluator believes it says.`
      );
    }
  }
  const decision = v.decision;
  if (decision === "deny" && v.breachedConstraint === void 0) {
    throw new Error(
      "Cannot sign a deny with no breachedConstraint. A signed deny that names no constraint says the mandate refused and does not say what refused it."
    );
  }
  if (decision !== "deny" && v.breachedConstraint !== void 0) {
    throw new Error(
      `Cannot sign a ${decision} carrying a breachedConstraint. Only a deny breached something; this would assert that the mandate both permitted and refused the same payment.`
    );
  }
  if (decision === "escalate" && v.routingConstraint === void 0) {
    throw new Error(
      "Cannot sign an escalate with no routingConstraint. The rule that routed a payment to a human is what the human is acting on."
    );
  }
  if (decision !== "escalate" && v.routingConstraint !== void 0) {
    throw new Error(
      `Cannot sign a ${decision} carrying a routingConstraint. Only an escalate asked anybody.`
    );
  }
  if (decision === "escalate" && v.remainingAfterApproval === void 0) {
    throw new Error(
      "Cannot sign an escalate with no remainingAfterApproval. It is the figure the approver reads before releasing money, and leaving it out of the signature is what v4 exists to stop. A deployment that tracks no budget states that in this field rather than omitting it \u2014 an absent field and a declared absence are different claims, and only one of them is signed."
    );
  }
  if (decision !== "escalate" && v.remainingAfterApproval !== void 0) {
    throw new Error(
      `Cannot sign a ${decision} carrying a remainingAfterApproval. Only an escalate asked anybody, so only an escalate has a headroom that would remain after an approval.`
    );
  }
  for (const f of ["breachedConstraint", "routingConstraint", "remainingAfterApproval"]) {
    const value = v[f];
    if (value !== void 0 && typeof value !== "string") {
      throw new Error(
        `Cannot sign a verdict whose ${f} is a ${typeof value}. Every signed field is a string, because RFC 8785's number rules are where canonicalisers diverge and a value compared as a number here would be compared as text by whoever verifies it.`
      );
    }
  }
  const detail = v.denialDetail;
  if (detail !== void 0) {
    if (decision !== "deny") {
      throw new Error(
        `Cannot sign a ${decision} carrying a denialDetail. Only a deny has one: it is the bound the mandate refused against, and an escalate or a release did not refuse.`
      );
    }
    for (const f of SIGNED_DETAIL_FIELDS) {
      const value = detail[f];
      if (value !== void 0 && typeof value !== "string") {
        throw new Error(
          `Cannot sign a denialDetail whose ${f} is a ${typeof value}. Every signed bound is a string, because RFC 8785's number rules are where canonicalisers diverge and a bound compared as a number here would be compared as text by whoever verifies it.`
        );
      }
    }
  }
  return canonicalise({
    type: EVALUATION_VERDICT_PAYLOAD_TYPE,
    ...Object.fromEntries(SIGNED_FIELDS.map((f) => [f, v[f]])),
    ...v.breachedConstraint === void 0 ? {} : { breachedConstraint: v.breachedConstraint },
    ...v.routingConstraint === void 0 ? {} : { routingConstraint: v.routingConstraint },
    ...v.remainingAfterApproval === void 0 ? {} : { remainingAfterApproval: v.remainingAfterApproval },
    // ENUMERATED, NEVER SPREAD. A field a caller attached to `denialDetail` cannot reach the signed
    // bytes by any route, which is why `terminal` cannot arrive as a fifth member.
    ...detail === void 0 ? {} : {
      denialDetail: Object.fromEntries(
        SIGNED_DETAIL_FIELDS.filter((f) => detail[f] !== void 0).map((f) => [f, detail[f]])
      )
    }
  });
}

// src/core/records/types.ts
var REQUIRED_KEY_CUSTODY_SCHEMA_VERSION = "v2.7";
var REQUIRED_KEY_CUSTODY = ["org-attested", "operator-held", "device-bound"];
var APPROVER_KEY_ASSURANCE = REQUIRED_KEY_CUSTODY;
var APPROVER_KEY_ASSURANCE_SCHEMA_VERSION = REQUIRED_KEY_CUSTODY_SCHEMA_VERSION;

// src/core/attestation.ts
var FORBIDDEN_ATTESTATION_FIELDS = [
  "rationale",
  "reasoning",
  "trace",
  "deliberation",
  "explanation",
  "thoughts",
  "chainOfThought",
  "promptTokens",
  "modelOutput",
  "transcript"
];
var ObservationRefused = class extends Error {
};
function assertNoObservation(input) {
  const found = FORBIDDEN_ATTESTATION_FIELDS.filter((f) => f in input);
  if (found.length > 0) {
    throw new ObservationRefused(
      `A decision attestation carries ${found.join(", ")}, which describe HOW a decision was reached. WE ATTEST TO A DECISION SOMETHING ELSE MADE; WE DO NOT OBSERVE THE DECISION BEING MADE. If the decider explains itself, that explanation belongs in THEIR artifact under THEIR signature, and this attestation binds to it by digest. Restating it here makes this system the producer of evidence about a decision it is also selling assurance over, which is the defect that sent payer consent and purchase terms to external artifacts.`
    );
  }
}
var POLICY_REF_CONVENTION_ENTRIES = {
  clauses: {
    carries: "Clause locators in the PUBLISHER'S OWN addressing scheme, as written: 'III.4.e', '4.2'.",
    why: "THE PUBLISHER'S SCHEME, NEVER OURS, AND NEVER A BYTE OFFSET OR A COORDINATE INTO A RENDERING. A locator into our rendering of a document is a fact about our rendering: it survives only as long as that rendering does, and it is meaningless to the publisher and to anyone holding the original. The publisher's own numbering is the one the document itself asserts, so it is checkable by a party who has the document and nothing of ours.",
    capturableLater: false
  },
  version: {
    carries: "The publisher's own version label for the policy document, as the publisher writes it.",
    why: "NOT THE THING THAT FIXES THE REFERENCE \u2014 `hash` already does that, and this is deliberately NOT the `vocabularyRef.version` rule one type down, which is REQUIRED and refused when empty because attestations under different vocabulary versions are not comparable. This is carried so a human chasing the document can ask for it by the name its publisher uses, and it is never checked against the hash: a publisher who reissues different bytes under the same label has made a statement this attestation records rather than one it corrects.",
    capturableLater: true
  },
  publisherId: {
    carries: "Who published the policy document. A resolvable identifier, not a display name.",
    why: "THE POLICY IS NOT NECESSARILY THE DECIDER'S OWN. A third-party administrator decides under a payor's policy, and `decider` names who decided while nothing else names whose rules were applied. Without this a verifier reading the attestation cannot tell an internal policy from an imposed one, which is the distinction a diligence reader is there for.",
    capturableLater: true
  },
  retrievedFrom: {
    carries: "The retrieval coordinate the decider actually used to obtain the document it read.",
    why: "A FACT ABOUT THE RETRIEVAL EVENT, WHICH IS WHY IT DOES NOT SURVIVE THE DECISION. `id` is opaque and is never parsed, so it is not required to be dereferenceable and frequently is not. This is where the decider went, recorded at the moment it went there. Reconstructing it later yields where someone would go NOW, which is a different claim wearing the same shape.",
    capturableLater: false
  }
};
var POLICY_REF_CONVENTION = new Map(Object.entries(POLICY_REF_CONVENTION_ENTRIES));
var POLICY_REF_FIELDS_GO_INSIDE_POLICY_REF = true;
var OBSERVATION_BOUNDARY_DOES_NOT_INSPECT_POLICY_REF = true;
var ATTESTATION_ESTABLISHES = {
  /** A named decider made a non-repudiable statement. That is the whole of what a signature buys, and
   * it is not nothing: it cannot later be denied. */
  deciderMadeTheStatement: true,
  /** The statement existed at or before the time it was verified against a resolvable key. */
  statementExistedAtVerification: true,
  /** The inputs are committed to. Only the original set reproduces `inputsDigest`, so the customer can
   * prove later which inputs were before the decider. */
  inputsAreCommittedTo: true,
  /** A decision with no payment is recorded. This is §7 as a claim: a denial produces an attestation
   * because the attestation stands alone. */
  decisionsWithoutPaymentsAreRecorded: true,
  // ── AND THE FOUR IT DOES NOT ──
  /** NOT that the decision was correct, reasonable, or compliant. An attestation is a record that a
   * decision was made, by whom, about what. Nothing in it evaluates the decision, and a signature over
   * a wrong decision is a signed wrong decision. */
  decisionWasSound: false,
  /** NOT that we observed the decision being made. We attest to a decision something else made; the
   * decider's own artifact carries its reasons under its own signature. See the boundary above. */
  weObservedTheDecision: false,
  /** NOT what the inputs WERE. `inputsDigest` commits without disclosing, deliberately: a claims file
   * holds medical and personal data that neither we nor a verifying counterparty should read. */
  inputsAreReadable: false,
  /** NOT that decisions producing no attestation did not happen.
   *
   * THIS ROW CARRIES ITS OWN REASONING BECAUSE IT IS THE EASIEST TO GET BACKWARDS. An absent
   * attestation is an absence, and absence has more causes than presence: the decider may not have
   * been configured, the issuance may have failed, or the decision may genuinely not have occurred.
   *
   * THE EXCEPTION IS WHAT MAKES IT USEFUL: if the mandate REQUIRED an attestation, then a payment
   * without one was refused, and the absence of the payment IS established. The claim is bounded by
   * what the mandate demanded, not by what the record happens to contain. */
  absentAttestationMeansNoDecision: false
};
var nonEmpty2 = (v) => typeof v === "string" && v !== "";
function checkDecisionRefs(policyRef, vocabularyRef) {
  for (const [label, ref] of [["policyRef", policyRef], ["vocabularyRef", vocabularyRef]]) {
    if (ref === void 0 || ref === null) return `A decision attestation must carry ${label}.`;
    for (const f of ["id", "hash", "hashMethod"]) {
      if (!nonEmpty2(ref[f])) {
        return `Cannot issue an attestation whose ${label}.${f} is missing or empty. ` + (f === "hashMethod" ? "A hash whose method is unnamed is a hex string, and a verifier that assumes one is verifying its own assumption." : `${label}.${f} is what makes the reference resolvable and fixed rather than merely named.`);
      }
    }
  }
  if (!nonEmpty2(vocabularyRef.version)) {
    return "Cannot issue an attestation whose vocabularyRef.version is missing or empty. Attestations under different vocabulary versions are not comparable, so a version that is not stated cannot be compared against.";
  }
  if (vocabularyRef.source !== "op-starter-set" && vocabularyRef.source !== "client-defined") {
    return (
      // ─── IT NAMED THE SET AND NOT THE VALUE THAT WORKS ─────────────────────────────────────────
      //
      // This said "the two values are 'op-starter-set' and 'client-defined'" — and `op-starter-set`
      // is REFUSED a few lines below, because none is published. A producer following this message
      // could pick the refused one and discover that in a second round trip, for a field with
      // exactly one usable value today.
      //
      // AND IT IS A LITERAL, WHICH THE PROSE DID NOT MAKE OBVIOUS. Measured 2026-08-15: an external
      // implementation read "a source that is client-defined" as a DESCRIPTION of a property, put
      // its own vocabulary NAME here, and then reasoned carefully about namespace collisions in a
      // field that has no namespace. Second time this convention's prose has produced a wrong
      // reading in a competent implementation, after `publisherId`. Both are wording defects rather
      // than reader errors, and the fix is the same: say the literal, and say where the name goes.
      `Cannot issue an attestation whose vocabularyRef.source is ${JSON.stringify(vocabularyRef.source)}. THIS FIELD TAKES A LITERAL, NOT A NAME: use the exact string 'client-defined'. It is not a description of your vocabulary, and it is not where your vocabulary is named \u2014 that is \`vocabularyRef.id\`. The type declares two values and the other one, \`op-starter-set\`, is refused today because no OP starter vocabulary is published, so 'client-defined' is the only accepted value.`
    );
  }
  const values = vocabularyRef.values;
  if (!Array.isArray(values) || values.length === 0) {
    return "Cannot issue an attestation whose vocabularyRef declares no values. The set has to travel with the artifact or membership cannot be checked by anyone: an id and a hash name a vocabulary that lives somewhere a verifier cannot reach.";
  }
  if (!values.every((v) => typeof v === "string" && v !== "")) {
    return "Cannot issue an attestation whose vocabularyRef.values contains a non-string or empty entry.";
  }
  if (new Set(values).size !== values.length) {
    return "Cannot issue an attestation whose vocabularyRef.values repeats a value. A set with a duplicate is two different declarations of the same outcome and nothing can say which was meant.";
  }
  if (vocabularyRef.source === "op-starter-set") {
    return "Cannot issue an attestation whose vocabularyRef.source is 'op-starter-set': no OP starter vocabulary is published, so the reference resolves to nothing and the claim that the outcome came from a standard set cannot be checked by anyone. Use 'client-defined' and name your own vocabulary by id, version and hash. When a starter set is published this refusal is removed and no signed shape changes.";
  }
  return null;
}
function checkOutcomeInVocabulary(outcome, vocabularyRef) {
  if (vocabularyRef === void 0 || !Array.isArray(vocabularyRef.values)) return null;
  if (typeof outcome !== "string" || outcome === "") {
    return "Cannot issue an attestation with no outcome. A decision that decided nothing is not a decision.";
  }
  if (vocabularyRef.values.includes(outcome)) return null;
  const shown = vocabularyRef.values.slice(0, 6).map((v) => JSON.stringify(v)).join(", ");
  return `Cannot issue an attestation whose outcome ${JSON.stringify(outcome.slice(0, 60))} is not a member of the vocabulary it cites (${vocabularyRef.id} v${vocabularyRef.version}), whose values are [${shown}${vocabularyRef.values.length > 6 ? `, +${vocabularyRef.values.length - 6} more` : ""}]. The attestation would assert that the decider chose this value FROM THAT SET, which is not true. Either the decider must select a declared value \u2014 its own wording belongs in its artifact, bound by deciderArtifactDigest \u2014 or the vocabulary is wrong and needs a new version.`;
}
function checkDeciderArtifactRef(ref) {
  if (ref === void 0 || ref === null) {
    return "A decision attestation must state whether the decider supplied an artifact of its own, in the field `deciderArtifactDigest`. There are two forms and which one to use depends only on whether an artifact exists:\n\n  WITH an artifact     deciderArtifactDigest: { state: 'digest', value: <digest of it> }\n  WITHOUT one          deciderArtifactDigest: { state: 'not-supplied', note: <why not> }\n\nOmitting the field leaves a reader unable to tell an absent artifact from a dropped one. If you have an artifact, `digest` is the form: declaring `not-supplied` to get past this check would be a false statement about the decider, signed.";
  }
  if (ref.state === "digest") {
    return nonEmpty2(ref.value) ? null : "Cannot issue an attestation whose deciderArtifactDigest state is `digest` with no value. A digest field with no digest in it is a placeholder wearing the name of the thing it stands for.";
  }
  if (ref.state === "not-supplied") {
    return nonEmpty2(ref.note) ? null : "Cannot issue an attestation whose deciderArtifactDigest is `not-supplied` with no note. The note is what makes the absence a stated fact rather than a silence.";
  }
  return `Cannot issue an attestation whose deciderArtifactDigest state is ${JSON.stringify(ref.state)}. The two states are \`digest\` and \`not-supplied\`; an unrecognised one is refused rather than signed.`;
}
function checkPaymentBinding(counterparty, rail) {
  if (!nonEmpty2(counterparty)) {
    return "Cannot issue a decision attestation with no counterparty. This is WHO THE DECISION AUTHORISES PAYING, and it is not `subject`: subject is what was decided about, this is where the money goes, and they are routinely different parties. An attestation that names neither cannot ever be bound to a payment, and a field added after the signatures exist cannot be required of them.";
  }
  if (!nonEmpty2(rail)) {
    return "Cannot issue a decision attestation with no rail. `amount` binds the figure to an asset and to a number of decimals, and nothing binds it to a rail, so a decision cleared for one rail would verify against the same figure moving on another.";
  }
  return null;
}
async function issueDecisionAttestation(input, signer, requestedAssurance) {
  assertNoObservation({
    decider: await signer.deciderDid(),
    ...input
  });
  const artifactRefRefusal = checkDeciderArtifactRef(input.deciderArtifactDigest);
  if (artifactRefRefusal !== null) return { kind: "refused", reason: artifactRefRefusal };
  const refsRefusal = checkDecisionRefs(input.policyRef, input.vocabularyRef);
  if (refsRefusal !== null) return { kind: "refused", reason: refsRefusal };
  const membershipRefusal = checkOutcomeInVocabulary(input.outcome, input.vocabularyRef);
  if (membershipRefusal !== null) return { kind: "refused", reason: membershipRefusal };
  const bindingRefusal = checkPaymentBinding(input.counterparty, input.rail);
  if (bindingRefusal !== null) return { kind: "refused", reason: bindingRefusal };
  const actual = signer.assurance();
  if (requestedAssurance !== void 0 && requestedAssurance !== actual) {
    return {
      kind: "refused",
      reason: `This credential asks for assurance '${requestedAssurance}' and the signer can honestly claim '${actual}'. Issuing it would put a provenance claim nobody established in front of a counterparty. Either sign as '${actual}', or use a signer that earns '${requestedAssurance}'.`
    };
  }
  if (actual === "independently-observed" && input.observerRef === void 0) {
    return {
      kind: "refused",
      reason: `Assurance 'independently-observed' requires an observerRef, and none was supplied. An attestation claiming independent observation must name what observed it. If nothing did, 'self-declared' is the accurate level and is a real one.`
    };
  }
  const attestation = { ...input, decider: await signer.deciderDid(), assurance: actual };
  return { kind: "issued", attestation, signature: await signer.sign(canonicalise(attestation)) };
}
function acceptDecisionAttestation(attestation, capabilities) {
  if (attestation.assurance === "independently-observed" && !capabilities.canVerifyObserver) {
    return {
      kind: "declined",
      reason: `This attestation claims 'independently-observed' and this verifier cannot resolve an observer reference, so the claim cannot be checked. It is declined rather than accepted at face value. The same attestation re-issued as 'self-declared' is verifiable here today.`
    };
  }
  return { kind: "accepted" };
}
var DID_KEY_ED25519_PREFIX = [237, 1];
function isAttestedAmount(v) {
  if (v === null || typeof v !== "object") return false;
  const a = v;
  return typeof a.amountRaw === "string" && /^\d+$/.test(a.amountRaw) && typeof a.decimals === "string" && /^\d+$/.test(a.decimals) && typeof a.asset === "string" && a.asset.length > 0;
}
function verifyDecisionAttestation(citedDecisionId, document, signature, verifyEd25519, decodeDidKey, resolveDeciderDidWeb) {
  if (citedDecisionId === void 0) return { state: "not-cited" };
  if (document === null || typeof document !== "object" || signature === void 0) {
    return {
      state: "cited-unresolvable",
      reason: `The payment cites a decision but carried no verifiable attestation document. A decisionId is an identifier, not a locator: nothing here can fetch an attestation from an id, so the document must travel with the payment.`
    };
  }
  const att = document;
  const decider = att.decider;
  if (typeof decider !== "string") {
    return { state: "cited-invalid", reason: "The attestation document names no decider, so nothing identifies who decided." };
  }
  let publicKey;
  if (decider.startsWith("did:web:")) {
    if (resolveDeciderDidWeb === void 0) {
      return {
        state: "cited-unresolvable",
        reason: `The decider is a did:web and this deployment supplies no resolver for one. Resolving it requires an outbound call from the evaluation path, so it is OPT-IN: a deployment that wants organisational deciders passes a resolver, and one that does not keeps a verification path that makes no network call. This is REFUSED rather than accepted unverified, on the same reasoning as 'device-bound' on approvers.assurance: a claim nobody can check must not reach an approver as though someone had. A did:key decider verifies here with no resolver.`
      };
    }
    let resolved;
    try {
      resolved = resolveDeciderDidWeb(decider);
    } catch (e) {
      return {
        state: "cited-unresolvable",
        reason: `The decider's DID document was refused rather than fetched: ${e.message}`
      };
    }
    if (resolved === void 0 || resolved.length !== 32) {
      return {
        state: "cited-unresolvable",
        reason: `The decider's DID document could not be resolved to an ed25519 assertion key (${decider.slice(0, 48)}). This is not a failed check on the attestation: it is an inability to establish who signed it, so the decision is shown as cited and unverified rather than read as a decision.`
      };
    }
    publicKey = Buffer.from(resolved);
  } else if (decider.startsWith("did:key:z")) {
    const raw = decodeDidKey(decider);
    refuseWrongDidKeyWidth(raw, "decodeDidKey");
    if (raw === void 0 || raw.length !== 34 || raw[0] !== DID_KEY_ED25519_PREFIX[0] || raw[1] !== DID_KEY_ED25519_PREFIX[1]) {
      return { state: "cited-invalid", reason: "The decider is not a well-formed ed25519 did:key, so no key can be recovered from it." };
    }
    publicKey = Buffer.from(raw.subarray(2));
  } else {
    return { state: "cited-unresolvable", reason: `The decider uses an unsupported DID method: ${decider.slice(0, 24)}. Only did:key and did:web are verifiable here.` };
  }
  if (att.decisionId !== citedDecisionId) {
    return {
      state: "cited-invalid",
      reason: `The payment cites decision '${citedDecisionId}' and carried an attestation for '${String(att.decisionId)}'. Citing one decision and shipping another would have an approver read the shipped one.`
    };
  }
  for (const f of ["outcome", "decidedAt"]) {
    if (typeof att[f] !== "string") {
      return { state: "cited-invalid", reason: `The attestation document is missing '${f}', so it cannot state what was decided.` };
    }
  }
  const refsRefusal = checkDecisionRefs(att.policyRef, att.vocabularyRef);
  if (refsRefusal !== null) return { state: "cited-invalid", reason: refsRefusal };
  const artifactRefusal = checkDeciderArtifactRef(att.deciderArtifactDigest);
  if (artifactRefusal !== null) return { state: "cited-invalid", reason: artifactRefusal };
  const membershipFailure = checkOutcomeInVocabulary(att.outcome, att.vocabularyRef);
  if (membershipFailure !== null) return { state: "cited-invalid", reason: membershipFailure };
  if (att.assurance !== void 0 && att.assurance !== "self-declared") {
    return {
      state: "cited-unresolvable",
      // ─── THIS REASON ONCE ASSERTED A CHECK THAT HAD NOT RUN ─────────────────────────────────
      //
      // It said "its signature and fields are sound" and closed with "the same attestation re-issued
      // as 'self-declared' verifies today". **The signature is verified BELOW THIS RETURN.** On this
      // branch it has not been checked, so both sentences were claims about a check that did not
      // execute — and measured 2026-08-14, the result object here is byte-identical for a valid and
      // a broken signature. With a broken one the reason was false, and false in the reassuring
      // direction: it told a reader the document was sound when nothing had established that.
      //
      // THE INDISTINGUISHABILITY IS CORRECT AND STAYS. The signature genuinely was not checked, so
      // two documents differing only in it must produce the same answer. What changes is that the
      // reason now SAYS the signature was not checked instead of asserting it was fine.
      //
      // SO IT ENUMERATES WHAT RAN. A reader debugging a batch needs to know which checks this result
      // covers, and "sound" covered nothing it was entitled to claim.
      reason: `This attestation declares assurance '${String(att.assurance)}' and this verifier can check only 'self-declared'. Establishing anything stronger requires resolving an observer's reference, and no such integration exists here \u2014 so the claim is DECLINED rather than accepted at face value.

WHAT WAS CHECKED before this point: the document carries a decider whose key could be recovered, its decisionId matches the citation, it states an outcome and a decidedAt, its policyRef and vocabularyRef are well formed, its deciderArtifactDigest is well formed, and its outcome is a member of its declared vocabulary.

WHAT WAS NOT CHECKED: THE SIGNATURE. This branch returns before signature verification, so this result asserts nothing about whether the document was signed by the key it names. A document with a broken signature and one with a valid signature produce this same answer, and neither has been distinguished from the other here.

Re-issuing at 'self-declared' is what makes the signature reachable for checking. Whether it then verifies is not known from this result.`
    };
  }
  const sig = Buffer.from(signature, "base64");
  if (sig.length !== 64) {
    return {
      state: "cited-invalid",
      reason: `The attestation signature decodes to ${sig.length} bytes and an ed25519 signature is 64. It is refused as MALFORMED rather than checked and reported as a bad signature, which would name the wrong defect: this is an encoding or transport problem in what was submitted, NOT evidence of a forgery or of a decider signing badly. The signature is expected as base64 of exactly 64 bytes. Note that base64 decoding is lenient \u2014 a value that is not base64 at all decodes to some shorter buffer rather than failing, and arrives here as a wrong length.`
    };
  }
  let ok = false;
  try {
    ok = verifyEd25519(canonicalise(att), sig, publicKey);
  } catch (e) {
    return { state: "cited-invalid", reason: `The attestation signature could not be checked: ${String(e)}` };
  }
  if (!ok) {
    return {
      state: "cited-invalid",
      reason: `The attestation signature does NOT verify against its own decider's key. This is not a missing record: it is a signed artifact failing its own check, which is a defect or a forgery. Do not read it as a decision.`
    };
  }
  return {
    state: "attested",
    decisionId: att.decisionId,
    decider,
    outcome: att.outcome,
    policyRef: att.policyRef,
    vocabularyRef: att.vocabularyRef,
    decidedAt: att.decidedAt,
    inputsDigest: att.inputsDigest,
    deciderArtifactDigest: att.deciderArtifactDigest,
    ...isAttestedAmount(att.amount) ? { amount: att.amount } : {},
    // CARRIED, NEVER COMPARED, AND NEVER DEFAULTED. An absent one stays absent rather than becoming
    // an empty string: `''` is a value, and a consumer comparing it would find two documents with no
    // counterparty "agreeing". The comparison does not exist yet; when it does, it must be able to
    // tell a document that named nobody from one that named someone.
    ...nonEmpty2(att.counterparty) ? { counterparty: att.counterparty } : {},
    ...nonEmpty2(att.rail) ? { rail: att.rail } : {}
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  APPROVER_KEY_ASSURANCE,
  APPROVER_KEY_ASSURANCE_SCHEMA_VERSION,
  ATTESTATION_ESTABLISHES,
  CORE_VERSION,
  CROSS_RAIL_SCALE,
  CrossRailLedger,
  DECLARED_UNENFORCEABLE,
  DEFAULT_EVM_TOKENS,
  DEFAULT_SOLANA_MINTS,
  DENIAL_TAGS,
  DidKeyConventionError,
  EVALUATION_VERDICT_PAYLOAD_TYPE,
  FORBIDDEN_ATTESTATION_FIELDS,
  KNOWN_COUNTERPARTY_KINDS,
  KNOWN_SCOPE_KEYS,
  KNOWN_TM_KEYS,
  LAPSE_PAYLOAD_TYPE,
  LEDGER_SAFE_FLOOR,
  NON_NEGOTIABLE,
  OBSERVATION_BOUNDARY_DOES_NOT_INSPECT_POLICY_REF,
  ObservationRefused,
  ObserverLedgerContentionError,
  ObserverUrlRefusedError,
  POLICY_REF_CONVENTION,
  POLICY_REF_FIELDS_GO_INSIDE_POLICY_REF,
  REFUSAL_PAYLOAD_TYPE,
  REFUSAL_PAYLOAD_TYPE_V1,
  REFUSAL_PAYLOAD_TYPE_V2,
  REFUSAL_PAYLOAD_TYPE_V3,
  REQUIRED_KEY_CUSTODY,
  REQUIRED_KEY_CUSTODY_SCHEMA_VERSION,
  RESOLUTION_PAYLOAD_TYPE,
  SOLANA_BENIGN_PROGRAMS,
  SOLANA_PROGRAMS,
  acceptDecisionAttestation,
  appendAudit,
  assertFetchableUrl,
  assertLedgerCoreSafe,
  assertNoObservation,
  base58Decode,
  base58Encode,
  blockedAddressReason,
  capDetail,
  checkDeciderArtifactRef,
  checkDecisionRefs,
  checkOutcomeInVocabulary,
  checkPaymentBinding,
  checkStatusEntry,
  checkValidityWindow,
  compareCoreVersion,
  convertToBudgetUnits,
  declaredUnenforceable,
  decodeEd25519DidKey,
  decodeEd25519Multibase,
  didWebOrigin,
  ed25519Verify,
  enforceMandate,
  evaluateMandate,
  evaluationVerdictPayload,
  findAssertionMethodKey,
  formatBudgetUnits,
  formatScaled,
  guardedFetch,
  isRefusalRow,
  issueDecisionAttestation,
  jcsBytes,
  lapsePayload,
  parseConfig,
  parseDecimalScaled,
  refusalPayload,
  refuseWrongDidKeyWidth,
  resolutionPayload,
  resolveDidDocument,
  resolveDidKeyDocument,
  runRuntimeAdapter,
  sha256,
  signableFromRefusal,
  signableFromRefusalRow,
  statusListOriginDecision,
  stripUndefinedDeep,
  validateStructure,
  verifyCredential,
  verifyCredentialCrypto,
  verifyCredentialObject,
  verifyDecisionAttestation,
  verifyEddsaJcs2022
});
