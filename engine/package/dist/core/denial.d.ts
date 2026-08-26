/** The closed set of denial tags. Exported as data for the same reason the
 * constraint vocabulary is: a taxonomy nothing can enumerate is a taxonomy
 * nothing can check. The conformance check diffs this against the tags actually
 * emitted, so a new tag cannot appear without joining the set. */
export declare const DENIAL_TAGS: readonly ["allowed-rails", "asset", "category", "ceiling", "counterparty", "cross-rail", "did", "entry", "failClosed", "geographic", "issuer-class", "notional", "one-time", "per-rail-cap", "rails", "recurring", "same-currency", "spending-limits", "structure", "temporal", "trading-mandate", "unenforceable", "unknown-rule", "velocity", "revocation", "proof", "validity", "issuer-linkage", "bind", "url-guard"];
export type DenialTag = (typeof DENIAL_TAGS)[number];
/** Machine-readable detail beside a denial.
 *
 * `limit`, `observed` and `headroom` are decimal strings in `unit`, never numbers:
 * these are token amounts and a JSON number would silently lose precision on a
 * large 18-decimal value, which is the one place a rounding artifact becomes a
 * payment.
 *
 * `headroom` is what the caller actually wants and could not previously get. It
 * is present only where a cap and a counter both exist; it is deliberately absent
 * rather than zero where the constraint is not a quantity, because a zero headroom
 * on a counterparty mismatch would read as "spend less". */
export interface DenialDetail {
    tag: DenialTag;
    /** Dotted path of the constraint that refused, e.g.
     * `tradingMandate.velocity.monthlyVolumeCap`. Stable across message rewordings,
     * which is the point: a client branches on this, not on prose. */
    constraint?: string;
    limit?: string;
    observed?: string;
    headroom?: string;
    unit?: string;
    /** What would make this request pass, when that is expressible without
     * inviting a retry loop. Omitted where nothing would: a counterparty that is not
     * on the allowlist has no remedy the agent can apply, and saying so is better
     * than implying one exists. */
    remedy?: string;
    /** True when no different request from this agent can pass, so a retry is
     * pointless. Set on unenforceable constraints, unknown rules and structural
     * refusals. Clients and models both need this: it is the difference between
     * "adjust and retry" and "stop". */
    terminal?: boolean;
}
/** Render a scaled bigint as a decimal string in `decimals` places, trailing
 * zeros trimmed. Amounts cross this boundary as strings for the precision reason
 * in DenialDetail. */
export declare function formatScaled(v: bigint, decimals: number): string;
/** Build the detail for a cap a request exceeded.
 *
 * `priorTotal` is what had already accumulated against the cap before this
 * request, zero for a per-transaction cap. It exists because headroom is
 * `cap - priorTotal`, NOT `cap - projected`.
 *
 * That distinction was wrong in the first version of this helper and the test
 * caught it: with a daily cap of 100, 60 already spent and 50 requested, the
 * projected total is 110 and `cap - projected` is 0. A caller reading headroom 0
 * concludes nothing can be spent, when in fact 40 can. The number a caller wants
 * is how much is still available, which is the only version of headroom that is
 * actionable.
 *
 * `observed` remains the projected total, because that is what the comparison
 * actually refused.
 */
export declare function capDetail(args: {
    tag: DenialTag;
    constraint: string;
    cap: bigint;
    /** The projected total that failed the comparison. */
    observed: bigint;
    /** Already accumulated against this cap. Zero for a per-transaction cap, where
     * the whole cap is available to a smaller request. */
    priorTotal?: bigint;
    decimals: number;
    unit: string;
}): DenialDetail;
/** The boundary is not an opening offer.
 *
 * Appended to denial messages for constraints that a differently-shaped request
 * cannot get around. A prompt-injected or merely persistent model reads "exceeds
 * the limit" as an invitation to negotiate; it should read the limit as a fact
 * about the world. Wording adopted from payfetch's documented behaviour, which is
 * the only field evidence available on how models treat refusal text. */
export declare const NON_NEGOTIABLE = "This limit is set by the principal in a signed credential and cannot be raised by this request, by retrying, or by asking differently.";
