/** Scale of all converted budget amounts: 10^6 units per 1 unit of currency. */
export declare const CROSS_RAIL_SCALE = 6;
/** Thrown when a second writer is detected on the same ledger path concurrently
 * with this process. Fail-closed: callers MUST treat this as a DENY, never as a
 * zero/low counter. The single-writer contract is deliberate — for a budget
 * shared across processes/hosts, use a shared-counter service, not this file. */
export declare class ObserverLedgerContentionError extends Error {
    readonly foreignWriter: string;
    constructor(foreignWriter: string);
}
/** Convert a raw asset amount into budget-currency units at CROSS_RAIL_SCALE,
 * using a principal-attested decimal rate (price of 1 whole asset unit in the
 * budget currency). Rounds up. Throws on a malformed rate. */
export declare function convertToBudgetUnits(amountRaw: bigint, assetDecimals: number, rate: string): bigint;
/** Render a CROSS_RAIL_SCALE-scaled amount as a decimal string. */
export declare function formatBudgetUnits(scaled: bigint): string;
export interface CrossRailSpend {
    rail: string;
    asset: string;
    amountRaw: string;
    decimals: number;
    /** The counterparty this spend went to, AS THE MANDATE MATCHED IT rather than as
     * the rail names it, so a later per-counterparty cap can re-match it against the
     * same allowList. Optional because some rails have no counterparty to record: on
     * Lightning a payment resolves to a node pubkey that may aggregate many payees.
     *
     * ADDED BEFORE IT IS USED, deliberately, and that is not the reserved-and-unused
     * shape it resembles. This is an append-only ledger: a field added later means
     * every historical line lacks it permanently, so a per-counterparty cap would have
     * no history to evaluate against and would start from the day someone thought of
     * it. Populated from the first line or never useful. */
    counterparty?: string;
}
export type CrossRailTotal = {
    ok: true;
    total: bigint;
} | {
    ok: false;
    reason: string;
};
/**
 * Append-only JSONL ledger of raw per-rail spends. Amounts are stored RAW in
 * their own asset (never pre-converted), so the sum is always taken against
 * the CURRENT mandate's rates — a re-issued mandate with new rates re-prices
 * history instead of trusting stale conversions.
 */
export declare class CrossRailLedger {
    private readonly path;
    /** CLAIM_OFFSET: the file's size when this instance opened it.
     *
     * Everything before it was already there and is history, whoever wrote it.
     * Everything at or after it was appended while we were live, so a foreign writer
     * there is genuinely concurrent. That is the whole of the single-writer guard, and
     * it needs no clock: an append-only file already carries a total order, and a byte
     * offset cannot go backwards when the host's clock does.
     *
     * Reset after a successful `rewrite`, because a rewrite compacts the file and
     * invalidates every offset. Safe to reset: `rewrite` runs the same guard over every
     * line first and throws before compacting, so a file it has just written contains
     * no concurrent foreign records by construction. */
    private claimOffset;
    constructor(path: string);
    private fileSize;
    /** Record a committed spend immediately (signer-boundary path: the signature
     * IS the spend commitment — settlement timing is the facilitator's). */
    record(spend: CrossRailSpend): void;
    /** Reserve budget headroom before an out-of-process payment executes.
     * Counted by sums immediately; expires after 5 minutes if abandoned. */
    reserve(spend: CrossRailSpend): string;
    commit(reserveId: string | null): void;
    release(reserveId: string | null): void;
    /** Rolling-24h total across ALL rails, converted into the budget currency at
     * the supplied principal-attested rates (CROSS_RAIL_SCALE units, per-entry
     * round-up). An in-window entry whose asset has no rate, or that cannot be
     * parsed as a spend, makes the total unestablishable: {ok:false} — the
     * caller MUST fail closed, because an unpriceable spend still consumed the
     * budget. */
    sumWindowConverted(rates: Record<string, string>, nowMs?: number): CrossRailTotal;
    /** Rolling-24h raw total for ONE asset — feeds tm.velocity.dailyVolumeCap as
     * ctx.spending.daily_total. Rolling 24h is a superset of the calendar-day
     * counter the velocity note documents, so the cap trips early, never late.
     * Entries that do not parse are skipped here (they cannot lower a same-asset
     * sum; the binding cross-rail path above still fails closed on them).
     * @throws ObserverLedgerContentionError if a second writer is detected on this
     * path — callers MUST treat the throw as a DENY (never a zero counter). */
    sumWindowRaw(asset: string, nowMs?: number): bigint;
    /** Rolling 30-day raw total for ONE asset, for tm.velocity.monthlyVolumeCap.
     * Same shape and same conservative posture as sumWindowRaw: unparseable entries
     * are skipped (they cannot lower a same-asset sum) and the binding cross-rail
     * path still fails closed on them.
     * @throws ObserverLedgerContentionError if a second writer is detected. */
    sumMonthWindowRaw(asset: string, nowMs?: number): bigint;
    /** Drop entries older than the longest served window and expired reservations. */
    prune(nowMs?: number): void;
    private window;
    private append;
    private rewrite;
}
