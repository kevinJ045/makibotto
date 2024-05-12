import TelegramInlineQuery from './TelegramInlineQuery';
import TelegramMessage from './TelegramMessage';
import Update from './Update';
import PartialTelegramUpdate from './PartialTelegramUpdate';
export default class TelegramUpdate extends Update {
    update_id: number;
    message?: TelegramMessage;
    edited_message?: TelegramMessage;
    channel_post?: TelegramMessage;
    edited_channel_post?: TelegramMessage;
    inline_query?: TelegramInlineQuery;
    constructor(update: PartialTelegramUpdate);
}
