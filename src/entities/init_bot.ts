import { ActivityType, type ApplicationCommandDataResolvable, type Client, Events, REST, Routes } from 'discord.js'
import { env } from '../config/globals'

import { CommandFactory, commandKeys } from '../factories/CommandFactory'

const TOKEN = process.env.NODE_ENV === 'production' ? process.env.TOKEN : env.TOKEN
const CLIENT_ID = process.env.NODE_ENV === 'production' ? process.env.CLIENT_ID : env.CLIENT_ID
const GUILD_ID = process.env.NODE_ENV === 'production' ? process.env.GUILD_ID : env.GUILD_ID

export class InitBot {
	public slashCommands: ApplicationCommandDataResolvable[] = []
	private commandFactory: CommandFactory = new CommandFactory()

	constructor(private client: Client) {
		client.login(TOKEN).then((result) => {
			console.log('discord client connect', result)
			client.user.setPresence({
				activities: [
					{
						name: '/help',
						type: ActivityType.Listening,
					},
				],
				status: 'online',
			})
		})

		this.registerCommands()

		this.onInteractionCreate()

		client.on('error', console.error)
	}

	private async registerCommands() {
		console.log('Loading commands...')

		const rest = new REST({ version: '10' }).setToken(TOKEN)

		for (const prefix of commandKeys) {
			const command = this.commandFactory.generateCommand(prefix)

			this.slashCommands.push(command.data)
		}

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{
				body: this.slashCommands,
			},
		)

		if (Array.isArray(data)) {
			console.log(
				`Successfully reloaded ${data.length} application (/) commands.`,
			)
		}
	}

	private async onInteractionCreate() {
		this.client.on(Events.InteractionCreate, async (interaction) => {
			if (!interaction.isChatInputCommand()) return

			const command = this.commandFactory.generateCommand(
				interaction.commandName,
			)

			try {
				await command.execute(interaction)
			} catch (error) {
				console.log(
					'Error executing command',
					error,
				)
			}
		})
	}
}
