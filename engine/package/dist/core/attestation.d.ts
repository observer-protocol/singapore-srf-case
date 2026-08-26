/** Fields that MUST NOT appear on a decision attestation, by name.
 *
 * AN ENUMERATED REFUSAL RATHER THAN A COMMENT, because a comment does not fail a build. The list is
 * not exhaustive and cannot be: the point is that a check exists at all, so adding one of the obvious
 * names is a deliberate act rather than an oversight.
 *
 * A field not on this list that describes HOW a decision was reached is still a violation. The list
 * catches the easy crossing; the rule above catches the rest. */
export declare const FORBIDDEN_ATTESTATION_FIELDS: readonly string[];
export declare class ObservationRefused extends Error {
}
/** Refuse an attestation input that describes HOW a decision was reached.
 *
 * Called at construction, not at serialisation, so the refusal happens where the field was added
 * rather than where it was written out. */
export declare function assertNoObservation(input: Record<string, unknown>): void;
/** WHICH POLICY WAS APPLIED, by reference and by hash.
 *
 * `id` IS OPAQUE AND IS NEVER PARSED. It is the decider's own reference to its own policy, and any
 * meaning we read out of its structure would be us interpreting a policy we have said we do not
 * interpret. It is carried, matched and shown; it is not decomposed.
 *
 * `hashMethod` IS NAMED, NEVER DEFAULTED, for the reason it is named everywhere else here: a hash
 * whose method is unstated is a hex string, and a verifier that assumes sha256 because that is what we
 * happened to use is verifying its own assumption.
 *
 * PER POLICY RATHER THAN PER SCOPE. Clients hold artifacts from different eras and different regimes,
 * and one method fixed across all of them would force a re-hash of documents that are frozen.
 *
 * ─── AND AN ID AND A HASH NAME SOMETHING THAT LIVES SOMEWHERE A VERIFIER CANNOT REACH ────────────
 *
 * THE FOUR OPTIONAL FIELDS BELOW ARE A CONVENTION, NOT A CONSTRAINT, and the difference is measured
 * rather than preferred. A parallel measurement over 446 live records found that EVERY constraint
 * adding meaning to `policyRef` refuses 100 PERCENT of existing traffic, so the ruling was convention
 * plus adoption measurement. Nothing here requires them and nothing refuses a `policyRef` without
 * them. See `POLICY_REF_CONVENTION`, which is where an ISSUER meets this.
 *
 * THE ARGUMENT IS THIS FILE'S OWN, MADE FOR `vocabularyRef` FIRST AND ACCEPTED HERE BEFORE IT WAS
 * MADE ANYWHERE ELSE. `VocabularyRef.values` exists because "`id`, `version` and `hash` named a
 * vocabulary that lived somewhere else, so nothing could tell whether `outcome` was actually drawn
 * from it". `verifyDecisionAttestation` states the same thing a third time about a citation: "a
 * decisionId is an identifier, not a locator". `policyRef` is the remaining place where an id and a
 * hash are the whole of the reference.
 *
 * THE DIFFERENCE FROM `vocabularyRef`, STATED SO THE PRECEDENT IS NOT OVER-READ. A vocabulary is
 * small enough to TRAVEL, so `values` carries the set itself and membership is checked offline. A
 * policy document is not, so these carry a COORDINATE rather than the thing. A verifier still cannot
 * check the clause; what it can now do is find it, which is the whole of what was missing.
 *
 * ─── UNTYPED UNTIL 2026-08-14, WHICH DID NOT MEAN UNGUIDED. IT MEANT REFUSED. ────────────────────
 *
 * `PolicyRef` was three required strings and nothing else, and TypeScript's excess-property check
 * refuses an unknown key on a fresh object literal. Measured against this source: an issuer writing
 * the convention plainly at the call site got
 *
 *   TS2353: Object literal may only specify known properties, and 'clauses' does not exist in type
 *   'PolicyRef'.
 *
 * and the same error one level up for the same fields at the document's top level. THE ONLY ROUTE
 * THAT COMPILED WAS AN INTERMEDIATE `const`, which defeats the check by losing literal freshness.
 * So the convention was not merely undiscoverable by an issuer; the shape refused the plain way of
 * meeting it and admitted only the least discoverable one. */
/** ─── WHERE THESE GO IS NOT A STYLE QUESTION. IT IS MEASURED, AND THE TWO PLACEMENTS DIFFER. ──────
 *
 * INSIDE `policyRef`. Measured 2026-08-14 against this package's own built artifact:
 *
 *   inside policyRef  — signed, and CARRIED WHOLE into the verified block. `verifyDecisionAttestation`
 *                       copies `policyRef` by reference, so every key an issuer wrote arrives.
 *   at the top level  — signed, and SILENTLY DROPPED from the verified block. The `attested` variant
 *                       is built field by field from an enumerated list, and a name not on that list
 *                       exists in the bytes and nowhere a reader reaches.
 *
 * THE TOP-LEVEL CASE IS THE DANGEROUS ONE BECAUSE IT LOOKS LIKE SUCCESS. The document signs, it
 * verifies, the field is inside the signature, and a decider who put them there did everything right
 * and will find them nowhere. Only a party holding the raw document recovers them. */
