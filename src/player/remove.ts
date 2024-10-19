import { SlashCommandBuilder, type CommandInteraction } from 'discord.js'

import type { Command } from '../interfaces/command'

export class RemoveCommand implements Command {
	public readonly name = 'remove'
	public readonly description = 'Removes a song from the queue'
	public readonly interaction: CommandInteraction
	public readonly data = new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Removes a song from the queue')
		.addStringOption((option) =>
			option
				.setName('song')
				.setDescription(
					'The song you want to remove',
				)
				.setRequired(true),
		)

	public execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeRemoveCommand(interaction)
	}

	private async executeRemoveCommand(interaction: CommandInteraction): Promise<unknown> {
		return Error('Not implemented')
	}
}
