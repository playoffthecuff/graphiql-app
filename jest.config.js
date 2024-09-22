/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^~/(.*)$': '<rootDir>/app/$1',
    '\\.(svg)$': '<rootDir>/app/__test__/__mocks__/svgMock.ts',
  },
};
