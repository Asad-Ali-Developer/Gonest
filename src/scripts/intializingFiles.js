const LogMessageJsForApplication = require("../utils/LogMessageJsForApplication.js");
const { execSync } = require("child_process");

const InitializingFilesByCommands = (isTypeScript) => {
  if (isTypeScript) {
    try {
      execSync("npx tsc --init", {
        stdio: "inherit",
      });
      LogMessageJsForApplication("Files Initialized successfully!", "START");
    } catch (error) {
      LogMessageJsForApplication(
        `Not initializing files ... ${error.message}`,
        "ERROR"
      );
    }
  }
};

module.exports = { InitializingFilesByCommands };