/** WHAT AN ISSUER PUTS IN `policyRef` BEYOND THE THREE REQUIRED FIELDS, AS DATA RATHER THAN PROSE.
 *
 * EXPORTED AS DATA FOR THE REASON `DENIAL_TAGS` AND THE CONSTRAINT VOCABULARY ARE: a convention
 * nothing can enumerate is one nothing can check, and one that lives only in a doc comment on a type
 * constrains a reader who already agrees. THE PARTY THIS INSTRUCTS IS THE ISSUER, so it is reachable
 * from the package entry point, beside `issueDecisionAttestation`, and not only in a comment a reader
 * of the OUTPUT would find.
 *
 * `capturableLater` IS THE FIELD THAT DECIDES URGENCY, and it is why this is a convention worth
 * adopting before it is enforced. A locator and a retrieval coordinate are facts about WHAT WAS READ
 * AT THE MOMENT OF DECIDING. They cannot be reconstructed afterwards from a document that is still
 * there, because what is missing is not the document — it is which part of it the decider was looking
 * at. Every attestation issued without them is permanently without them.
 *
 * NAMES RECONCILED AGAINST THE READING SIDE, 2026-08-14, rather than chosen here. The convention's
 * consumer is `op-mcp-payment-server`, which already reads these keys; names invented independently
 * here would have produced records written in one vocabulary and read in another, and — see
 * `capturableLater` — those records could never be corrected. */
export type PolicyRefConventionField = 'clauses' | 'version' | 'publisherId' | 'retrievedFrom';
/** The convention an issuer reads, DERIVED FROM THE RECORD ABOVE RATHER THAN LISTED A SECOND TIME.
 *
 * A hand-written second listing is the enumeration this estate keeps finding out of date. There is one
 * declaration; this is a view of it. */
export declare const POLICY_REF_CONVENTION: ReadonlyMap<PolicyRefConventionField, {
    carries: string;
    why: string;
    capturableLater: boolean;
}>;
/** THE PLACEMENT RULE AS A VALUE, so it is assertable rather than merely written down.
 *
 * See the placement note above `POLICY_REF_CONVENTION`. Inside `policyRef` is carried whole; at the
 * document's top level is signed and dropped. This is `true` because the convention's fields go
 * INSIDE, and a change that makes top-level placement work is the thing that would flip it. */
export declare const POLICY_REF_FIELDS_GO_INSIDE_POLICY_REF = true;
/** WHAT `POLICY_REF_CONVENTION` DOES NOT DO, RECORDED BESIDE IT BECAUSE THE GAP IS REACHABLE THROUGH
 * THE OBJECT IT ASKS ISSUERS TO FILL.
 *
 * `assertNoObservation` TESTS TOP-LEVEL KEYS ONLY — it runs `f in input` — so a forbidden name nested
 * inside `policyRef` is not seen. Measured 2026-08-14 against the built artifact: an attestation whose
 * `policyRef` carried `rationale` ISSUED, VERIFIED, and the rationale reached the verified block
 * inside `policyRef`, which is carried whole.
 *
 * THAT HOLE PREDATES THIS CONVENTION AND IS NOT CLOSED BY IT. It is recorded here rather than fixed
 * here for a stated reason: closing it means refusing a shape at issuance, and the ruling over 446
 * live records was convention plus adoption measurement rather than enforcement on this object. A
 * refusal added quietly alongside guidance would be enforcement arriving as a side effect of a
 * document.
 *
 * SO IT IS A NAMED, SEPARATE DECISION, and this is the note that makes it one. What raises its
 * urgency is precisely this convention: telling issuers to put structured facts inside `policyRef`
 * increases the traffic through the one object the observation boundary does not inspect. */
export declare const OBSERVATION_BOUNDARY_DOES_NOT_INSPECT_POLICY_REF = true;
export interface PolicyRef {
    id: string;
    hash: string;
    hashMethod: string;
    /** Clause locators in the publisher's own addressing scheme. OPTIONAL, AND NOTHING REFUSES ITS
     * ABSENCE. See `POLICY_REF_CONVENTION`, and note `capturableLater: false`. */
    clauses?: readonly string[];
    /** The publisher's own version label. NOT the `vocabularyRef.version` rule: carried, never checked,
     * never required. `hash` is what fixes the reference. */
    version?: string;
    /** Who published the policy, which is not necessarily the decider. */
    publisherId?: string;
    /** Where the decider actually obtained the document. `capturableLater: false`. */
    retrievedFrom?: string;
}
/** THE ENUMERATED SET `outcome` IS DRAWN FROM.
 *
 * THE PROBLEM THIS SOLVES, stated because the field looks like bookkeeping. If we define the outcome
 * values, we are interpreting policy, which is the one thing this product does not do. If `outcome` is
 * a free string, nothing is comparable: two deciders both write "cleared" and mean different things,
 * or the same decider changes what it means in March and nothing records that it did. Naming the
 * vocabulary and fixing it by hash avoids both. We attest that the decider chose this value from this
 * set. We never say what the value means.
 *
 * A DECLARED VOCABULARY IS IMMUTABLE. Changing it is a new version with a new hash, the same rule as
 * schema URLs. ATTESTATIONS UNDER DIFFERENT VOCABULARY VERSIONS ARE NOT COMPARABLE WITHOUT AN EXPLICIT
 * MAPPING, AND NO SUCH MAPPING EXISTS. That limit travels with the artifact rather than living in a
 * design note, because the reader who needs it is holding the attestation, not the note.
 *
 * WHAT IS DELIBERATELY ABSENT: any structural classification of outcome values — approve-equivalent,
 * deny-equivalent, and so on. It would buy cross-client comparability and it is precisely where we
 * would be making judgements. No client has asked. It is addable to a vocabulary declaration later
 * without touching anything already signed. */
