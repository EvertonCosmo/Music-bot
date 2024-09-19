export const playerConfig = {
  opt: {
    maxVol: 100,
    defaultVolume: 75,
    leaveonEnd: 0,
    loopMessage: false,
    spotifyBridge: true,
    discordPlayer: {
      ydlOptions: {
        quality: "highestaudio",
        hightWaterMark: 1 << 25,
      },
    },
  },
} as const;
