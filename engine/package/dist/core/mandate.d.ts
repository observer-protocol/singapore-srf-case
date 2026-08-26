import type { ObserverDelegationCredential, PolicyContext, ResolvedTransfer, VerifierConfig } from './types.js';
import { type DenialDetail } from './denial.js';
export interface MandateOutcome {
    ok: boolean;
    reason: string;
    notes: string[];
    /** Present when the payment is permitted BUT requires a human. `ok` is false because the payment must
     * not proceed unattended, and an outcome that said otherwise would be read as permission by anything
     * not looking for this field. Optional, so every existing caller keeps working unchanged. */
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
        /** WHICH CONSTRAINT ROUTED THIS TO A HUMAN, as a dotted path, and NOT a breach.
         *
         * ADDED IN 1.0.0-rc.5 BECAUSE ITS ABSENCE WAS BEING WORKED AROUND DOWNSTREAM THREE TIMES. The
         * escalation said a human must authorise the payment and never said which rule decided that, so
         * every consumer that needed the answer supplied its own: `op-mcp-payment-server` defaulted it to
         * `actionScope.escalationThreshold`, then refused to default it, then proposed to assert it under
         * a better field name. Each was diagnosed as a defect in that service. All three were this
         * omission, and naming it here is what makes a consumer able to pass it through without inventing
         * anything.
         *
         * REQUIRED INSIDE `escalation`, not optional. Optional would mean the next escalating rule could
         * ship without naming itself and nothing would report it, which is the state this field exists to
         * end. `escalation` itself stays optional, so no existing caller breaks.
         *
         * THE VALUE COMES FROM THE RULE, NOT FROM THE SITE. There is exactly ONE escalation site in this
         * engine today, which is why a consumer asserting `actionScope.escalationThreshold` would be
         * correct right now and silently wrong at the second site. Being unique is a fact about today, so
         * the path is built from the same symbol the rule reads rather than written out beside it. */
        constraint: string;
    };
    /** Machine-readable detail. Optional so every existing caller keeps working: a
     * new required field on a returned type is a breaking change, which is the same
     * over-refusal as a new required config field. */
    detail?: DenialDetail;
}
/** Parse a decimal string ("0.5") into a bigint scaled by `decimals`. */
export declare function parseDecimalScaled(amount: string, decimals: number): bigint;
/** Match a recipient address against a mandate counterparty list. List
 * entries are raw addresses or DIDs expanded through
 * config.counterpartyAddressMap. Returns which DIDs could not be expanded so
 * callers can fail closed on them.
 *
 * Case handling is rail-family-aware (`caseExact`): EVM hex addresses are
 * case-insensitive by definition (EIP-55 is only a checksum), so they fold.
 * base58 addresses (TRON, Solana) are CASE-SENSITIVE — folding them makes a
 * case-collision grindable (search a keypair whose address lowercases to an
 * allowlisted one), so non-EVM rails compare exact bytes. */
/** A counterparty list entry: the legacy bare string, or a typed {kind, value}.
 * Both forms are live: every credential issued against v2.1/v2.3/v2.4 uses the
 * string and keeps working unchanged. */
export type CounterpartyEntry = string | {
    kind: string;
    value: string;
};
export declare function evaluateMandate(ctx: PolicyContext, cred: ObserverDelegationCredential, config: VerifierConfig, resolved: ResolvedTransfer): MandateOutcome;
