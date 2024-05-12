/// <reference types="@cloudflare/workers-types" />
import TelegramBot from "./telegram_bot";
import { TelegramUpdate } from "./types";
export default class ExecutionContext {
    bot: TelegramBot;
    update: TelegramUpdate;
    update_type: string;
    private data;
    constructor(bot: TelegramBot, update: TelegramUpdate);
    getText(): string;
    next(): Response;
    setData(key: string, value: any): this;
    deleteData(key: string): this;
    getData(key: string): any;
    reply(message: string): Promise<void>;
}
