import {
  Handler,
  TelegramBot,
  TelegramCommands,
  TelegramWebhook,
} from "@codebam/cf-workers-telegram-bot";

class TelegramCommands2 extends TelegramCommands {
  static sup = async (bot, update, args) => bot.sup(bot, update);
}

class TelegramBot2 extends TelegramBot {
  question = async (self, update, args) => {
    if (self.ai === undefined) {
      return new Response("ok");
    }
    let _prompt;
    if (args[0][0] === "/") {
      _prompt = args.slice(1).join(" ");
    } else {
      _prompt = args.join(" ");
    }
    if (_prompt === "") {
      _prompt = "";
    }
    const results = await (async () => {
      if (self.db) {
        const { results } = await self.db
          .prepare("SELECT * FROM Messages WHERE userId=?")
          .bind(
            update.inline_query
              ? update.inline_query.from.id
              : update.message?.from.id
          )
          .all();
        return results;
      }
    })();
    const old_messages = (() => {
      if (results) {
        return results.map((col) => ({
          role: "system",
          content: col.content,
        }));
      }
      return [];
    })();
    const system_prompt =
      "<s>" +
      [
        `Your name is ${self.bot_name}.`,
        `You are talking to ${update.message?.from.first_name}.`,
        `Pretend to be a cute anime chan uwu.`,
      ].reduce((acc, cur) => {
        return acc + cur + "\n";
      }) +
      old_messages.reduce((acc, cur) => {
        return acc + cur.content + "\n";
      }, "") +
      "</s>";
    const p = system_prompt + "[INST]" + _prompt + "[/INST]";
    const prompt = p.slice(p.length - 4096, p.length);
    const response = await self.ai
      // @ts-expect-error chat model might not match
      .run(self.chat_model, {
        prompt,
        max_tokens: 596,
      })
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      .then(({ response }) =>
        response
          .replace(/(\[|)(\/|)INST(S|)(s|)(\]|)/, "")
          .replace(/<<(\/|)SYS>>/, "")
      );
    if (self.db) {
      const { success } = await self.db
        .prepare("INSERT INTO Messages (id, userId, content) VALUES (?, ?, ?)")
        .bind(
          crypto.randomUUID(),
          update.inline_query
            ? update.inline_query.from.id
            : update.message?.from.id,
          "[INST] " + _prompt + " [/INST]" + "\n" + response
        )
        .run();
      if (!success) {
        console.log("failed to insert data into d1");
      }
    }
    if (response === "") {
      self.clear(self, update);
      return self.question(self, update, args);
    } // sometimes llama2 doesn't respond when given lots of system prompts
    if (update.inline_query) {
      return self.answerInlineQuery(update.inline_query.id, [
        new TelegramInlineQueryResultArticle(response),
      ]);
    }
    return self.sendMessage(
      update.message?.chat.id ?? 0,
      response,
      "",
      false,
      false,
      update.message?.message_id
    );
  };
  sup = (self, update, args) => {
    self.sendMessage(
      update.message?.chat.id ?? 0,
      "/sup bitch",
      "",
      false,
      false,
      update.message?.message_id
    );
  };
}

export default {
  fetch: async (request, env) =>
    new Handler([
      {
        bot_name: "@makibotto_bot",
        api: TelegramBot2,
        webhook: new TelegramWebhook(
          new URL(
            `https://api.telegram.org/bot${env.SECRET_TELEGRAM_API_TOKEN}`
          ),
          env.SECRET_TELEGRAM_API_TOKEN,
          new URL(new URL(request.url).origin)
        ),
        commands: {
          default: TelegramCommands.question,
          "/sup": TelegramCommands2.sup,
          "/clear": TelegramCommands.clear,
        },
        ai: env.AI,
        chat_model: env.CHAT_MODEL,
      },
    ]).handle(request),
};
