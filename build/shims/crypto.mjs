// Browser stand-in for the three node:crypto functions the engine's verification path calls:
// createPublicKey (SPKI DER, Ed25519), verify (Ed25519 over the given data), createHash('sha256').
// Primitives: @noble/ed25519 and @noble/hashes, bundled. Everything else the engine imports from
// node:crypto is absent here on purpose; a call to it throws rather than returning a value.
import * as ed from '@noble/ed25519';
import { sha512, sha256 as nobleSha256 } from '@noble/hashes/sha2.js';
ed.hashes.sha512 = sha512;
const SPKI_PREFIX = [0x30,0x2a,0x30,0x05,0x06,0x03,0x2b,0x65,0x70,0x03,0x21,0x00];
const bytes = (d) => typeof d === 'string' ? new TextEncoder().encode(d) : new Uint8Array(d.buffer, d.byteOffset, d.byteLength);
export function createPublicKey({ key, format, type }) {
  if (format !== 'der' || type !== 'spki') throw new Error(`crypto shim: only {format:'der', type:'spki'} is implemented (got ${format}/${type})`);
  const k = bytes(key);
  if (k.length !== 44 || SPKI_PREFIX.some((b, i) => k[i] !== b)) throw new Error('crypto shim: not an Ed25519 SPKI key');
  return { type: 'public', asymmetricKeyType: 'ed25519', raw: k.slice(12) };
}
export function verify(algorithm, data, keyObject, signature) {
  if (algorithm !== null && algorithm !== undefined) throw new Error('crypto shim: only algorithm=null (Ed25519) is implemented');
  if (!keyObject || !(keyObject.raw instanceof Uint8Array)) throw new Error('crypto shim: key must come from createPublicKey');
  return ed.verify(bytes(signature), bytes(data), keyObject.raw);
}
export function createHash(name) {
  if (name !== 'sha256') throw new Error(`crypto shim: only sha256 is implemented (got ${name})`);
  const parts = [];
  return {
    update(d) { parts.push(bytes(d)); return this; },
    digest(enc) {
      const total = parts.reduce((n, p) => n + p.length, 0); const all = new Uint8Array(total); let o = 0;
      for (const p of parts) { all.set(p, o); o += p.length; }
      const out = Buffer.from(nobleSha256(all));
      return enc === 'hex' ? out.toString('hex') : enc ? out.toString(enc) : out;
    },
  };
}
export default { createPublicKey, verify, createHash };
