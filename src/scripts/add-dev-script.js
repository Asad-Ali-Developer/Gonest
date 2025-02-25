#!/usr/bin/env node

const readline = require("readline");
const { packageJsonPath, fs } = require("./utility-exports.js");
const { updateTsConfig } = require("./updateTsConfig.js");
const { createAppModule, createDemoController } = require("./appModule.script.js");
const { InstallDevDependencies } = require("./installDevDependencies.js");
const { InitializingFilesByCommands } = require("./intializingFiles.js");
const LogMessageJsForApplication = require("../utils/LogMessageJsForApplication.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Ask the user if they want to use TypeScript or JavaScript.
 * Based on the choice, install dependencies and update the project accordingly.
 */
rl.question(
  "Will you make your project in (ts) TypeScript or (js) JavaScript?\n",
  (answer) => {
    const isTypeScript = answer.trim().toLowerCase() === "ts";
    initializeProject(isTypeScript);
    rl.close();
  }
);

function initializeProject(isTypeScript) {
  console.log(`You selected: ${isTypeScript ? "TypeScript" : "JavaScript"}\n`);
  LogMessageJsForApplication(
    `You selected: ${isTypeScript ? "TypeScript" : "JavaScript"}\n`,
    "START"
  );

  // Scripts for development
  const devScript = isTypeScript
    ? "ts-node-dev --clear --respawn --transpile-only --watch src src/appModule.ts"
    : 'nodemon --exec \"cls && node src/appModule.js\" --watch .';

  /**
   * Updates `package.json` by adding required scripts.
   */
  function updatePackageJson() {
    if (!fs.existsSync(packageJsonPath)) {
      LogMessageJsForApplication(
        "package.json not found. Run 'npm init -y' first.",
        "ERROR"
      );
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.dev = devScript;

    if (isTypeScript) {
      packageJson.scripts.build = "npx tsc";
      packageJson.scripts.start = "node dist/index.js";
    }

    LogMessageJsForApplication(
      "Gonest application has been successfully initialized!",
      "SUCCESS"
    );

    try {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    } catch (error) {
      LogMessageJsForApplication(
        `Failed to update package.json: ${error.message}`,
        "ERROR"
      );
    }
  }

  // Run initialization based on user selection
  InstallDevDependencies(isTypeScript);
  updatePackageJson();
  InitializingFilesByCommands(isTypeScript);
  createAppModule(isTypeScript);
  createDemoController(isTypeScript);
  if (isTypeScript) updateTsConfig();
}
