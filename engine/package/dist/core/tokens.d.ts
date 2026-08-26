export interface TokenDef {
    symbol: string;
    decimals: number;
}
export declare const DEFAULT_EVM_TOKENS: Record<string, TokenDef>;
export declare const DEFAULT_SOLANA_MINTS: Record<string, TokenDef>;
export declare const SOLANA_PROGRAMS: {
    readonly SYSTEM: "11111111111111111111111111111111";
    readonly TOKEN: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
    readonly TOKEN_2022: "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
};
export declare const SOLANA_BENIGN_PROGRAMS: Set<string>;
