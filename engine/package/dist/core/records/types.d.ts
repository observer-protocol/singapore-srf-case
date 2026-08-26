import type { AttestationBlock } from '../attestation.js';
/** What actually moved, as the record states it. */
export interface SpendRecord {
    rail: string;
    asset: string;
    amountRaw: string;
    decimals: number;
    /** As the MANDATE matched it, not as the rail names it. */
    counterparty?: string;
}
/** WHO the payment was for, when the record can say. Both optional: a verdict may name neither party,
 * and two unrecorded values are two unanswered questions rather than one. */
export interface Attribution {
    agentId?: string;
    mandateId?: string;
}
/** WHICH AUTHORITY REFUSED, and the distinction is load-bearing: a `mandate` refusal is the credential
 * saying no, a `deployment-guard` refusal is this deployment saying it could not establish something.
 * They are different claims and a reader must not have to infer which. */
export type RefusalAuthority = 'mandate' | 'deployment-guard';
/** THE BOUND THAT WAS APPLIED, as a positive state rather than a missing key.
 *
 * `not-supplied` says the evaluator compared nothing; a record with the field simply absent would leave
 * a reader unable to tell that from a record whose writer forgot. */
/** WHY NO BOUND WAS COMPARED, AS A CLOSED SET RATHER THAN AS PROSE.
 *
 * ─── THE NOTE WAS ALREADY SIGNED, AND PROSE IS THE WEAK FORM OF CLOSED ──────────────────────────
 *
 * `not-supplied` has always carried a `note`, inside the signature, and refuses to sign without one.
 * So the absence was already a claim rather than a silence. What it was not is READABLE BY ANYTHING
 * BUT A PERSON: a recipient cannot separate "no bound compared because no authority was granted"
 * from "no bound compared because an earlier gate fired" except by reading English.
 *
 * Three deployments' worth of findings point at the same missing fact — which checks were reached
 * and which were not — and this is the smallest field that answers it where the record already has
 * somewhere to put it.
 *
 *   `not-reached`      an earlier check refused first, so this bound was never evaluated. The
 *                      ceiling comparison precedes the citation gate, so a payment over the ceiling
 *                      never reaches the outcome comparison; that fact existed only as a read-layer
 *                      state a third party never received.
 *   `no-authority`     the mandate grants no spending authority at all, so there is no bound to
 *                      compare rather than a bound that was not reached. Distinct on purpose: one
 *                      is an ordering, the other is a scope.
 *   `none-configured`  the deployment has no bound configured for this constraint. The absence is
 *                      the deployment's, not the mandate's.
 *
 * CLOSED, so a fourth case stops compiling rather than falling into `note` and becoming prose again.
 * REQUIRED, on the same reasoning the note is: the thing that must be there has nowhere not to be. */
export type AppliedBoundReason = 'no-authority' | 'not-reached' | 'none-configured';
export type AppliedBound = {
    state: 'recorded';
    limit: string;
    unit?: string;
    observed?: string;
    headroom?: string;
    note?: string;
} | {
    state: 'not-supplied';
    constraint?: string;
    reason: AppliedBoundReason;
    note?: string;
};
/** THE SCHEMA VERSION `RequiredKeyCustody` MIRRORS. A vocabulary type with no version is a claim
 * about a moving target: it says "these are the values" without saying values of WHAT, at WHEN.
 *
 * READ BY `test/approver-assurance-vocabulary.mjs`, which fetches this exact version and fails if the
 * served enum and the union below have diverged. **So this constant is not documentation — changing it
 * changes which document the check compares against.** Bump it and the union together, never alone. */
