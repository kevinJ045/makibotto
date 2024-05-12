import { TelegramBot } from "./lib/main";
import { makiBottoAi } from "./mkbt/ai";
export default {
    fetch: async (request, env) => new TelegramBot(env.SECRET_TELEGRAM_API_TOKEN)
        .on('any', async (ctx) => {
        ctx.setData('BotName', 'Makibotto');
        return ctx.next();
    })
        .on('default', async (ctx) => {
        await makiBottoAi(env, ctx);
        return new Response('ok');
    })
        .handle(request.clone())
};
