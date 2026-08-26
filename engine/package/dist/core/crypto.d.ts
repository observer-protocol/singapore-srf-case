/**
 * Decode a publicKeyMultibase string to raw 32-byte Ed25519 key material.
 * Accepts proper Multikey form (z + base58(0xed01 || key)) and, tolerantly,
 * a bare base58-encoded 32-byte key behind 'z' (some early DID documents
 * omitted the multicodec prefix). The tolerance is surfaced to the caller.
 */
export declare function decodeEd25519Multibase(s: string): {
    key: Buffer;
    note?: string;
};
export declare function ed25519Verify(rawPublicKey: Buffer, data: Buffer, signature: Buffer): boolean;
export declare function sha256(data: Buffer | string): Buffer;
