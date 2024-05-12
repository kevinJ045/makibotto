import TelegramInlineQueryResult from './TelegramInlineQueryResult';
export default class TelegramInlineQueryResultArticle extends TelegramInlineQueryResult {
    title;
    input_message_content;
    thumb_url;
    constructor(content, title = content, parse_mode = '', thumb_url = '') {
        super('article');
        this.title = title;
        this.input_message_content = {
            message_text: content.toString(),
            parse_mode,
        };
        this.thumb_url = thumb_url;
    }
}
