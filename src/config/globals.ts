import { config } from 'dotenv'

const envFound = config()

if (!envFound) {
	throw new Error("!  Couldn't find .env file  !")
}

export const env = {
	TOKEN: process.env.TOKEN,
	GUILD_ID: process.env.GUILD_ID,
	CLIENT_ID: process.env.CLIENT_ID,
	YOUTUBE_TOKEN: process.env.YOUTUBE_TOKEN,
}
