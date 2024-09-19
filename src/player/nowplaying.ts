import { useMainPlayer } from "discord-player";
import type { GuildResolvable, Message } from "discord.js";

import type { ICommand } from "interfaces/Icommand";

export class NowPlayingCommand implements ICommand {
	execute(message: Message<boolean>, query?: string): void {
		async function exe() {
      const player = useMainPlayer()
			const queue = player.getQueue(message.guild as GuildResolvable);
			const hasPlaying = queue?.playing;

			if (!queue || !hasPlaying)
				return message.channel.send(`No music playing ${message.author}`);

			const progress = queue.createProgressBar({ timecodes: true, length: 8 });

			return message.channel.send({
				embeds: [
					{
						description: `**[${queue.current.title}](${queue.current.url})**`,
						thumbnail: {
							url: `${queue.current.thumbnail}`,
						},
						fields: [
							{
								name: "\u200b",
								value: progress.replace(/0:00/g, "◉"),
							},
						],
						color: 0x44b868,
					},
				],
			});
		}

		(() => {
			exe();
		})();
	}
}
