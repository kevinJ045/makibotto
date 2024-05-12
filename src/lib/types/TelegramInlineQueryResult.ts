import TelegramInlineQueryType from './TelegramInlineQueryType';

export default class TelegramInlineQueryResult {
	type: TelegramInlineQueryType;
	id: string;
	constructor(type: TelegramInlineQueryType) {
		this.type = type;
		this.id = crypto.randomUUID();
	}
}
