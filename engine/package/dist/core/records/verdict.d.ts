/** The domain separator. The identifier is `EVALUATION_VERDICT_PAYLOAD_TYPE` rather than
 * `VERDICT_PAYLOAD_TYPE` for the same reason the type below is not called `SignableVerdict`.
 *
 * ─── v3 → v4 AT rc.18: AN ESCALATE NOW SIGNS `remainingAfterApproval` ───────────────────────────
 *
 * **The value moves when and only when the signed field set moves.** It was frozen at v3 across the
 * constant's rename precisely because renaming the VALUE without changing the SET would have
 * invalidated every signature in existence for no gain. This change is the opposite case: the set
 * genuinely changed, so the discriminator must, or one string would cover two constructions and a
 * verifier could not tell which bytes to rebuild.
 *
 * WHAT CHANGED AND WHY. `remainingAfterApproval` — the headroom figure an approver reads before
 * releasing money — travelled in the body, reached the approver's screen, and was NOT in the signed
 * set. A deny signed its bound down to four filtered sub-fields; an escalate did not sign the figure
 * a human decides on. **The path with a human in it had less integrity coverage than the path
 * without one.**
 *
 * WHAT THE BUMP COSTS, MEASURED 2026-08-15 — AND A CORRECTION TO THE FIRST ANSWER GIVEN.
 *
 * 1,864 verdict signatures exist across the estate and all re-verify under v3. The scope of the bump
 * was first reported as **ten** — the stored escalates — on the reasoning that releases and denies
 * carry no `remainingAfterApproval` and would therefore canonicalise identically under both
 * versions. **That is wrong, and the mistake is one line above the claim: `type` is INSIDE the
 * canonical object.** Measured: a v3 release and a v4 release differ, and differ *only* in the
 * discriminator.
 *
 * So the affected population is **all 1,864**, not ten. Every stored signature fails a v4 rebuild.
 *
 * WHAT SAVES IT IS THAT NONE OF THEM IS AMBIGUOUS. Because the two constructions never emit the same
 * bytes for the same field set, trial verification is decisive: rebuild under v3 and the signature
 * verifies, rebuild under v4 and it does not. The cost is that a verifier must TRY each known
 * construction rather than READ one — which is precisely the cost the construction stamp removes for
 * every record written from here on. Run 5 adds 468 escalates.
 *
 * AND THE STAMP LANDED FIRST, DELIBERATELY. `op-mcp-payment-server` records the construction on each
 * stored verdict as of 2026-08-15, read off these bytes. So v4 records say what they are, and the
 * 1,864 written before it read as `not-recorded` — which is the truth about them, rather than a
 * backfilled guess. Bumping first would have converted a latent recording gap into an unverifiable
 * corpus. */
export declare const EVALUATION_VERDICT_PAYLOAD_TYPE = "op.evaluation.verdict.v4";
/** The FOUR `denialDetail` fields a verdict signature covers.
 *
 * ─── NAMED, AND NOT `DenialDetail`, BECAUSE THIS PACKAGE ALREADY EXPORTS THAT ────────────────────
 *
 * `core/denial.ts` exports `DenialDetail` with EIGHT members: `tag` (a `DenialTag`, a vocabulary),
 * `constraint`, `limit`, `observed`, `headroom`, `unit`, `remedy`, and `terminal` (a boolean). This is a
 * four-member SUBSET of that concept, and shipping it unnamed and inline would have put two
 * `denialDetail` shapes on one imported surface with nothing saying which one a signature covers.
 *
 * **That is precisely the collision the rc.9 withdrawal refused**, with `denialDetail` in place of
 * `assurance`, and it would have sat two exports apart in one `index.ts` rather than across two
 * repositories. The remedy is the one this package already applied to `RequiredKeyCustody`: a name
 * that carries the distinction, and a comment saying what the distinction is.
 *
 * ─── THE TWO EXCLUSIONS, EACH WITH ITS REASON, BECAUSE AN UNEXPLAINED SUBSET IS A GUESS ──────────
 *
 * - **`terminal` is excluded because it is a BOOLEAN and this estate's canonicaliser refuses booleans.**
 *   Carrying it as the string `'true'` would be read as a value rather than a flag. A real captured
 *   deny record confirms the exclusion happens: the request carried `terminal: true` and the stored
 *   signed payload does not.
 * - **`tag`, `constraint` and `remedy` are excluded because they are not signed.** `tag` is a
 *   vocabulary, which would make this type carry one; `constraint` duplicates `breachedConstraint`,
 *   which IS signed; `remedy` is advice to the caller rather than a fact about the decision.
 *
 * **So a holder of a verdict signature can check the bound that refused and cannot check the tag, the
 * remedy, or whether a retry is pointless.** Stated here so nobody infers coverage from the name. */
