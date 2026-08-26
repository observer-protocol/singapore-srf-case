// The engine bundle imports node:fs, node:os, node:path, node:zlib and node:dns/promises for
// features this page never calls (audit files, revocation lists, did:web resolution). In the
// browser every one of them throws on use; none is reached by verifyEddsaJcs2022.
const refuse = (name) => (...a) => { throw new Error(`node:${name} is not available in the browser bundle`); };
export const readFileSync = refuse('fs.readFileSync'), writeFileSync = refuse('fs.writeFileSync'), mkdirSync = refuse('fs.mkdirSync'), existsSync = refuse('fs.existsSync'), appendFileSync = refuse('fs.appendFileSync'), renameSync = refuse('fs.renameSync'), statSync = refuse('fs.statSync');
export const lookup = refuse('dns.lookup');
export const join = refuse('path.join'), dirname = refuse('path.dirname');
export const gunzipSync = refuse('zlib.gunzipSync');
// os.hostname() is read at module load (the engine's audit module stamps a process instance id); it returns an inert value.
export const hostname = () => 'browser', homedir = refuse('os.homedir');
export default {};
