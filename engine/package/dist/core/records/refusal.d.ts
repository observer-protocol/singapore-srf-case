import type { AppliedBound, Refusal, RefusalAuthority } from './types.js';
import type { AttestationBlock } from '../attestation.js';
import type { SpendRecord } from './types.js';
/** DOMAIN SEPARATION. A refusal must not verify as a lapse, an instruction, a report or a verdict:
 * five different claims, by different parties, about different things. */
/** THE VERSION THIS BUILD ISSUES. Changing it changes only what NEW records are signed under.
 * A stored record is rebuilt under ITS OWN type, never under this one — see `REFUSAL_PAYLOAD_TYPE_V1`. */
export declare const REFUSAL_PAYLOAD_TYPE = "op.enforcement.refusal.v3";
/** WHAT A RECORD WITH NO RECORDED TYPE WAS SIGNED UNDER, and it is a fact rather than a fallback:
 * every refusal written before the type was persisted was signed under v1.
 *
 * IT MUST NEVER TRACK `REFUSAL_PAYLOAD_TYPE`. Measured 2026-08-07: `type` is INSIDE the signed
 * payload, so rebuilding an old record under a bumped constant emits bytes the signature does not
 * cover, and every stored refusal reports DOES NOT VERIFY at once. Demonstrated by setting the
 * constant to v2 and watching the committed fixture fail. */
export declare const REFUSAL_PAYLOAD_TYPE_V1 = "op.enforcement.refusal.v1";
/** v2 ADDS ONE FIELD: `citation`, the determination the refusal refused on.
 *
 * WHY A NEW VERSION RATHER THAN WIDENING v1. Adding an optional field is harmless for OLD records —
 * `canonicalise` drops undefined members, so a record with no citation rebuilds to identical bytes —
 * but it breaks in the other direction: a NEW record carrying a citation does NOT verify under an OLD
 * verifier, which rebuilds without the field and reports a FALSE NEGATIVE on a valid record. The
 * `@context` fix could be made on both sides because both sides were ours. A recipient's verifier is
 * not ours, so correctness must not depend on them upgrading first. */
export declare const REFUSAL_PAYLOAD_TYPE_V2 = "op.enforcement.refusal.v2";
/** v3 ADDS `appliedBound.reason` AND SIGNS `appliedBound.note` ON THE `recorded` ARM.
 *
 * Same reasoning as v2 and the same failure it avoids: a NEW record carrying either field does not
 * verify under an OLD verifier, which rebuilds without them and reports a FALSE NEGATIVE on a valid
 * record. Widening v2 in place would do that to every verifier already deployed.
 *
 * ─── A v3 RECORD REACHING A PRE-v3 VERIFIER IS A FALSE NEGATIVE, NOT A DETECTION ────────────────
 *
 * It reports DOES NOT VERIFY on a sound record, in front of the recipient the whole record exists to
 * convince. This estate has paid for that once already: 906 of 906 verdicts rendered SIGNATURE NOT
 * VERIFIED while every signature was sound. So every verifier that can reach a v3 record must
 * understand v3 BEFORE such a record exists, and that ordering is not something this file can
 * enforce — it is a release sequence. */
export declare const REFUSAL_PAYLOAD_TYPE_V3 = "op.enforcement.refusal.v3";
/** WHICH CREDENTIAL'S CAP WAS APPLIED, as a positive state.
 *
 * THE MOST VALUABLE FIELD IN THIS PAYLOAD. Without it a reader holds the bound this service asserts
 * and the credential they were given, with nothing binding the two — this service could have applied
 * a different credential's cap and the signature would look identical. With it, the signature says
 * THIS refusal applied THAT credential.
 *
 * It is `VerdictFacts.credentialDigest`, which is OPTIONAL: an evaluator may not supply one, and a
 * deployment-guard refusal happens before any verdict exists, so there is never one to record. Both
 * are stated rather than omitted. */
export type SignedCredentialRef = {
    state: 'digest';
    value: string;
} | {
    state: 'not-supplied';
    note: string;
};
export interface SignableRefusal {
    refusalId: string;
    at: string;
    authority: RefusalAuthority;
    code: string;
    agentId: string;
    mandateId: string;
    spend: SpendRecord;
    credential: SignedCredentialRef;
    /** Required on a `mandate` refusal. Must be absent on a `deployment-guard` one. */
    breachedConstraint?: string;
    /** Required on a `mandate` refusal. Must be absent on a `deployment-guard` one. */
    appliedBound?: AppliedBound;
    /** The payload version this record's signature covers. Absent means v1: see
     * `REFUSAL_PAYLOAD_TYPE_V1`. Carried so a rebuild uses the RECORD'S rule set, not the build's. */
    payloadType?: string;
    /** The determination this refusal refused on, when one was cited. Covered by the signature under
     * v2 only; a v1 record carrying one must still rebuild without it. */
    attestation?: AttestationBlock;
    /** Required on a `deployment-guard` refusal: the guard's whole subject. Absent on a mandate one. */
    network?: string;
}
export declare function refusalPayload(r: SignableRefusal): string;
/** Rebuild the signable form from a stored record, so a verifier and the signer cannot drift.
 *
 * DERIVED FROM THE RECORD, NEVER STORED ALONGSIDE IT. A persisted copy of the signed bytes would be
 * a second source for the same fact, and the two would disagree the first time the payload changed. */
/** `reason` is optional on the input because it is prose outside the signed bytes, and a record
 *  rebuilt from a served row (see `signableFromRefusalRow`) does not carry it. */
export declare function signableFromRefusal(r: Omit<Refusal, 'reason'> & {
    reason?: string;
}): SignableRefusal;
