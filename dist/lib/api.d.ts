/// <reference types="@cloudflare/workers-types" />
import { SerializableData, TelegramInlineQueryResultArticle } from "./types";
export default class API {
    static getApiUrl(botApi: string, slug: string, data: Record<string, SerializableData>): string;
    static sendMessage(botApi: string, data: {
        reply_to_message_id: number | string;
        chat_id: number | string;
        text: string;
    }): Promise<Response>;
    static answerInline(botApi: string, data: {
        inline_query_id: number | string;
        results: TelegramInlineQueryResultArticle[];
    }): Promise<Response>;
}
