import { decodeEd25519Multibase } from './crypto.js';
export interface ProofCheckResult {
    ok: boolean;
    reason: string;
    notes: string[];
}
/**
 * Verify a DataIntegrityProof / eddsa-jcs-2022 signature per W3C VC Data
 * Integrity (EdDSA Cryptosuites §3.3):
 *
 *   hashData = SHA-256(JCS(proofConfig)) || SHA-256(JCS(unsecuredDocument))
 *
 * where proofConfig is the proof block minus proofValue. Implements the
 * spec's context-binding check: when the proof carries @context, the
 * document's @context must start with it in identical order and the
 * effective document @context for hashing becomes proof.@context.
 *
 * Legacy suites (Ed25519Signature2020/2026) are rejected outright — this
 * verifier implements the post-migration Observer Protocol signing surface
 * only.
 */
export declare function verifyEddsaJcs2022(document: Record<string, unknown>, rawPublicKey: Buffer): ProofCheckResult;
export { decodeEd25519Multibase };
