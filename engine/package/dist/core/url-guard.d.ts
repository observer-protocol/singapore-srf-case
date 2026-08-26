export declare class ObserverUrlRefusedError extends Error {
    readonly url: string;
    readonly why: string;
    constructor(url: string, why: string);
}
/** Classify a literal address. Returns a reason string when the address must
 * not be dialled, or null when it is a routable public address. */
export declare function blockedAddressReason(addr: string): string | null;
/** Validate one URL: scheme, then the host, resolving it if it is a name.
 *
 * `sanctioned` is the set of origins the DEPLOYING OPERATOR has explicitly
 * listed. Those skip the address-class refusal, and only that: the scheme check
 * still applies, and every redirect hop is still re-checked against this same
 * rule, so a sanctioned origin cannot redirect into an unsanctioned private one.
 *
 * Why an operator-listed origin may be private at all: the whole SSRF threat is a
 * CREDENTIAL choosing where a verifier dials. Once the operator has named the
 * origin, the credential can only pick among destinations already sanctioned, and
 * the anti-SSRF rationale is spent. Refusing anyway is the control overriding the
 * decision it exists to protect, which is over-refusal with extra steps: an
 * operator running a status list on an internal host has made a deliberate choice
 * and the guard has no standing to veto it.
 *
 * @throws ObserverUrlRefusedError */
export declare function assertFetchableUrl(raw: string, sanctioned?: readonly string[]): Promise<void>;
/** Fetch with the guard applied to the initial URL and to EVERY redirect hop,
 * refusing an https-to-http downgrade. Redirects are followed manually because
 * `redirect: 'follow'` hands the hop decisions to the runtime, where nothing
 * can inspect them. */
export declare function guardedFetch(url: string, timeoutMs: number, opts?: {
    maxHops?: number;
    sanctionedOrigins?: readonly string[];
}): Promise<string>;
/** The origin a did:web issuer's own documents must live on, or null when the
 * issuer DID carries no domain (did:key). */
export declare function didWebOrigin(did: string): string | null;
/** Where a credential-supplied status list may be fetched from.
 *
 * The rule: a status-list URL is dereferenced only when it is origin-pinned to a
 * `did:web` issuer's own domain, OR its origin is one the deploying operator has
 * explicitly listed. The allowlist is EMPTY by default, so the default posture is
 * same-origin only, and `did:key` issuers (which carry no origin) permit nothing
 * until configured.
 *
 * The allowlist exists because the strict pin made a legitimate deployment
 * impossible: a `did:web` issuer serving its status list from a CDN or object
 * store is the normal way to serve a static file at scale, and a control with no
 * escape hatch for that is over-refusal rather than security.
 *
 * INTENDED SUCCESSOR, recorded so this is understood as a bridge rather than the
 * design: the permitted off-origin location is the ISSUER's business, not the
 * verifier operator's. An allowlist puts it in the wrong place, growing with every
 * issuer and requiring coordination the issuer could avoid. The better mechanism is
 * a service entry in the issuer's DID document, which the verifier already
 * resolves, so permitted origins arrive over a channel the issuer controls
 * cryptographically at no extra network cost and with no operator configuration at
 * all. `did:key` still needs the allowlist, having no document to resolve. That is
 * a normative addition and belongs in a spec revision, not here.
 */
export declare function statusListOriginDecision(issuerDid: string, statusListUrl: string, allowlist: readonly string[] | undefined): {
    ok: true;
} | {
    ok: false;
    reason: string;
};
