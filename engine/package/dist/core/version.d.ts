export declare const CORE_VERSION: string;
/** First core version that fully closed the cross-rail ledger fail-open: the
 * single-writer fail-closed guard with host:pid identity. Below this the ledger
 * either races silently and under-counts (<0.3.1) or false-contends when the
 * core is bundled into multiple co-located adapters (0.3.1). */
export declare const LEDGER_SAFE_FLOOR = "0.3.2";
/** -1 | 0 | 1 for a<b | a==b | a>b at major.minor.patch. */
export declare function compareCoreVersion(a: string, b: string): number;
export interface LedgerCoreStatus {
    coreVersion: string;
    floor: string;
    safe: boolean;
    /** true when the stamp is absent (a build produced without the --define) —
     * treated as UNSAFE: an unstamped build cannot prove its core is fixed. */
    unstamped: boolean;
}
/** Report whether the BUNDLED core is at/above the ledger-safe floor, and
 * optionally enforce it. WARNs by default; `mode:'refuse'` throws. A gate that
 * ships with a frozen core should be able to tell you the core is broken — this
 * is that signal, carried in the same bundle as the core it describes. */
export declare function assertLedgerCoreSafe(opts?: {
    mode?: 'warn' | 'refuse';
    logger?: (m: string) => void;
}): LedgerCoreStatus;
