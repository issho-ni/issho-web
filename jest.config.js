module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.tsx"],
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
    GRAPHQL_ENDPOINT: "https://localhost:8080/query",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "jest-localstorage-mock"],
  testEnvironment: "jsdom",
}
