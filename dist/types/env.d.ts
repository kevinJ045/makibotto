/// <reference types="@cloudflare/workers-types" />
interface Environment {
    SECRET_TELEGRAM_API_TOKEN: string;
    AI: Ai;
    CHAT_MODEL: string;
    DB: D1Database;
}
