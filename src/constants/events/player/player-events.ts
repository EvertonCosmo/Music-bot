import { useMainPlayer } from 'discord-player'
import { EmbedBuilder } from 'discord.js'

export function events() {
	const player = useMainPlayer()

	player.events.on('playerStart', (queue, track) => {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: track.requestedBy?.username,
				iconURL: track.requestedBy.displayAvatarURL(),
			})

			.setDescription(
				`▶ **Now Playing**\n\` ${track.duration} \` [**${track.title}**](${track.url})`,
			)
			.setThumbnail(track.thumbnail)
			.setColor(0x44b868)

		const { channel } = queue.metadata

		channel.send({ embeds: [embed] })
	})

	player.events.on('audioTracksAdd', (queue, tracks) => {
		const { channel } = queue.metadata
		return channel.send({
			content: `🎶 Added ${tracks.length} tracks to the queue`,
			ephemeral: true,
		})
	})

	player.events.on('disconnect', (queue) => {
		const { channel } = queue.metadata

		channel.send({
			content: '🚨 Disconnected from the voice channel',
			ephemeral: true,
		})
	})
	player.events.on('emptyChannel', (queue) => {
		const { channel } = queue.metadata

		channel.send({
			content: '🚨 nobody in the voice channel, leaving...',
			ephemeral: true,
		})
	})

	player.events.on('emptyQueue', (queue) => {
		const { channel } = queue.metadata
		channel.send({
			content: 'the queue is empty...',
			ephemeral: true,
		})
	})
	player.events.on('error', (_, error) => {
		console.log(`Error emitted from the queue: ${error.message}`)
	})
	player.events.on('playerError', (_, error) => {
		console.log(`Error emitted from the player: ${error.message}`)
	})
}
