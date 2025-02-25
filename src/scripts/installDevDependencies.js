const LogMessageJsForApplication = require("../utils/LogMessageJsForApplication.js");
const { execSync } = require("./utility-exports.js");
const { green } = require("colorette");

const InstallDevDependencies = (isTypeScript) => {
  try {
    if (isTypeScript) {
      
      const depedencyInstallationMessage = green("Installing depedencies...");
      console.log(depedencyInstallationMessage);

      execSync(
        "npm install express dotenv typescript && npm install -D ts-node-dev @types/typescript @types/node @types/express",
        {
          stdio: "inherit",
        }
      );
    } else {
      execSync("npm install express dotenv && npm install -D nodemon", {
        stdio: "inherit",
      });
    }
    LogMessageJsForApplication(
      "Dependencies installed successfully!",
      "SUCCESS"
    );
  } catch (error) {
    LogMessageJsForApplication(
      `Failed to install dependencies: ${error.message}`,
      "ERROR"
    );
  }
};

module.exports = { InstallDevDependencies };