export interface VocabularyRef {
    /** The vocabulary's own identifier. Opaque, like `PolicyRef.id`. */
    id: string;
    /** WHICH VERSION. Exists so a future client-declared mapping has something to reference on both
     * sides. BUILD THE FIELD, DO NOT BUILD THE MAPPING. */
    version: string;
    hash: string;
    hashMethod: string;
    /** STANDARD OR BESPOKE, as a two-value enum.
     *
     * A verifier seeing only a hash cannot tell one from the other, and that difference matters: an
     * `op-starter-set` value carries whatever comparability the starter set has, a `client-defined` one
     * carries none beyond that client. A free string here yields "custom", "ours", "internal" and no
     * comparability at all, which is the same failure as a free-string `outcome` one level up.
     *
     * `op-starter-set` IS PRESENT IN THE TYPE AND REFUSED AT ISSUANCE, because no OP starter vocabulary
     * is published. See `checkDecisionRefs`. It is declared here rather than added later so that
     * publishing one is a code change and not a change to a signed shape. */
    source: 'op-starter-set' | 'client-defined';
    /** THE DECLARED SET ITSELF, so membership is CHECKABLE rather than asserted.
     *
     * WITHOUT THIS THE HASH COMMITS TO NOTHING A VERIFIER CAN REACH. `id`, `version` and `hash` named a
     * vocabulary that lived somewhere else, so nothing could tell whether `outcome` was actually drawn
     * from it. Measured on a real run: three adjudicating agents produced eighteen determinations, every
     * one of their outcome strings fell outside the set the attestation cited, and every one issued. An
     * attestation asserting membership in a set it is not in is a false statement in the field a
     * compliance buyer compares across decisions.
     *
     * CARRIED RATHER THAN RESOLVED, because verification makes no network call. The set travels with the
     * artifact and a verifier checks membership offline, with no registry and no fetch. */
    values: readonly string[];
}
/** WHETHER THE DECIDER SUPPLIED AN ARTIFACT OF ITS OWN, as a positive state.
 *
 * Same construction as `SignedCredentialRef` in `refusal-signing.ts`, and for the same reason: under
 * JCS an absent field and an omitted field are the same bytes and opposite facts. `not-supplied`
 * asserts "the decider produced no artifact of its own, and here is why" rather than staying silent
 * and letting a reader guess whether the field was dropped in transit. */
