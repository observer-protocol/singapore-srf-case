import type { ClaimedKeyCustody } from './types.js';
export declare const RESOLUTION_PAYLOAD_TYPE = "op.approval.resolution.v1";
/** Who signed a resolution. Named for what it is AS SIGNED, following `SignedDenialDetail`. */
export interface ResolutionActor {
    issuer: string;
    approverRef: string;
    /** WHAT THE SIGNER CLAIMED, not what a credential required. Typed `RequiredKeyCustody` through
     * rc.14, which made a claimable-but-undesignatable custody unrepresentable. See the note on
     * `ClaimedKeyCustody`. */
    assurance: ClaimedKeyCustody;
}
/** A resolution as signed. `lapsed` carries no actor and has its own payload — see `lapse.ts`. */
export interface SignableResolution {
    handleId: string;
    how: 'approved' | 'denied';
    at: string;
    actor: ResolutionActor;
    reason?: string;
}
export declare function resolutionPayload(r: SignableResolution): string;
