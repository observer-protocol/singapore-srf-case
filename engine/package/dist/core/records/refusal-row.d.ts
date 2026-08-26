import type { AppliedBoundReason, Refusal, RefusalAuthority } from './types.js';
import type { AttestationBlock } from '../attestation.js';
import type { SignedCredentialRef } from './refusal.js';
/** The bound as a read route serves it. `not-recorded` is the route describing a record that
 *  predates the field; it is never part of any signed payload. Absent members arrive as `null`. */
export type ServedAppliedBound = {
    state: 'recorded';
    limit: string;
    unit?: string | null;
    observed?: string | null;
    headroom?: string | null;
    note?: string | null;
} | {
    state: 'not-supplied';
    constraint: string | null;
    reason?: AppliedBoundReason | null;
    note: string;
} | {
    state: 'not-recorded';
    note: string;
};
/** The signature as a read route serves it: three positive states, never an absence.
 *  `unverified` is a signature present and failing; `unsigned` is a record written before this
 *  deployment signed refusals. A verifier must not collapse the two. */
export type ServedRefusalSignature = {
    state: 'signed';
    value: string;
    signedBy: string;
    payloadType: string;
} | {
    state: 'unverified';
    value: string;
    signedBy: string;
    payloadType: string;
    reason: string;
} | {
    state: 'unsigned';
    note: string;
};
/** `not-evaluated` is the read route describing ITSELF: the citation was never read. It was never
 *  part of any signed payload and maps back to absent. */
export type ServedAttestation = AttestationBlock | {
    state: 'not-evaluated';
    note?: string;
};
/** One row of `GET /v1/refusals`, which is also what a console's copy button emits. */
export interface RefusalRow {
    refusalId: string;
    at: string;
    observedAt?: string | null;
    agentId: string | null;
    mandateId: string | null;
    refusedBy: RefusalAuthority;
    code: string;
    constraint: string | null;
    attempted: {
        amountRaw: string;
        decimals: number;
        asset: string;
        rail: string;
        counterparty: string | null;
    };
    appliedBound?: ServedAppliedBound | null;
    credential?: SignedCredentialRef | null;
    attestation?: ServedAttestation | null;
    network?: string | null;
    signature: ServedRefusalSignature;
}
/** Whether a value has the served shape. THE MARKER IS THE SIGNATURE: a served row carries it as an
 *  OBJECT with a `state` (`signed` / `unverified` / `unsigned`), a store record as a string or not
 *  at all. That is a total discriminator between the two shapes.
 *
 *  `refusedBy` IS NOT USED AS A MARKER, and a comment is owed because the obvious version of this
 *  function did use it. A store record's `authority` lives under `authority`, and `refusedBy` should
 *  never appear on one — but `test/read-path-gaps.mjs` in `op-mcp-payment-server` writes fixtures
 *  with a stray `refusedBy`, and keying on it classified those as served rows and made
 *  `signableFromRefusal` throw on a store record it had always accepted. The signature marker does
 *  not have that failure mode: an unsigned store record has a string-or-absent signature, so it is
 *  correctly a store record. */
export declare function isRefusalRow(r: unknown): r is RefusalRow;
/** The store-shape record a served row was projected from, so that
 *  `refusalPayload(signableFromRefusal(signableFromRefusalRow(row)))` is the bytes its signature
 *  covers. The version is taken from the ROW'S OWN SIGNATURE VIEW, so a rebuild uses the field list
 *  the record was signed under rather than the one this build issues. An unsigned row has no
 *  version, because a version describes a signature. */
/** What a served row rebuilds to: the store record minus `reason`, which is prose, is not in the
 *  signed bytes, and is not served. Not `''`: the three existing copies of this mapping emit no
 *  such key, and a cross-repo comparison of the rebuilt OBJECTS (not only the bytes) would catch
 *  one that did. `signableFromRefusal` accepts this shape. */
export type RebuiltRefusal = Omit<Refusal, 'reason'>;
export declare function signableFromRefusalRow(row: RefusalRow): RebuiltRefusal;
