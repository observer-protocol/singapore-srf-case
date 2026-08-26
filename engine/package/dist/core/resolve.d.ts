export interface CachedFetchResult {
    body: string;
    fresh: boolean;
    ageHours: number;
    note?: string;
}
export declare function didWebToUrl(did: string): string;
/**
 * Refresh-first cached fetch. Throws with a deny-grade message when the
 * resource is unreachable AND the cache is missing or older than
 * maxStalenessHours.
 */
export declare function cachedFetch(url: string, cacheDir: string, timeoutMs: number, maxStalenessHours: number, sanctionedOrigins?: readonly string[]): Promise<CachedFetchResult>;
export interface VerificationMethodEntry {
    id: string;
    type?: string;
    controller?: string;
    publicKeyMultibase?: string;
}
export interface DidDocument {
    id: string;
    verificationMethod?: VerificationMethodEntry[];
    assertionMethod?: Array<string | VerificationMethodEntry>;
}
/**
 * Derive a DID document for a did:key DID in-memory per the did:key spec.
 * No network access required — the public key is embedded in the DID string.
 * The verificationMethod id uses the canonical did:key fragment (same as the
 * multibase key identifier).
 */
export declare function resolveDidKeyDocument(did: string): DidDocument;
/**
 * Resolve a DID document. Dispatches by DID method:
 *   did:key  — derived in-memory from the key material (no network, offlinePath ignored)
 *   did:web  — offline override file when configured, otherwise HTTPS with refresh-first caching
 */
export declare function resolveDidDocument(did: string, opts: {
    cacheDir: string;
    timeoutMs: number;
    maxStalenessHours: number;
    offlinePath?: string;
}): Promise<{
    doc: DidDocument;
    note?: string;
}>;
/**
 * Select the verification method named by `vmId`, requiring it to be
 * assertionMethod-valid on the DID document. A key merely present in
 * verificationMethod but absent from assertionMethod is REJECTED — this is
 * the wrongful-acceptance case strict W3C verification exists to prevent.
 */
export declare function findAssertionMethodKey(doc: DidDocument, vmId: string): {
    entry: VerificationMethodEntry;
};
