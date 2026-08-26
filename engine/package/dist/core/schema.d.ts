import type { ObserverDelegationCredential, VerifierConfig } from './types.js';
export declare function validateStructure(cred: ObserverDelegationCredential, config: VerifierConfig): {
    ok: true;
} | {
    ok: false;
    reason: string;
};
export declare function checkValidityWindow(cred: ObserverDelegationCredential, nowMs: number): {
    ok: true;
} | {
    ok: false;
    reason: string;
};
