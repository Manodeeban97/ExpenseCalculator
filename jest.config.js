module.exports = {
  preset: 'react-native',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@react-navigation-stack|@react-navigation/native|@react-navigation/drawer|@react-navigation/bottom-tabs|@react-navigation/material-top-tabs|@react-navigation/elements|@react-navigation/routers|@react-navigation/core|@react-navigation/common|react-native-safe-area-view|react-native-screens|react-native-reanimated|@react-native-community/masked-view)',
  ],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['html', 'text'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './jest-report.html',
        includeFailureMsg: true,
        includeSuiteFailure: true,
        includeConsoleLog: true,
        includeCode: true, // This enables including the test code in the report
      },
    ],
  ],
};