export type DeciderArtifactRef = {
    state: 'digest';
    value: string;
} | {
    state: 'not-supplied';
    note: string;
};
/** A decision attestation. A CREDENTIAL IN ITS OWN RIGHT, issued whether or not money moved. */
export interface DecisionAttestation {
    /** The decision this attests to, as the DECIDER identifies it. Their reference, not ours. */
    decisionId: string;
    /** Who decided. Resolvable, and NOT this service. */
    decider: string;
    /** What the decision was about: the claimant, the account, the obligation. */
    subject: string;
    /** What was decided. A denial is an outcome, not an absence, which is the whole of §7.
     *
     * A VALUE FROM `vocabularyRef`, NEVER PROSE, AND NEVER INTERPRETED BY US. We attest that the decider
     * chose THIS value from THAT enumerated set, fixed by hash. We assign no meaning to any value: if we
     * defined them we would be interpreting policy, and if this were a free string nothing would be
     * comparable across deciders or across time. Both failures are avoided by naming the vocabulary
     * rather than by constraining the value here. */
    outcome: string;
    /** WHICH POLICY THE DECIDER APPLIED, FIXED RATHER THAN MERELY NAMED.
     *
     * A bare reference names a document that can change after the decision, which breaks the
     * frozen-evidence rule this estate applies everywhere else: a record of what happened is never
     * updated to match what is known later. With the hash, the attestation says which VERSION was
     * applied, and a verifier reading a policy that no longer matches learns that rather than being
     * silently misled. */
    policyRef: PolicyRef;
    /** THE VOCABULARY `outcome` IS DRAWN FROM.
     *
     * The whole of the outcome design. See `VocabularyRef`. */
    vocabularyRef: VocabularyRef;
    /** A DIGEST OF THE INPUTS, NEVER THE INPUTS.
     *
     * THE CUSTOMER HOLDS THE INPUTS AND THE ATTESTATION COMMITS TO THEM. A claims file contains medical
     * information, account details and personal data, and none of it should be readable by us or by a
     * counterparty verifying the attestation.
     *
     * The digest gives the customer what they need: they can prove later WHICH inputs were before the
     * decider, because only the original set reproduces this value. What they cannot do, and what we
     * cannot do either, is read them from here. */
    inputsDigest: string;
    /** THE DECIDER'S OWN ARTIFACT, BY DIGEST. THIS IS WHERE REASONS BELONG.
     *
     * A DIFFERENT FACT FROM `inputsDigest`, and conflating them is what this field exists to stop.
     * `inputsDigest` commits to what was BEFORE the decider: the claims file, the account state, the
     * evidence. This commits to what the decider PRODUCED: its determination document, under its own
     * signature, where its reasoning belongs.
     *
     * WHY THIS FIELD AND NOT A `reason` STRING. A decision attestation carries no reason, because a
     * reason restated by us is this system producing evidence about a decision it also sells assurance
     * over. The objection that answer has to survive is that a caller could then supply any reason it
     * liked after the fact. This is the answer: the reason is FIXED BY HASH at decision time, held by
     * the decider, authored by the decider, and readable by neither us nor a counterparty verifying the
     * attestation. A caller cannot swap it, and we never hold it.
     *
     * OPTIONAL, AND ITS ABSENCE IS A STATE RATHER THAN A SILENCE. A decider that issues no artifact of
     * its own is a real case and must not be forced to duplicate `inputsDigest` to fill this in. It is a
     * positive-state union for the reason `SignedCredentialRef` is: an absent key and a key that is
     * present-but-empty are the same bytes and opposite facts, so `not-supplied` SAYS the artifact was
     * not supplied and says why. Never defaulted, and specifically never defaulted to `inputsDigest` —
     * that would assert the decider explained itself when what it actually did was receive inputs. */
    deciderArtifactDigest: DeciderArtifactRef;
    /** When the decider says it decided. Their timestamp: we did not watch it happen. */
    decidedAt: string;
    /** THE FIGURE THE DECISION PRODUCED, when it produced one.
     *
     * OPTIONAL, AND ABSENCE IS NOT MISMATCH. Not every decision is a calculation: a claim approval, an
     * eligibility ruling and a policy exception all decide something and commit to no number. An
     * attestation carrying none is complete, and a payment citing it is not contradicted by it.
     *
     * Present, it BINDS: a payment citing this attestation and moving a different amount is refused.
     * That is the whole of the computed-amount case — a fee charge is only meaningful if the amount
     * paid is the amount the calculation produced, and `outcome` is free prose that nothing can check. */
    amount?: AttestedAmount;
    /** WHO THE DECISION AUTHORISES PAYING. NOT `subject`, AND THE TWO MUST NOT COLLAPSE.
     *
     * `subject` is what the decision was ABOUT: the claimant, the account, the obligation. This is who
     * the money goes to. They are frequently different parties — an exception cleared on account A is
     * settled to the counterparty on the instruction — and reading one as the other would bind a
     * payment to the wrong party while appearing to bind it.
     *
     * PRESENT AND SIGNED FROM THE FIRST ATTESTATION. NOT YET COMPARED AGAINST ANY PAYMENT.
     *
     * WHY IT EXISTS BEFORE IT IS ENFORCED, WHICH IS THE OPPOSITE OF THE USUAL ORDER HERE. The cost of
     * this field is not in the comparison, which is four lines. It is in the SIGNATURE: an attestation
     * is signed over its own bytes, so a field added later is absent from every attestation already
     * issued. Adding it then forces a choice between invalidating every prior attestation and accepting
     * its absence — and accepting absence is exactly the bypass that an optional `amount` already
     * demonstrates, where a requirement to cite a decision is satisfied by citing one that binds
     * nothing. Deferring the field once is a judgement. Deferring it twice is how the bypass becomes
     * permanent, because the body of attestations lacking it only grows.
     *
     * SO: the signed surface exists now, and the enforcement ruling is made ONCE, later, with the
     * comparison and a real client structure in view. Until then this is PRESENT-BUT-UNENFORCED, which
     * is a materially different statement from absent and is the one on the honest-limits list. */
    counterparty: string;
    /** WHICH RAIL THE DECISION AUTHORISES SETTLING ON. Present, signed, and NOT YET COMPARED.
     *
     * The same argument as `counterparty` above, and the same status. `amount` already carries `asset`
     * and `decimals`, so the figure is bound to a unit; nothing binds it to a RAIL. A decision cleared
     * for one rail therefore verifies against a payment moving the same figure on another, which is a
     * live shape rather than a hypothetical: the mandate's own `allowed_rails` refusals exist because
     * agents do propose payments on rails they were not granted. */
    rail: string;
    /** What this attestation's provenance rests on. See ATTESTATION_ASSURANCE. */
    assurance: AttestationAssurance;
    /** Who observed, when assurance is `independently-observed`. Absent under `self-declared`, and its
     * absence is the honest form rather than a missing field. */
    observerRef?: string;
    /** After this, the attestation should not be relied on without re-checking. Derived from the
     * longest applicable dispute window AND the statutory retention period, whichever is longer. The
     * second term is not derivable from any rail and is not invented here. */
    resolvableUntil: string;
}
/** A payment's reference TO an attestation. A STRING, DELIBERATELY.
 *
 * A payment cites an attestation by id. It does not embed one, and the type does not permit it: there
 * is no field here that could hold a DecisionAttestation, which is what makes §7 structural rather
 * than a convention someone maintains. */
