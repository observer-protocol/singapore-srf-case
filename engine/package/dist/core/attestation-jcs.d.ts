export declare class NotCanonicalisable extends Error {
}
/** Canonical JSON for the restricted domain.
 *
 * Object keys are sorted by UTF-16 CODE UNIT, which is what `Array.prototype.sort` does on strings by
 * default and what RFC 8785 specifies. No whitespace anywhere. */
export declare function canonicalise(value: unknown, path?: string): string;
/** The bytes to sign. */
export declare const canonicalBytes: (value: unknown) => Buffer;
