import { ExecutionContext, TelegramBot } from "./lib/main";
import { makiBottoAi } from "./mkbt/ai";

export default {
  fetch: async (request: Request, env: Environment) =>
    new TelegramBot(env.SECRET_TELEGRAM_API_TOKEN)
    .on('any', async (ctx: ExecutionContext) => {
      ctx.setData('BotName', 'Makibotto');
      return ctx.next();
    })
    .on('default', async (ctx: ExecutionContext) => {
      await makiBottoAi(env, ctx);
      return new Response('ok');
    })
    .handle(request.clone())
};
