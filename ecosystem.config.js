module.exports = {
	apps: [
		{
			name: 'production',
			script: './dist/index.js',
			watch: ['dist'],
			autorestart: true,
			time: true,
		},
	],
}
