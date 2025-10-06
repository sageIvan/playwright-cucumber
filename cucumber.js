module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'support/world.ts', 
      'support/hooks.ts',
      'support/step-definitions/**/*.ts'
    ],
    format: [
      'json:reports/cucumber-report.json', 
      'html:reports/cucumber-report.html', 
      '@cucumber/pretty-formatter',
      './allure-reporter.js'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    paths: ['features/**/*.feature'],
    parallel: 1,
    retry: 0,
    timeout: 30 * 1000, // 30 seconds
    publishQuiet: true
  }
};