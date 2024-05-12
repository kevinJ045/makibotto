import ExecutionContext from './ctx';
import { TelegramUpdate } from './types';
import Webhook from './webhook';
export default class TelegramBot {
    token;
    webhook;
    api;
    update_type;
    commands = {};
    constructor(token) {
        this.token = token;
        this.webhook = new Webhook('', new Request('http://127.0.0.1'));
        this.api = new URL('https://api.telegram.org/bot' + token);
        this.update_type = '';
    }
    on(event, callback) {
        if (event !== 'on') {
            // eslint-disable-next-line
            // @ts-ignore TS7053
            this.commands[event] = callback;
        }
        return this;
    }
    async handle(request) {
        this.webhook = new Webhook(this.token, request);
        let update;
        if (request.method === 'POST') {
            update = await request.json();
        }
        else {
            update = new TelegramUpdate({});
        }
        const url = new URL(request.url);
        if (`/${this.token}` === url.pathname) {
            switch (url.searchParams.get('command')) {
                case 'set':
                    return this.webhook.set();
                default:
                    break;
            }
            console.log(update);
            let command = 'default';
            let args = [];
            const ctx = new ExecutionContext(this, update);
            switch (ctx.update_type) {
                case 'message': {
                    // @ts-expect-error already checked above
                    args = update.message.text.split(' ');
                    break;
                }
                case 'inline': {
                    // @ts-expect-error already checked above
                    args = update.inline_query.query.split(' ');
                    break;
                }
                default:
                    break;
            }
            if (args.at(0)?.startsWith('/')) {
                // @ts-expect-error already checked above
                command = args.at(0).slice(1);
            }
            // eslint-disable-next-line
            // @ts-ignore
            this.commands['any']?.(ctx);
            // eslint-disable-next-line
            // @ts-ignore
            if (!this.commands[command]) {
                command = 'default';
            }
            // eslint-disable-next-line
            // @ts-ignore
            return await this.commands[command]?.(ctx);
        }
        return new Response('ok');
    }
}
