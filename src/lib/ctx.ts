import API from "./api";
import TelegramBot from "./telegram_bot";
import { TelegramInlineQueryResultArticle, TelegramUpdate } from "./types";



export default class ExecutionContext {

  bot: TelegramBot;
  update: TelegramUpdate;
  update_type = '';

  private data: Record<string, any> = {};

  constructor(bot: TelegramBot, update: TelegramUpdate){
    this.bot = bot;
    this.update = update;

    if (this.update.message?.text) {
      this.update_type = 'message';
    } else if (this.update.inline_query?.query) {
      this.update_type = 'inline';
    } 
  }

  getText(){
    return this.update.message?.text || this.update.inline_query?.query || "";
  }

  next(){
    return new Response('ok');
  }

  setData(key: string, value: any){
    this.data[key] = value;
    return this;
  }

  deleteData(key: string){
    delete this.data[key];
    return this;
  }

  getData(key: string){
    return this.data[key];
  }
  
	async reply(message: string) {
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