export interface AttestationCitation {
    /** The `decisionId` of a DecisionAttestation issued independently of this payment. */
    citesDecisionId: string;
}
export type AttestationAssurance = 
/** THE DECIDER SIGNED ITS OWN ATTESTATION. Nothing beyond signature verification is required, and
 * it is HONOURABLE ON DAY ONE: the decider is making a signed, non-repudiable statement about a
 * decision it made, which is more than an unsigned log and less than an independent record. */
'self-declared'
/** A THIRD PARTY OBSERVED AND CO-SIGNED. Expressed and NOT BUILT: no partner integration exists.
 *
 * CAPABILITY-GATED. An evaluator that cannot verify the observer's reference DECLINES the
 * credential rather than accepting provenance it cannot check, on the same reasoning as every other
 * critical field: accepting an unverifiable claim about provenance is worse than refusing it,
 * because it reaches a receipt as evidence. */
 | 'independently-observed';
export declare const ATTESTATION_ESTABLISHES: {
    /** A named decider made a non-repudiable statement. That is the whole of what a signature buys, and
     * it is not nothing: it cannot later be denied. */
    readonly deciderMadeTheStatement: true;
    /** The statement existed at or before the time it was verified against a resolvable key. */
    readonly statementExistedAtVerification: true;
    /** The inputs are committed to. Only the original set reproduces `inputsDigest`, so the customer can
     * prove later which inputs were before the decider. */
    readonly inputsAreCommittedTo: true;
    /** A decision with no payment is recorded. This is §7 as a claim: a denial produces an attestation
     * because the attestation stands alone. */
    readonly decisionsWithoutPaymentsAreRecorded: true;
    /** NOT that the decision was correct, reasonable, or compliant. An attestation is a record that a
     * decision was made, by whom, about what. Nothing in it evaluates the decision, and a signature over
     * a wrong decision is a signed wrong decision. */
    readonly decisionWasSound: false;
    /** NOT that we observed the decision being made. We attest to a decision something else made; the
     * decider's own artifact carries its reasons under its own signature. See the boundary above. */
    readonly weObservedTheDecision: false;
    /** NOT what the inputs WERE. `inputsDigest` commits without disclosing, deliberately: a claims file
     * holds medical and personal data that neither we nor a verifying counterparty should read. */
    readonly inputsAreReadable: false;
    /** NOT that decisions producing no attestation did not happen.
     *
     * THIS ROW CARRIES ITS OWN REASONING BECAUSE IT IS THE EASIEST TO GET BACKWARDS. An absent
     * attestation is an absence, and absence has more causes than presence: the decider may not have
     * been configured, the issuance may have failed, or the decision may genuinely not have occurred.
     *
     * THE EXCEPTION IS WHAT MAKES IT USEFUL: if the mandate REQUIRED an attestation, then a payment
     * without one was refused, and the absence of the payment IS established. The claim is bounded by
     * what the mandate demanded, not by what the record happens to contain. */
    readonly absentAttestationMeansNoDecision: false;
};
/** Signs decision attestations. */
export interface AttestationSigner {
    /** WHO DECIDED, from the signer rather than from the caller. A caller-supplied decider is a caller
     * asserting whose decision this was. */
    deciderDid(): Promise<string>;
    sign(payload: string): Promise<string>;
    /** WHAT THIS SIGNER CAN HONESTLY CLAIM. Not read from the input. */
    assurance(): AttestationAssurance;
}
export type IssueResult = {
    kind: 'issued';
    attestation: DecisionAttestation;
    signature: string;
} | {
    kind: 'refused';
    reason: string;
};
/** Validate `policyRef` and `vocabularyRef`. Returns a refusal reason, or null when both are well formed.
 *
 * ENFORCED AT ISSUANCE, NOT DOCUMENTED. A field whose rules live only in a doc comment is a comment:
 * it constrains a reader who already agrees and nothing else. `hashMethod` in particular is worth
 * nothing unless something refuses an attestation that omits it, because the failure it prevents is a
 * verifier assuming the method we happened to use. */
