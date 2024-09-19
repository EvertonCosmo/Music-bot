import { GuildResolvable, Message } from "discord.js";
import { player } from "../";
import { ICommand } from "interfaces/Icommand";

export class SkipCommand implements ICommand {
	execute(message: Message, query?: string): void {
		async function exe() {
			const queue = player.getQueue(message.guild as GuildResolvable);
			const hasPlaying = queue?.playing;

			if (!queue || !hasPlaying)
				return message.channel.send(`No music playing ${message.author}`);

			const success = await queue.skip();

			return success ? message.react("⏭️") : message.react("❌");
		}
		(() => {
			exe();
		})();
	}
}
