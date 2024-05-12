export default class TelegramInlineQueryResult {
    type;
    id;
    constructor(type) {
        this.type = type;
        this.id = crypto.randomUUID();
    }
}