export declare function checkDecisionRefs(policyRef: PolicyRef | undefined, vocabularyRef: VocabularyRef | undefined): string | null;
/** Is `outcome` a member of the set `vocabularyRef` declares? Returns a refusal reason, or null.
 *
 * REFUSED, NOT WARNED, AND NOT RECORDED AS AN ANOMALY. Ruled 2026-08-05. An attestation whose
 * `outcome` is outside the set it cites is a FALSE STATEMENT in the one field a compliance buyer
 * compares across decisions — it asserts membership in a set the value is not in. A warning would
 * leave that statement signed and shipped.
 *
 * WHAT IT COSTS, STATED BECAUSE IT IS THE POINT RATHER THAN A SIDE EFFECT. This makes a vocabulary a
 * real onboarding decision instead of a formality. If a client's agents produce outcomes outside their
 * declared set, either the set is wrong or the agents are — and both are worth learning at ISSUANCE,
 * where one artifact fails loudly, rather than at AUDIT, where a year of them read as comparable and
 * are not.
 *
 * EXACT MATCH, NO NORMALISATION. No case folding, no trimming, no fuzzy mapping. Normalising here
 * would be this system deciding that "Compensation owed" means `compensation_due`, which is
 * interpreting the determination — the thing we do not do. Mapping a decider's prose onto a declared
 * value is the DECIDER's act, and its prose belongs in its own artifact where reasons belong. */
export declare function checkOutcomeInVocabulary(outcome: unknown, vocabularyRef: VocabularyRef | undefined): string | null;
export declare function checkDeciderArtifactRef(ref: DeciderArtifactRef | undefined): string | null;
/** Validate the payment-binding surface: who the decision authorises paying, and on which rail.
 *
 * ─── AN ARTIFACT THAT NAMES NOTHING CONSTRAINS NOTHING ───────────────────────────────────────────
 *
 * BOTH ARE REQUIRED ON EVERY ATTESTATION, INCLUDING A DENIAL, AND THAT IS THE INTERESTING CASE. The
 * objection is obvious: a denial pays nobody, so naming a payee looks like filling in a field for the
 * sake of it.
 *
 * IT IS THE OPPOSITE. A denial that named no counterparty would be the single easiest artifact in
 * this system to cite falsely. A later payment to ANY party could attach it, and a binding check
 * would have nothing to compare against — so the one document that refuses a payment would authorise
 * every payment. The weakest legal value of an optional field is "no constraint".
 *
 * THE NARROWER RULE WAS CONSIDERED AND REJECTED: requiring the pair only when `amount` is present.
 * That reintroduces, inside the mechanism built to prevent it, exactly the defect that made `amount`
 * itself insufficient — an attestation that commits to nothing satisfies a requirement to cite
 * something. Same shape, new field.
 *
 * THIS GENERALISES AND IS NOT A LOCAL DECISION. Any field added to bind one artifact to another must
 * be mandatory on every instance of that artifact, or the instances lacking it become the preferred
 * thing to cite. A binding surface with holes routes traffic to the holes.
 *
 * REFUSED AT ISSUANCE, DELIBERATELY NOT AT VERIFICATION, WHICH BREAKS THE PARITY RULE THIS FILE
 * OTHERWISE APPLIES. Everywhere else here, "a state this service will not sign is a state it must not
 * accept either" — `checkDecisionRefs`, `checkDeciderArtifactRef` and `checkOutcomeInVocabulary` are
 * all run against documents we did not issue, for the reason that a good signature over a malformed
 * claim is still a malformed claim.
 *
 * These two are not run there, and the difference is that an absent `counterparty` is not a MALFORMED
 * claim. It is an OLDER SHAPE. Refusing it at verification would make every attestation issued before
 * today `cited-invalid`, which is the state documented as the only one indicating hostility, for
 * documents whose only defect is their age. That is a caption asserting an outcome the facts
 * disprove.
 *
 * THE ASYMMETRY IS THE WHOLE POINT AND IS TEMPORARY. We refuse to SIGN one without these fields, so
 * every attestation this estate issues from now on carries them; we ACCEPT one without them, so the
 * enforcement ruling can be made once, later, against a corpus where the field is universal rather
 * than against a mixed population where it is not. When that ruling lands, this comment is the thing
 * to delete, and the parity rule reasserts itself. */
export declare function checkPaymentBinding(counterparty: unknown, rail: unknown): string | null;
/** Issue a decision attestation.
 *
 * The assurance recorded is the SIGNER's, never the caller's. A caller asking for
 * `independently-observed` from a signer that can only self-declare is REFUSED, because the
 * alternative is a credential that reaches a counterparty carrying provenance nobody established. */
export declare function issueDecisionAttestation(input: Omit<DecisionAttestation, 'decider' | 'assurance'>, signer: AttestationSigner, requestedAssurance?: AttestationAssurance): Promise<IssueResult>;
/** What a verifier can do. */
export interface VerifierCapabilities {
    /** Whether this verifier can resolve and check an observer's reference. FALSE IN v1: NO PARTNER
     * INTEGRATION EXISTS, and this flag is how that fact is expressed rather than assumed. */
    canVerifyObserver: boolean;
}
export type AcceptResult = {
    kind: 'accepted';
} | {
    kind: 'declined';
    reason: string;
};
/** CAPABILITY-GATED ACCEPTANCE.
 *
 * A verifier that cannot check an observer DECLINES an `independently-observed` attestation rather
 * than accepting provenance it cannot verify. Same reasoning as every other critical field: an
 * unverifiable claim that is accepted reaches a receipt AS EVIDENCE, which is worse than a refusal
 * because the refusal is visible and the acceptance is not. */
