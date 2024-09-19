import { useMainPlayer } from "discord-player";
import type { GuildResolvable, Message } from "discord.js";
import type { ICommand } from "interfaces/Icommand";


export class StopCommand implements ICommand {
	execute(message: Message): void {
		async function exe() {
      const player = useMainPlayer()
			const queue = player.getQueue(message.guild as GuildResolvable);
			const hasPlaying = queue?.playing;
			if (!queue || !hasPlaying)
				return message.channel.send(`No music playing ${message.author} ...`);
			queue.clear();
			queue.destroy();
		}
		(() => {
			exe();
		})();
	}
}
