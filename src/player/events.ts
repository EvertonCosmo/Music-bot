import { type Queue, useMainPlayer } from "discord-player";
import type { TextBasedChannels } from "discord.js";



const player = useMainPlayer()

player.on("trackStart", (queue: Queue<TextBasedChannels | any>, track) => {
	queue.metadata.send({
		embeds: [
			{
				description: `**[${track.title}-${track.author}](${track.url})**\n Duration: ${track.duration}`,
				color: 0x44b868,
				tumbnail: {
					url: `${track.thumbnail}`,
				},
			},
		],
	});
});

player.on("trackAdd", (queue: Queue<TextBasedChannels | any>, track) => {
	queue.metadata.send({
		embeds: [
			{
				description: `Queued **[${track.title}](${track.url})**`,
				color: 0x44b868,
			},
		],
	});
});
player.on("tracksAdd", (queue: Queue<TextBasedChannels | any>, tracks) => {
	queue.metadata.send({
		embeds: [
			{
				description: `Queued **${tracks.length}** tracks from [${tracks[0].playlist?.tracks}](${tracks[0].playlist?.url})`,
				color: 0x44b868,
			},
		],
	});
});

player.on("botDisconnect", (queue: Queue<TextBasedChannels | any>) => {
	queue.metadata?.channel?.send(
		"❌ | I was manually disconnected from the voice channel, clearing queue!",
	);
});

player.on("channelEmpty", (queue: Queue<TextBasedChannels | any>) => {
	queue.metadata?.channel.send(
		"❌ | Nobody is in the voice channel, leaving...",
	);
});

player.on("queueEnd", (queue: Queue<TextBasedChannels | any>) => {
	queue.metadata?.channel.send("✅ | Queue finished!");
});

player.on("error", (queue, error) => {
	console.log(
		`[${queue.guild.name}] Error emitted from the queue: ${error.message}`,
	);
});
