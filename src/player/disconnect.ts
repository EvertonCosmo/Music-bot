import { type CommandInteraction, SlashCommandBuilder } from 'discord.js'

import { useMainPlayer } from 'discord-player'
import type { Command } from '../interfaces/command'

export class DisconnectCommand implements Command {
	public readonly name: string = 'disconnect'

	public readonly description: string = 'Disconnects from the voice channel'

	public readonly interaction: CommandInteraction

	public readonly data = new SlashCommandBuilder()
		.setName('disconnect')
		.setDescription('Disconnects from the voice channel')

	execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeDisconnectCommand(interaction)
	}

	private async executeDisconnectCommand(interaction: CommandInteraction): Promise<unknown> {
		return Error('Not implemented yet')
	}
}