export declare function acceptDecisionAttestation(attestation: Pick<DecisionAttestation, 'assurance' | 'observerRef'>, capabilities: VerifierCapabilities): AcceptResult;
/** What a payment's attestation citation resolved to.
 *
 * FOUR, NOT THREE, AND THE FOURTH IS THE ONE THAT MATTERS MOST. `cited-unresolvable` is an ABSENCE:
 * nothing could be obtained or the method cannot be checked here. `cited-invalid` is a signed artifact
 * FAILING ITS OWN CHECK, which is a bug or an attack. An approver who cannot tell "we could not check"
 * from "we checked and it failed" is being shown the same screen for a missing file and a forged one.
 *
 * IT IS THE ONLY STATE THAT INDICATES HOSTILITY, so it must be visually distinct on every surface and not
 * merely different in the data. */
export type AttestationState = 'attested' | 'not-cited' | 'cited-unresolvable' | 'cited-invalid'
/** THE FIFTH, AND IT IS NOT A FLAVOUR OF THE FOURTH.
 *
 * The attestation VERIFIED — real signature, real decider key, citation matching the document —
 * and it commits to an amount the payment citing it does not move. The artifact did not fail its
 * own check; it is sound and the payment contradicts it.
 *
 * FILED SEPARATELY FROM `cited-invalid` BECAUSE THE CAPTION WOULD OTHERWISE LIE. `cited-invalid`
 * renders as "A claimed decision did NOT survive verification", which is false here: it survived.
 * Putting this under that heading would be a caption asserting an outcome the code disproves,
 * which is the defect the attestation work already had once.
 *
 * AND THE REMEDY DIFFERS. `cited-invalid` says distrust the document. This says the document is
 * fine and the PAYMENT is wrong — a citation of the wrong decision, a calculation that moved after
 * the decision, or an amount altered between decision and payment. */
 | 'cited-contradicted';
/** WHAT A DECISION COMMITS THE PAYMENT TO, when the decision produced a figure.
 *
 * INTEGER MINOR UNITS, because a fee charge is the output of a calculation and a decimal string
 * compared as text is a rounding artifact waiting to be read as agreement. Carries its own decimals
 * and asset so a comparison never has to normalise across units it cannot establish. */
export interface AttestedAmount {
    amountRaw: string;
    /** A STRING, AND THAT IS FORCED RATHER THAN CHOSEN. `src/jcs.ts` refuses numbers outright: RFC
     * 8785's number rules are where a canonicaliser goes subtly wrong and produces bytes that look
     * right and no other implementation reproduces. This value is signed over, so it must be
     * canonicalisable, and the alternative was extending a canonicaliser whose own comment says not to.
     * Found by issuing one, not by reading the type. */
    decimals: string;
    asset: string;
}
/** The attestation block carried on a RoutingVerdict and copied to ApprovalFacts.
 *
 * A DISCRIMINATED UNION, DELIBERATELY, SO "AN UNVERIFIED DOCUMENT CONTRIBUTES NO FACTS" IS STRUCTURAL.
 * The three non-attested variants have NO FIELD that could hold a decision fact, so an unverified
 * attestation cannot contribute facts-marked-unverified: there is nowhere to put them. Same construction
 * as §7's citation shape, and for the same reason — a rule the type enforces is not a rule someone
 * maintains.
 *
 * WHAT THE PAYMENT CLAIMED TO CITE IS NOT HERE. It is agent-supplied, so it lives in
 * `agentSupplied.citedDecisionId` where it is already quarantined, rendered last and marked unverified. */
