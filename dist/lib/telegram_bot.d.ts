/// <reference types="@cloudflare/workers-types" />
import ExecutionContext from './ctx';
import Webhook from './webhook';
export default class TelegramBot {
    token: string;
    webhook: Webhook;
    api: URL;
    update_type: string;
    commands: Record<string, (ctx: ExecutionContext) => Promise<Response>>;
    constructor(token: string);
    on(event: string, callback: (ctx: ExecutionContext) => Promise<Response>): this;
    handle(request: Request): Promise<Response>;
}
