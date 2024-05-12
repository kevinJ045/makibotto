/// <reference types="@cloudflare/workers-types" />
type Kv = Record<string, KVNamespace> | undefined;
export default Kv;
