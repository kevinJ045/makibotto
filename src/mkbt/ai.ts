import ExecutionContext from "../lib/ctx";




export async function makiBottoAi(env: Environment, ctx: ExecutionContext){
  let _prompt = ctx.getText();
  const results = await (async () => {
    
    if (env.DB) {
      const { results } = await env.DB
        .prepare("SELECT * FROM Messages WHERE userId=?")
        .bind(
          ctx.update.inline_query
            ? ctx.update.inline_query.from.id
            : ctx.update.message?.from.id
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
      `Your name is ${ctx.getData('BotName')}.`,
      `You are talking to ${ctx.update.message?.from.first_name}.`,
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
  const response = await env.AI
    // @ts-expect-error chat model might not match
    .run(env.CHAT_MODEL, {
      prompt,
      max_tokens: 596,
    })
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    // @ts-ignore
    .then(({ response }) =>
      response
        .replace(/(\[|)(\/|)INST(S|)(s|)(\]|)/, "")
        .replace(/<<(\/|)SYS>>/, "")
    );
  if (env.DB) {
    const { success } = await env.DB
      .prepare("INSERT INTO Messages (id, userId, content) VALUES (?, ?, ?)")
      .bind(
        crypto.randomUUID(),
        ctx.update.inline_query
          ? ctx.update.inline_query.from.id
          : ctx.update.message?.from.id,
        "[INST] " + _prompt + " [/INST]" + "\n" + response
      )
      .run();
    if (!success) {
      console.log("failed to insert data into d1");
    }
  }
  return await ctx.reply(response);
}