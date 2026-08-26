import type { RailDef, VerifierConfig } from './types.js';
export declare const DEFAULT_RAILS: Record<string, RailDef>;
export declare function parseConfig(raw: unknown): VerifierConfig;