export interface SignedDenialDetail {
    limit?: string;
    observed?: string;
    headroom?: string;
    unit?: string;
}
/** The exact field set an evaluator signs over one payment decision.
 *
 * ─── NAMED `SignableEvaluationVerdict` AND NOT `SignableVerdict`, DELIBERATELY ───────────────────
 *
 * **This package already exports `Verdict`** from `core/verify.ts`: `{ allow: boolean, reason, notes,
 * detail?, checks? }` — a decision **as computed**. This is a decision **as signed**. Two
 * representations of one event on one public surface, and their fields do not correspond: `allow:
 * boolean` against `decision: string`, `detail?: DenialDetail` against `denialDetail?:
 * SignedDenialDetail`.
 *
 * A reader meeting `Verdict` and `SignableVerdict` two exports apart would reasonably conclude the
 * second is a signable form of the first. It is not, and shipping the name would have made that
 * inference permanent in a package counterparties import. **The defence is this name and this comment,
 * on the `RequiredKeyCustody` precedent, rather than collapsing two types that answer different
 * questions.**
 *
 * `Verdict` answers *"what does this engine conclude about this request"*. This answers *"what did a
 * named evaluator commit to, in bytes anyone can rebuild"*.
 *
 * ─── EVERY FIELD IS A STRING, AND THAT IS LOAD-BEARING RATHER THAN STYLISTIC ─────────────────────
 *
 * `decimals` is a string for the reason the whole file turns on: this estate's canonicaliser covers
 * objects, arrays and strings and REFUSES numbers, because RFC 8785's number rules are where
 * independent canonicalisers diverge, and a signature over bytes nobody else reproduces is worse than
 * no signature. See `_PARITY_OBLIGATION`. */
export interface SignableEvaluationVerdict {
    /** What the evaluator decided. A plain `string`, NOT a union: the decision vocabulary stays where it
     * is enforced rather than travelling into a package counterparties import. Same treatment Boyd ruled
     * for `assurance` on the resolution payload. */
    decision: string;
    mandateId: string;
    agentId: string;
    issuerId: string;
    /** From the SPEND. These four are what bind the money to the decision: signing the verdict facts
     * alone would leave the amount free, so a verdict signed for 1.00 presented with a spend of 1000.00
     * would verify. */
    rail: string;
    asset: string;
    amountRaw: string;
    decimals: string;
    counterpartyMatchedAs: string;
    /** INSIDE the signed bytes, not beside them. A window carried next to the signature could be widened
     * by whoever replays it. */
    notBefore: string;
    notAfter: string;
    /** Required on `deny`, refused on `escalate` and `release`. A signed deny naming no constraint says
     * the mandate refused and not what refused it; a signed release carrying one says the mandate both
     * permitted and breached. Neither is signable. */
    breachedConstraint?: string;
    /** Required on `escalate`, refused on the other two, in the other direction. */
    routingConstraint?: string;
    /** THE HEADROOM FIGURE THE APPROVER READS. Required on `escalate`, refused on the other two, on
     * exactly the same rule as `routingConstraint` — and added at v4 because it was not signed at all.
     *
     * ─── WHY IT IS REQUIRED RATHER THAN OPTIONAL ──────────────────────────────────────────────────
     *
     * Optional would have closed nothing. An evaluator that omitted it would produce a valid escalate
     * whose human-facing figure is unsigned, which is the defect this field exists to remove — and
     * nobody downstream could tell an escalate that had no figure from one whose figure was simply not
     * covered. Required makes the absence impossible rather than invisible.
     *
     * ─── AND A DEPLOYMENT WITH NO BUDGET SAYS SO, IN THIS FIELD ───────────────────────────────────
     *
     * `string`, not a number, like every other signed field here — see the note on `decimals`. That is
     * also what lets a deployment tracking no budget state the fact: an escalate against a mandate
     * declaring no ceiling carries a value saying no figure was declared, rather than a fabricated
     * one. `op-mcp-payment-server`'s adapter has recorded the rule this follows since before the field
     * was signed: *"A number in front of an approver that nobody calculated is worse than no number."*
     *
     * This package does not enumerate which strings are acceptable. The decision vocabulary stays
     * where it is enforced, on the same ruling as `decision` and `assurance`. */
    remainingAfterApproval?: string;
    /** The signed subset. See `SignedDenialDetail` for what it deliberately does not cover. */
    denialDetail?: SignedDenialDetail;
}
/** The exact bytes an evaluator signs. A counterparty calls this to rebuild them.
 *
 * EVERY FIELD IS CHECKED BY NAME BEFORE CANONICALISING. An absent field canonicalises to the same bytes
 * as an omitted one, so without this a caller could sign a payload that does not say what it believes
 * it says, and the signature would verify.
 *
 * THE CONDITIONAL FIELDS MUST AGREE WITH THE DECISION. Three decisions, two fields, each decision takes
 * exactly one or neither: a deny breached something and names it, an escalate breached nothing and
 * names what routed it, a release carries neither. Both guards or neither — a release able to carry a
 * `routingConstraint` unchallenged is the same defect in the newer field. */
export declare function evaluationVerdictPayload(v: SignableEvaluationVerdict): string;
