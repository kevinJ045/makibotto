import TelegramFrom from './TelegramFrom';

type TelegramInlineQuery = {
	chat_type: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
	from: TelegramFrom;
	id: number;
	offset: string;
	query: string;
};
export default TelegramInlineQuery;
