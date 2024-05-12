import TelegramInlineQueryResult from './TelegramInlineQueryResult';
export default class TelegramInlineQueryResultPhoto extends TelegramInlineQueryResult {
    photo_url: string;
    thumb_url: string;
    photo_width?: number;
    photo_height?: number;
    title?: string;
    description?: string;
    caption?: string;
    parse_mode?: string;
    caption_entities?: string;
    constructor(photo: string);
}
