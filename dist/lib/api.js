export default class API {
    static getApiUrl(botApi, slug, data) {
        const request = new URL(botApi + (slug.startsWith('/') || botApi.endsWith('/') ? '' : '/') + slug);
        const params = new URLSearchParams();
        for (const i in data) {
            params.append(i, data[i].toString());
        }
        return `${request}?${params}`;
    }
    static async sendMessage(botApi, data) {
        const url = this.getApiUrl(botApi, 'sendMessage', data);
        return await fetch(url);
    }
    static async answerInline(botApi, data) {
        const url = this.getApiUrl(botApi, 'answerInlineQuery', {
            inline_query_id: data.inline_query_id,
            results: JSON.stringify(data.results)
        });
        return await fetch(url);
    }
}
