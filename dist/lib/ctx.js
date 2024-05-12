import API from "./api";
import { TelegramInlineQueryResultArticle } from "./types";
export default class ExecutionContext {
    bot;
    update;
    update_type = '';
    data = {};
    constructor(bot, update) {
        this.bot = bot;
        this.update = update;
        if (this.update.message?.text) {
            this.update_type = 'message';
        }
        else if (this.update.inline_query?.query) {
            this.update_type = 'inline';
        }
    }
    getText() {
        return this.update.message?.text || this.update.inline_query?.query || "";
    }
    next() {
        return new Response('ok');
    }
    setData(key, value) {
        this.data[key] = value;
        return this;
    }
    deleteData(key) {
        delete this.data[key];
        return this;
    }
    getData(key) {
        return this.data[key];
    }
    async reply(message) {
        switch (this.update_type) {
            case 'message': {
                await API.sendMessage(this.bot.api.toString(), {
                    chat_id: this.update.message?.chat.id.toString() ?? '',
                    reply_to_message_id: this.update.message?.message_id.toString() ?? '',
                    text: message
                });
                break;
            }
            case 'inline': {
                await API.answerInline(this.bot.api.toString(), {
                    inline_query_id: this.update.inline_query?.id.toString() ?? '',
                    results: [new TelegramInlineQueryResultArticle(message)]
                });
                break;
            }
            default:
                break;
        }
    }
}
