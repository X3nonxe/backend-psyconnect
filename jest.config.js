module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};