/// <reference types="@cloudflare/workers-types" />
export default class WebhookCommands {
    [key: string]: () => Promise<Response>;
}
