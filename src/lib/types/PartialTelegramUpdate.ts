import TelegramInlineQuery from './TelegramInlineQuery';
import TelegramMessage from './TelegramMessage';

type PartialTelegramUpdate = {
	update_id?: number;
	message?: TelegramMessage;
	edited_message?: TelegramMessage;
	channel_post?: TelegramMessage;
	edited_channel_post?: TelegramMessage;
	inline_query?: TelegramInlineQuery;
};
export default PartialTelegramUpdate;
