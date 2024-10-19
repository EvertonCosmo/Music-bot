import { type CommandInteraction, SlashCommandBuilder } from 'discord.js'

import type { Command } from '../interfaces/command'

export class JumpCommand implements Command {
	public readonly name: string = 'jump'

	public readonly description: string = 'Jumps to a song'

	public readonly interaction: CommandInteraction

	public readonly data = new SlashCommandBuilder().setName('jump').setDescription('Jumps to a song')

	execute(interaction: CommandInteraction): Promise<unknown> {
		return this.executeJumpCommand(interaction)
	}

	private async executeJumpCommand(interaction: CommandInteraction): Promise<unknown> {
		return Error('Not implemented yet')
	}
}
