import TelegramInlineQueryResult from './TelegramInlineQueryResult';
import TelegramInputMessageContent from './TelegramInputMessageContent';
export default class TelegramInlineQueryResultArticle extends TelegramInlineQueryResult {
    title: string;
    input_message_content: TelegramInputMessageContent;
    thumb_url: string;
    constructor(content: string, title?: string, parse_mode?: string, thumb_url?: string);
}
