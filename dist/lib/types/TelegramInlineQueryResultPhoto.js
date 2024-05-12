import TelegramInlineQueryResult from './TelegramInlineQueryResult';
export default class TelegramInlineQueryResultPhoto extends TelegramInlineQueryResult {
    photo_url; // must be a jpg
    thumb_url;
    photo_width;
    photo_height;
    title;
    description;
    caption;
    parse_mode;
    caption_entities;
    // reply_markup?: TelegramInlineKeyboardMarkup;
    // input_message_content?: TelegramInputMessageContent;
    constructor(photo) {
        super('photo');
        this.photo_url = photo;
        this.thumb_url = photo;
    }
}
