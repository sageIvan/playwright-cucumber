const { AllureRuntime } = require("allure-js-commons");
const { CucumberJSAllureFormatter } = require("allure-cucumberjs");

class AllureReporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(options, new AllureRuntime({ resultsDir: "./allure-results" }), {
      labels: [
        {
          pattern: [/@lesson:(.*)/],
          name: "epic",
        },
        {
          pattern: [/@api/],
          name: "feature",
        },
        {
          pattern: [/@web/],
          name: "feature",
        },
      ],
      links: [
        {
          pattern: [/@issue=(.*)/],
          type: "issue",
          urlTemplate: "https://github.com/your-repo/issues/%s",
        },
      ],
    });
  }
}

module.exports = AllureReporter;