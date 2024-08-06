import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.integration\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup/setupTest.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
