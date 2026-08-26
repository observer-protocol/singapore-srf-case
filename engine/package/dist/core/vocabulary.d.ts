/** `actionScope` properties this engine recognizes. Anything else DENIES via the
 * unknown-rule catch-all (fail-closed per AIP v0.8). */
export declare const KNOWN_SCOPE_KEYS: ReadonlySet<string>;
/** `tradingMandate` properties this engine recognizes. Order-plane entries
 * (allowedVenues, allowedInstruments, maxPosition, dailyDrawdownCap) are
 * recognized-but-NOT-ENFORCED here and surface as notes; see mandate.ts §8. */
export declare const KNOWN_TM_KEYS: ReadonlySet<string>;
/** A property that appears in a published schema, and that this engine
 * deliberately does not enforce. Distinct from an unknown key: the issuer
 * wrote something the schema permits, so the denial should name the reason
 * rather than report the key as unrecognized. */
export interface DeclaredUnenforceable {
    /** Where the property lives. */
    container: 'actionScope' | 'tradingMandate' | 'delegation.scope.spending_limits' | 'authorizationConfig.policy';
    property: string;
    /** Why it is not enforced, rendered into the denial reason. */
    reason: string;
}
/** Properties the published schemas accept and this engine will not evaluate.
 *
 * These DENY, like any binding constraint the evaluator cannot establish. The
 * difference from the unknown-rule path is legibility: the issuer is told the
 * property is declared-but-unenforceable and why, instead of being told the
 * engine has never heard of a field its own schema accepts. */
export declare const DECLARED_UNENFORCEABLE: readonly DeclaredUnenforceable[];
/** Lookup used by the evaluator to choose between the `[unenforceable]` and
 * `[unknown-rule]` denial tags. */
export declare function declaredUnenforceable(container: DeclaredUnenforceable['container'], property: string): DeclaredUnenforceable | undefined;
/** Counterparty identifier kinds this engine can match on.
 *
 * The SCHEMA constrains the shape of a typed counterparty entry and deliberately
 * does NOT enumerate the kinds: a card rail names its counterparty by merchant
 * descriptor, an issuer-native rail will name it some third way, and a new kind
 * must not require a new schema version. Same discipline as capability names.
 *
 * The price of an open vocabulary is that this set is the closed half. A kind the
 * engine does not recognize DENIES, naming the kind and this set, rather than being
 * ignored: an unrecognized identifier that fell through would mean an allowlist
 * silently matched nothing, which is the permissive direction.
 *
 * So a credential can be issued with an unrecognized kind today and will deny until
 * an engine implements it. That is the fail-closed direction and it is the cost of not
 * needing a mint per kind.
 *
 * IDENTITIES ONLY, NEVER CLASSES. An identity list matches equality; a class list
 * matches membership. A merchant category code is a class, and admitting one here
 * would let an allowList mean "any merchant in this category" while reading like a
 * list of named counterparties, so the breadth of the grant would be invisible in the
 * signed artifact. Class constraints belong in a separate field; that role was
 * actionScope.allowed_counterparty_types, withdrawn as premature, expected back with a
 * rail that has classes. Do not add a class kind here to save a field. */
export declare const KNOWN_COUNTERPARTY_KINDS: ReadonlySet<string>;
/** Artifact types acceptable for actionScope.requiredPurchaseTerms, WITH THE PARTY THAT SIGNS EACH.
 *
 * THE SIGNER IS NAMED HERE BECAUSE THE FROZEN SCHEMA'S PROSE IS NARROWER THAN THE MECHANISM.
 * v2.5's description says "COUNTERPARTY-SIGNED statements", and the payout walkthrough falsified
 * that: on a claims payout the artifact is signed by the PAYOR, who is neither the counterparty nor
 * the agent, while the counterparty is a claimant who signs nothing.
 *
 * The field always worked. The signer is a property of the ARTIFACT TYPE and that vocabulary is
 * open, so `payor-adjudication` was expressible the day v2.5 shipped. Only the description was
 * wrong, and it cost no schema version to be wrong.
 *
 * v2.5's bytes are frozen and stay frozen. The correction is carried in v2.6-draft — now MINTED as
 * `v2.6.json`, so the correction is in a frozen schema and the current draft is `v2.7-draft.json` —
 * and BESIDE the
 * record here, which is where an integrator reads recognized values. THIS IS THE FIRST VOCABULARY
 * ENTRY THAT CONTRADICTS THE FROZEN PROSE, so the contradiction is stated rather than left for
 * someone to notice.
 *
 * AN UNRECOGNIZED TYPE DENIES, so the open vocabulary is not an open door. */
export declare const KNOWN_PURCHASE_TERMS_TYPES: ReadonlyMap<string, {
    signer: string;
    why: string;
}>;
/** Why counterparty allowlists cannot bound a claims payout, recorded where someone would try.
 *
 * A third-party administrator's payees are the customer's customers: thousands of claimants,
 * unknown when the mandate is issued. actionScope.allowList matches IDENTITIES BY EQUALITY and
 * holds identities never classes, so it cannot be written for this rail at all.
 *
 * The field that would have expressed it was allowed_counterparty_types, and it is in
 * DECLARED_UNENFORCEABLE above. THE WITHDRAWAL WAS CORRECT AND SHOULD NOT BE REVISITED: a class
 * list matches membership and an identity list matches equality, and conflating them is how an
 * allowlist stops being a bound.
 *
 * What bounds a claims payout is not the payee's identity. It is whether the payment matches an
 * adjudicated claim, which is `payor-adjudication` above. */
export declare const PAYOUT_BOUND_IS_NOT_THE_ALLOWLIST = true;
