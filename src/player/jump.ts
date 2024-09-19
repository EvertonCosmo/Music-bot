import { Guild, GuildResolvable, Message } from "discord.js";
import { player } from "..";
import { ICommand } from "interfaces/Icommand";

export class JumpCommand implements ICommand {
	execute(message: Message<boolean>, query?: string): void {
		async function exe() {
			const queue = player.getQueue(message.guild as GuildResolvable);
			const trackIndexToJump = Number(query) - 1;
			const track = queue.tracks[trackIndexToJump].title;
			await queue.jump(trackIndexToJump);
			return message.channel.send({
				content: `⏭ **${track}** has jumped the queue`,
			});
		}

		(() => {
			exe();
		})();
	}
}
