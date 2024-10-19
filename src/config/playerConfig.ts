export const playerConfig = {
	opt: {
		maxVol: 100,
		defaultVolume: 80,
		leaveonEnd: 0,
		loopMessage: false,
		spotifyBridge: true,
		discordPlayer: {
			ydlOptions: {
				quality: 'highestaudio',
				hightWaterMark: 1 << 25,
			},
			ipRotation: {
				blocks: [],
				exclude: [],
				maxEntries: 3,
			},
		},
	},
}
