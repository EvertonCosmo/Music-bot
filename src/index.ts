import { config } from 'dotenv'

import { Player } from 'discord-player'

import { Client, GatewayIntentBits, Options } from 'discord.js'

import { YoutubeiExtractor } from 'discord-player-youtubei'

// import { playerConfig } from '@config/playerConfig'
import { playerConfig } from './config/playerConfig'
import { InitBot } from './entities/init_bot'
import { events } from './constants/events/player/player-events'
// import { env } from '@config/globals'
import { env } from './config/globals'

config()

const client = new Client({
	intents: Object.keys(GatewayIntentBits).map((a: string) => {
		return GatewayIntentBits[a as keyof typeof GatewayIntentBits]
	}),
	makeCache: Options.cacheWithLimits({
		UserManager: 100,
		GuildMessageManager: 100,
	}),
})

const player = new Player(client, {
	ytdlOptions: playerConfig.opt.discordPlayer.ydlOptions,
	// ipconfig: playerConfig.opt.discordPlayer.ipRotation,
})

player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor')
player.extractors.register(YoutubeiExtractor, {
	authentication: env.YOUTUBE_TOKEN,
	streamOptions: {
		useClient: 'ANDROID',
	},
})

events()

new InitBot(client)

// setInterval(() => {
// 	const memoryUsage = process.memoryUsage()
// 	console.log(`Uso de memória:
//     RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB
//     Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB
//     Heap Usado: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB
//     Externo: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB
//   `)
// }, 5000)
