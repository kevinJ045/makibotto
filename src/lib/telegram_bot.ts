import ExecutionContext from './ctx';
import { TelegramUpdate } from './types';
import Webhook from './webhook';

export default class TelegramBot {
	token: string;
	webhook: Webhook;
	api: URL;
	update_type: string;

	commands: Record<string, (ctx: ExecutionContext) => Promise<Response>> = {};

	constructor(token: string) {
		this.token = token;
		this.webhook = new Webhook('', new Request('http://127.0.0.1'));
		this.api = new URL('https://api.telegram.org/bot' + token);
		this.update_type = '';
	}

	on(event: string, callback: (ctx: ExecutionContext) => Promise<Response>) {
		if (event !== 'on') {
			// eslint-disable-next-line
			// @ts-ignore TS7053
			this.commands[event] = callback;
		}
		return this;
	}

	async handle(request: Request) {
		this.webhook = new Webhook(this.token, request);
		let update: TelegramUpdate;
		if (request.method === 'POST') {
			update = await request.json();
		} else {
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
			let args: string[] = [];
			const ctx = new ExecutionContext(
				this,
				update
			);
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