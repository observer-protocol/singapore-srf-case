import type { PolicyContext, ResolvedTransfer, VerifierConfig } from './types.js';
import type { Verdict } from './verify.js';
export type IssuanceMode = 'dev' | 'full';
export interface RuntimeAdapterConfig extends VerifierConfig {
    /** Path to the WalletBindingCredential. When absent, bind+link steps are skipped. */
    walletBindingCredentialPath?: string;
    /** Governs the LINK step check. Required when walletBindingCredentialPath is set. */
    issuanceMode?: IssuanceMode;
}
/**
 * BIND→LINK→AUTHORIZE gate.
 *
 * When walletBindingCredentialPath is absent in config, falls through to
 * verifyCredential + enforceMandate with no behavioral change.
 *
 * When walletBindingCredentialPath is present, runs all three steps.
 * The issuanceMode in config (or wbc.credentialSubject.issuanceMode as
 * fallback) determines which LINK rule applies.
 */
export declare function runRuntimeAdapter(ctx: PolicyContext, config: RuntimeAdapterConfig, resolved: ResolvedTransfer, nowMs: number): Promise<Verdict>;
