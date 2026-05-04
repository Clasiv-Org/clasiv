module.exports = {
	preset: '@react-native/jest-preset',
	moduleNameMapper: {
		'^@/(.*)$':           '<rootDir>/src/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@screens/(.*)$':    '<rootDir>/src/screens/$1',
		'^@hooks/(.*)$':      '<rootDir>/src/hooks/$1',
		'^@utils/(.*)$':      '<rootDir>/src/utils/$1',
        '^@assets/(.*)$':     '<rootDir>/src/assets/$1',
        '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
	},
};
