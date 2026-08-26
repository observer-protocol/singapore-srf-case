/** DOMAIN SEPARATION. A lapse must not verify as a resolution and vice versa: they are different
 * claims by different parties about different things. */
export declare const LAPSE_PAYLOAD_TYPE = "op.approval.lapse.v1";
export interface SignableLapse {
    handleId: string;
    /** When the lapse was RECORDED. Caller-supplied, as every other `at` in this package is. */
    at: string;
    /** The window that closed. IN THE SIGNED BYTES, because without it a signed lapse says only that
     * this deployment lapsed something — not that the window it lapsed had actually elapsed. With it,
     * a reader holding the record can check the claim against the handle's own expiry. */
    expiresAt: string;
}
/** IS THIS WINDOW CLOSED?
 *
 * ─── INCLUSIVE AT THE BOUNDARY, AND THAT IS A DECISION ───────────────────────────────────────────
 *
 * `Date.parse(expiresAt) <= now`. At exactly `expiresAt` the handle IS lapsed, because the field is
 * named for the instant it expires rather than the last instant it is valid.
 *
 * MATCHED TO `redeem()` IN `src/approvals.ts`, which already used `<= nowMs`. Two expiry predicates
 * in one codebase is how a handle comes to be redeemable and unapprovable at the same millisecond.
 *
 * IT DIFFERS FROM THE VERDICT WINDOW ON PURPOSE. `notAfter` there is INCLUSIVE-VALID — a verdict
 * arriving exactly on its boundary is still good — because "valid until" and "expires at" are
 * opposite framings. Both are asserted at their own boundary rather than one inherited from the other.
 *
 * ─── AN UNREADABLE EXPIRY IS NOT AN ETERNAL ONE ──────────────────────────────────────────────────
 *
 * An absent or unparseable `expiresAt` is treated as EXPIRED. A handle whose window cannot be
 * evaluated must not be offered to an approver as though it had a valid one, and the permissive
 * reading of a malformed value is exactly how this field came to mean nothing in the first place. */
export declare function isExpired(expiresAt: string | undefined, nowMs: number): boolean;
/** The exact bytes a deployment signs to record that a window closed.
 *
 * EVERY FIELD CHECKED BY NAME, as `resolutionPayload` and `verdictPayload` both do: an absent field
 * canonicalises to the same bytes as an omitted one. */
export declare function lapsePayload(l: SignableLapse): string;