export type AttestationBlock = {
    state: 'attested';
    /** From the VERIFIED document, never from the citation. */
    decisionId: string;
    decider: string;
    outcome: string;
    policyRef: PolicyRef;
    /** WHAT `outcome` MEANS IS NOT HERE, AND THAT IS THE DESIGN. This says which enumerated set the
     * value came from and whether that set is ours or the client's. An approver comparing two
     * decisions needs it: the same word under two vocabularies is not the same outcome. */
    vocabularyRef: VocabularyRef;
    decidedAt: string;
    /** WHETHER THE DECIDER PRODUCED AN ARTIFACT OF ITS OWN, and its digest when it did.
     *
     * Carried through for the same reason `inputsDigest` is: it was signed over, and dropping it
     * would leave an approver holding a decision with no way to reach the document that explains
     * it. `not-supplied` is shown as the stated absence it is, never as a blank. */
    deciderArtifactDigest: DeciderArtifactRef;
    /** THE COMMITMENT TO THE INPUTS, CARRIED THROUGH.
     *
     * It was computed at issuance and dropped before anyone could act on it, so an approver saw a
     * decision and could not tell what it was decided FROM. For a computed amount that is the
     * whole question: an auditor checks that these inputs under this policy yield this figure, and
     * the digest is the only thing that makes the input set checkable later. */
    inputsDigest: string;
    /** The figure the decision produced, when it produced one. Absent for decisions that are not
     * calculations, which is a complete attestation rather than a missing field. */
    amount?: AttestedAmount;
    /** WHO THE DECISION AUTHORISED PAYING, AND ON WHICH RAIL. Carried from the verified document
     * and COMPARED AGAINST NOTHING.
     *
     * OPTIONAL HERE WHILE REQUIRED AT ISSUANCE, and the difference is not an oversight. Issuance
     * refuses to sign an attestation lacking them; verification accepts a document that lacks them,
     * because a document issued before the fields existed is old rather than malformed. See
     * `checkPaymentBinding`.
     *
     * ON SCREEN THIS MUST NOT READ AS A CHECKED FIELD. A surface that renders `counterparty` beside
     * a verified badge invites the reading that the payment was bound to it, which is the exact
     * defect the amount comparison was built to close: two unrelated facts on one screen with
     * nothing binding them. Until the comparison exists, these are the decider's claims about its
     * own decision, verified as having been SAID and not as being TRUE of this payment. */
    counterparty?: string;
    rail?: string;
} | {
    state: 'not-cited';
} | {
    state: 'cited-unresolvable';
    reason: string;
} | {
    state: 'cited-invalid';
    reason: string;
}
/** VERIFIED, AND CONTRADICTED BY THE PAYMENT CITING IT.
 *
 * Carries BOTH figures, because "these disagree" is unactionable without saying by how much and in
 * which direction. It also carries the decision's identity — unlike the other three non-attested
 * states, whose whole point is that they contribute no facts. Here the facts are established: the
 * signature verified. What is refused is the payment, not the attestation. */
 | {
    state: 'cited-contradicted';
    reason: string;
    decisionId: string;
    decider: string;
    policyRef: PolicyRef;
    inputsDigest: string;
    attested: AttestedAmount;
    payment: AttestedAmount;
};
/** Resolve a `did:web` decider to its raw ed25519 public key.
 *
 * SUPPLIED BY THE DEPLOYMENT, NOT BY THIS PACKAGE, and that is the whole design. Returning a key means
 * "this domain publishes this key in its assertionMethod". Returning undefined means "I could not
 * establish that", and the caller must not distinguish a 404 from a timeout here — both are the same
 * fact to a verifier: nothing was established.
 *
 * THROWING IS DIFFERENT FROM RETURNING UNDEFINED, deliberately. A resolver that throws is reporting a
 * refusal it made on purpose — the url-guard rejecting a private address, for instance — and that is
 * surfaced with its reason rather than flattened into "unavailable". */
export type DeciderResolver = (did: string) => Uint8Array | undefined;
/** Verify a decision attestation carried alongside a payment.
 *
 * did:key ALWAYS. did:web ONLY IF THE DEPLOYMENT SUPPLIES A RESOLVER, and REFUSED BY NAME otherwise.
 *
 * A did:key encodes its own public key, so verification needs no network, no DID document and no trust in
 * the transporter. `did:web` needs an outbound call, so it is **opt-in per deployment**: pass
 * `resolveDeciderDidWeb` and this function will use it; omit it and `did:web` is refused exactly as
 * before. **A consumer of this package does not silently acquire a network call in its evaluation path
 * by upgrading.** That default is the point, not an oversight.
 *
 * UNRESOLVABLE IS `cited-unresolvable`, NOT A DENIAL, AND THIS IS NOT THE STATUS-LIST SHAPE.
 * An unreachable status list means the credential MAY HAVE BEEN REVOKED and we cannot tell: the unknown
 * is adverse, so it fails closed. An unreachable decider document means WE CANNOT SAY WHO SIGNED — and
 * the attestation is evidence carried ALONGSIDE a payment, not the authority FOR it. The mandate
 * authorises the payment. So the payment escalates carrying a citation marked unverified, a human sees
 * "a decision was cited and we could not check it", and a decider's DNS outage does not become a payment
 * outage. Never fail-open: an unresolved decider never renders as `attested`.
 *
 * SAME CONSTRUCTION AS `device-bound` ON `approvers.assurance` WHEN NO RESOLVER IS SUPPLIED: the value is
 * expressible, it cannot be EARNED here, and it is REFUSED rather than accepted-and-labelled. A claim
 * nobody can check must not reach an approver as though someone had.
 *
 * WHAT A RESOLVED did:web ESTABLISHES, AND ITS LIMIT: that the holder of a key the domain publishes
 * signed this. NOT that the organisation authorised the decision internally. No cryptography here can
 * establish the second, and the first is what a counterparty needs to begin diligence.
 *
 * THE CITATION IS CHECKED AGAINST THE DOCUMENT. An agent that cites one decision and ships another would
 * otherwise have the approver read the shipped one. */
export declare function verifyDecisionAttestation(citedDecisionId: string | undefined, document: unknown, signature: string | undefined, verifyEd25519: (message: string, signature: Buffer, publicKey: Buffer) => boolean, decodeDidKey: (did: string) => Uint8Array | undefined, resolveDeciderDidWeb?: DeciderResolver): AttestationBlock;