export declare const REQUIRED_KEY_CUSTODY_SCHEMA_VERSION = "v2.7";
/** HOW AN APPROVER KEY NAMED IN A CREDENTIAL IS HELD. `actionScope.approvers[].keys[].assurance`,
 * mirroring `delegation/{@link REQUIRED_KEY_CUSTODY_SCHEMA_VERSION}.json`.
 *
 * NAMED `RequiredKeyCustody` AND NOT `ApprovalAssurance`, AFTER rc.8 SHIPPED THE WRONG NAME.
 * `op-mcp-payment-server` has an `ApprovalAssurance` meaning something else entirely — what a
 * RESOLUTION'S SIGNATURE establishes about who approved.
 *
 * ─── THEY OVERLAP ON THREE MEMBERS AND THEY ARE STILL DIFFERENT IDEAS ────────────────────────────
 *
 * The rc.9 note here said the overlap was "a single member by coincidence of vocabulary". **That was
 * wrong twice.** Measured 2026-08-08: `op-mcp-payment-server`'s `ApprovalAssurance` is
 * `org-attested | operator-held | approver-held | device-bound`, four members, and this union was a
 * strict SUBSET of it. Adding `org-attested` below makes the overlap three.
 *
 * **THE OVERLAP IS NOT THE ARGUMENT AND NEVER WAS.** RULED 2026-08-08: these stay two types at three
 * shared members exactly as they were at two, because they answer different questions. This one asks
 * how a key named in a CREDENTIAL is held. That one asks what a RESOLUTION'S SIGNATURE establishes
 * about who approved. **A type exported so a counterparty has the vocabulary must match the vocabulary
 * the schema publishes**, and being wrong about a served artifact is worse than two types resembling
 * each other. The defence against conflating them is this name and this comment, not a stale union.
 *
 * So: do not widen this to reconcile it with `ApprovalAssurance`, and do not narrow that one to meet
 * this. Neither is a superset of the other by intent; the resemblance is what the schema happens to
 * need, and it will move again.
 *
 * ─── THE MEMBERS ────────────────────────────────────────────────────────────────────────────────
 *
 * `operator-held` needs only DID resolution and signature verification. `device-bound` requires
 * verifying the key IS device-bound, which is not honourable until enrolment publishes something
 * checkable, and which the schema couples to the `approval.assurance-verification` capability — **that
 * coupling triggers on this VALUE, not on the field being present**, and is unchanged v2.5 through
 * v2.7. `org-attested` entered the schema at **v2.6** and requires no capability.
 *
 * NOTHING ELSE IN THIS PACKAGE CONSUMES IT — measured, not assumed: no runtime code in `src/` branches
 * on these values and `validateStructure` never reads `approvers` at all. It is exported because a
 * counterparty reading an `actionScope.approvers` entry needs the vocabulary, which is exactly why it
 * being two versions stale was a published package rejecting a value the schema permits.
 *
 * ─── THE LIST IS THE VALUE AND THE TYPE IS DERIVED FROM IT ──────────────────────────────────────
 *
 * A hand-written union plus a separate array for the check would be two representations of one fact,
 * and the check would pass while they disagreed with each other and with the schema. **The union
 * below is `typeof ... [number]`, so there is exactly one place to edit and the check reads the same
 * bytes the type is built from.** A counterparty needing the values at runtime gets them here rather
 * than retyping them. */
export declare const REQUIRED_KEY_CUSTODY: readonly ["org-attested", "operator-held", "device-bound"];
export type RequiredKeyCustody = typeof REQUIRED_KEY_CUSTODY[number];
/** @deprecated Renamed to {@link REQUIRED_KEY_CUSTODY} at rc.14. Alias kept from rc.20 because
 * rc.12 carried this name and was `latest` for twelve days. Use `REQUIRED_KEY_CUSTODY`. */
export declare const APPROVER_KEY_ASSURANCE: readonly ["org-attested", "operator-held", "device-bound"];
/** @deprecated Renamed to {@link REQUIRED_KEY_CUSTODY_SCHEMA_VERSION} at rc.14. Alias kept from
 * rc.20 for the same reason. Use `REQUIRED_KEY_CUSTODY_SCHEMA_VERSION`. */
export declare const APPROVER_KEY_ASSURANCE_SCHEMA_VERSION = "v2.7";
/** @deprecated Renamed to {@link RequiredKeyCustody} at rc.14. rc.12 exported this type from
 * `index.d.ts`, so a TypeScript caller breaks on the rename exactly as a runtime caller does.
 * Use `RequiredKeyCustody`. */
export type ApproverKeyAssurance = RequiredKeyCustody;
export type ClaimedKeyCustody = 'org-attested' | 'operator-held'
/** The approver is the issuer and the approver holds their own key. Claimable, and designatable by
 * no published schema version — see the note above. */
 | 'approver-held' | 'device-bound';
/** A refused payment, as the store records it. The signable subset is derived from this by
 * `signableFromRefusal`; this is the shape a reader holds. */
export interface Refusal {
    refusalId: string;
    authority: RefusalAuthority;
    observedAt?: string;
    at: string;
    code: string;
    reason: string;
    attribution?: Attribution;
    network?: string;
    spend: SpendRecord;
    appliedBound?: AppliedBound;
    /** THE ATTESTATION STATE THAT WAS JUDGED, carried onto the refusal. Without it a forged citation
     * refused here survives only as prose in `reason`, and a coverage panel counting states rather than
     * sentences would show the control as cleaner than it is. */
    attestation?: AttestationBlock;
    breachedConstraint?: string;
    credentialDigest?: string;
    payloadType?: string;
    signature?: string;
    signedBy?: string;
}
