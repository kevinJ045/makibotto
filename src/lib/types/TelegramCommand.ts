import TelegramBot from '../telegram_bot';
import TelegramUpdate from './TelegramUpdate';

type TelegramCommand = (bot: TelegramBot, update: TelegramUpdate, args: string[]) => Promise<Response>;
export default TelegramCommand;
