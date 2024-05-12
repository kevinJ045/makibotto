/// <reference types="@cloudflare/workers-types" />
export default class Webhook {
    api: URL;
    webhook: URL;
    constructor(token: string, request: Request);
    set(): Promise<Response>;
}
