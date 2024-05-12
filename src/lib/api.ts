import { SerializableData, TelegramInlineQueryResultArticle } from "./types";



export default class API {

  static getApiUrl(botApi: string, slug: string, data: Record<string, SerializableData>){
    const request = new URL(botApi+ (slug.startsWith('/') || botApi.endsWith('/') ? '' : '/') + slug);
    const params = new URLSearchParams();
    for(const i in data){
      params.append(i, data[i].toString());
    }
    return `${request}?${params}`;
  }

  static async sendMessage(botApi: string, data : {
    reply_to_message_id: number | string,
    chat_id: number | string,
    text: string
  }){
    const url = this.getApiUrl(botApi, 'sendMessage', data);
    return await fetch(url);
  }

  static async answerInline(botApi: string, data: {
    inline_query_id: number | string,
    results: TelegramInlineQueryResultArticle[]
  }){
    const url = this.getApiUrl(botApi, 'answerInlineQuery', {
      inline_query_id: data.inline_query_id,
      results: JSON.stringify(data.results)
    });
    return await fetch(url);
  }

}