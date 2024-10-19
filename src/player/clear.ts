import { type ChatInputCommandInteraction, type CommandInteraction, SlashCommandBuilder } from 'discord.js'

import type { Command } from '../interfaces/command'
import { useHistory, useQueue } from 'discord-player'

export class ClearCommand implements Command {
	public readonly name = 'clear'
	public readonly description = 'Clear the queue'

	public readonly interaction: CommandInteraction
	public readonly data = new SlashCommandBuilder().setName('clear').setDescription('Clear the queue')

	public async execute(interaction: ChatInputCommandInteraction): Promise<unknown> {
		return this.executeClearCommand(interaction)
	}

	private async executeClearCommand(interaction: CommandInteraction): Promise<unknown> {
		const queue = useQueue(interaction.guild.id)
		const history = useHistory(interaction.guild.id)

		if (!history.isEmpty()) {
			history.clear()
		}

		if (!queue || !queue.node.isPlaying()) {
			return interaction.reply({
				content: `no music is playing ${interaction.user.username}`,
				ephemeral: true,
			})
		}
		if (queue.isEmpty()) {
			return interaction.reply({
				content: `the queue is already empty ${interaction.user.username}`,
				ephemeral: true,
			})
		}

		queue.clear()

		interaction.reply('The queue has just been cleared 🗑')
	}
}
