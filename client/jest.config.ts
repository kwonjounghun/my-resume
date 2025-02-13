import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/src/test/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  snapshotSerializers: ['@emotion/jest/serializer'],
};

export default createJestConfig(config);
