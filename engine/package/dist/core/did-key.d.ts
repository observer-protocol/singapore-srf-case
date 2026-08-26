/** A `did:key` that decoded to an ed25519 public key, in BOTH widths this package asks for. */
export interface Ed25519DidKey {
    /** 34 bytes: `0xed 0x01` then the key. What `verifyDecisionAttestation`'s `decodeDidKey` wants. */
    readonly multicodec: Uint8Array;
    /** 32 bytes, the raw ed25519 public key. What `ed25519Verify` and `resolveDeciderDidWeb` want. */
    readonly publicKey: Uint8Array;
}
/** A CALLER PASSED THE WRONG WIDTH. Never a fact about anyone's artifact.
 *
 * ─── WHY A THROW AND NOT A FOURTH `AttestationBlock` MEMBER ─────────────────────────────────────
 *
 * `AttestationBlock` is a closed discriminated union, and it is closed precisely so that its
 * non-attested variants have nowhere to put a decision fact. A `caller-error` member would place a
 * programming mistake in the union a verifier reads for evidence about a payment, and every
 * consumer's exhaustive switch would silently acquire an unhandled case.
 *
 * A THROW CANNOT BE RECORDED AS EVIDENCE, which is the property wanted. It fails loudly in the
 * caller's own test run rather than quietly in a stored record, and it follows the precedent this
 * package already sets where a construction-time mistake throws rather than returning a state. */
export declare class DidKeyConventionError extends Error {
    constructor(message: string);
}
/** Decode a `did:key` bearing an ed25519 public key. `undefined` means it is not one.
 *
 * THE NAME CARRIES THE CURVE. `did:key` also encodes secp256k1, P-256 and others, and a decoder that
 * returned 34 bytes for one of those would hand a caller a key of the wrong algorithm at the right
 * length. The multicodec prefix is CHECKED, not assumed. */
export declare function decodeEd25519DidKey(did: string): Ed25519DidKey | undefined;
/** Refuse a `decodeDidKey` callback that returned its neighbour's width.
 *
 * ─── THE ORDER OF THESE THREE TESTS IS LOAD-BEARING ─────────────────────────────────────────────
 *
 * `undefined` first, then LENGTH, then the prefix. A 32-byte return is unambiguously the wrong
 * convention only because 34 is the required width here — a future multicodec whose payload happened
 * to be 32 bytes would be caught by the PREFIX check, not the length one. Testing the prefix first
 * would report such a key as a caller error, which is the same class of false claim in the other
 * direction. */
export declare function refuseWrongDidKeyWidth(raw: Uint8Array | undefined, parameter: string): void;
