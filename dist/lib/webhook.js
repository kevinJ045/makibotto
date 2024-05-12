export default class Webhook {
    api;
    webhook;
    constructor(token, request) {
        this.api = new URL('https://api.telegram.org/bot' + token);
        this.webhook = new URL(new URL(request.url).origin + `/${token}`);
    }
    async set() {
        const url = new URL(`${this.api.origin}${this.api.pathname}/setWebhook`);
        const params = url.searchParams;
        params.append('url', this.webhook.toString());
        params.append('max_connections', '100');
        params.append('allowed_updates', JSON.stringify(['message', 'inline_query']));
        params.append('drop_pending_updates', 'true');
        return await fetch(`${url}?${params}`);
    }
}
