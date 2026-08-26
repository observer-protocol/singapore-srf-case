import type { DenialDetail } from './denial.js';
import type { ObserverDelegationCredential, PolicyContext, ResolvedTransfer, VerifierConfig } from './types.js';
/** Structured record of the credential-verification checks that actually ran,
 * produced BY the verifier as each step passes (not written alongside it). On a
 * successful verify this lets an external reader reconstruct exactly which checks
 * executed. String values only (no floats) so it stays JCS-verifiable when
 * embedded in a signed credential. */
export type CredentialChecks = Record<string, string>;
export interface Verdict {
    allow: boolean;
    reason: string;
    notes: string[];
    /** Machine-readable denial detail, present on a mandate deny. Optional: a new
     * required field on a returned type breaks every caller. */
    detail?: DenialDetail;
    cred?: ObserverDelegationCredential;
    /** Present on a successful verify; the checks that ran, keyed by check name. */
    checks?: CredentialChecks;
    /** THE THIRD STATE: permitted, but a human must authorise it.
     *
     * `allow` STAYS A BOOLEAN AND IS `false` WHEN THIS IS PRESENT. That is the whole safety argument and
     * it is not stylistic. A consumer that does not know about this field sees `allow: false` and DENIES —
     * the payment does not happen. Had this been `allow: true` plus an escalation, an unaware consumer
     * would let an unapproved payment through, invisibly, which is exactly the shape of the v2.1 defect
     * one layer up: a signal that unaware readers treat as permission.
     *
     * Additive and optional, so the 25 read sites of `.allow` across 8 published packages compile and
     * behave identically. A consumer opts in by reading this; one that never does keeps failing closed. */
    escalation?: {
        threshold: {
            amount: string;
            currency: string;
        };
        requested: {
            amount: string;
            currency: string;
        };
        approvers: unknown[];
    };
}
/** Steps 1–5: load + cryptographically verify the delegation credential.
 * On success returns the parsed credential; on failure returns a deny Verdict. */
export declare function verifyCredential(config: VerifierConfig, nowMs: number): Promise<Verdict>;
/** Verify an in-memory delegation credential: structure/schema gate + full crypto.
 * This is the file-independent half of verifyCredential — callers that already
 * hold the parsed credential (resolved from a store, presented over the wire)
 * use this instead of a credentialPath. Behavior is identical to verifyCredential
 * after its read step. */
export declare function verifyCredentialObject(cred: ObserverDelegationCredential, config: VerifierConfig, nowMs: number): Promise<Verdict>;
/** Cryptographic trust checks ONLY, no structure/schema/issuer-pin gate:
 * validity window → issuer DID resolution → eddsa-jcs-2022 proof → signer-boundary
 * → revocation. Callers that must accept more than one credential body shape verify
 * cryptographic integrity here and gate shape / trust-anchor by other means (e.g. a
 * hash-match to a registered credential). verifyCredentialObject layers the v2.1
 * structure gate on top of this; adapters that require that gate keep using it. */
export declare function verifyCredentialCrypto(cred: ObserverDelegationCredential, config: VerifierConfig, nowMs: number): Promise<Verdict>;
/** Steps 6–7: enforce the mandate against a pre-decoded transfer.
 * The resolved transfer is always supplied by the adapter — this function
 * performs no rail-specific decode. Velocity state must be baked into
 * ctx.spending.daily_total by the caller before invoking this function. */
export declare function enforceMandate(ctx: PolicyContext, cred: ObserverDelegationCredential, config: VerifierConfig, resolved: ResolvedTransfer): Verdict;
