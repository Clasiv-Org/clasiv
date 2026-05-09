module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		'@babel/plugin-transform-export-namespace-from',
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					'@':           './src',
					'@components': './src/components',
					'@screens':    './src/screens',
					'@hooks':      './src/hooks',
					'@utils':      './src/utils',
					'@assets':     './src/assets',
					'@navigation': './src/navigation',
				},
			},
		],
		'react-native-reanimated/plugin',
	],
};
