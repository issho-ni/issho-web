module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.tsx"],
  globals: {
    GRAPHQL_ENDPOINT: "https://localhost:8080/query",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "jest-localstorage-mock"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testEnvironment: "jsdom",
}
