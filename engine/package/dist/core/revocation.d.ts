import type { BitstringStatusListEntry, VerifierConfig } from './types.js';
export interface RevocationCheckOutcome {
    revoked: boolean;
    detail: string;
    notes: string[];
}
export declare function checkStatusEntry(entry: BitstringStatusListEntry, config: VerifierConfig): Promise<RevocationCheckOutcome>;
