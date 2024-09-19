import { useMainPlayer } from "discord-player";
import type { GuildResolvable, Message } from "discord.js";

import type { ICommand } from "interfaces/Icommand";

export class BackCommand implements ICommand {
	execute(message: Message, query?: string): void {
		async function exe() {
      const player = useMainPlayer()
			const queue = player.getQueue(message.guild as GuildResolvable);
			const hasPlaying = queue?.playing;
			if (!queue || !hasPlaying)
				return message.channel.send(`No music playing ${message.author} ...`);
			if (!queue.previousTracks[1])
				return message.channel.send(
					`there was no music played before ${message.author} ...`,
				);
			await queue.back();
			message.react("⏮️");
		}

		(() => {
			exe();
		})();
	}
}
