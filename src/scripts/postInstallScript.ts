/**
 * postInstallScript.ts
 *
 * When a user installs your package (`npm i gonest`), this script will:
 *  1. Determine the consumer project’s root directory.
 *  2. Add a "dev" script to the consumer’s package.json if it does not exist.
 *  3. Create an "appModule.ts" file in the consumer project root that registers controllers
 *     and returns the app instance using GonestFactory.
 */

import * as fs from "fs";
import * as path from "path";
import { logMessage } from "../utils";

/**
 * Determines the consumer project's root directory.
 * It uses require.resolve("gonest/package.json") to locate gonest inside the consumer's node_modules,
 * then moves up two directories to reach the consumer project's root.
 *
 * @returns The absolute path of the consumer project.
 */
function getProjectRoot(): string {
  try {
    // This will resolve to something like: /path/to/consumer/node_modules/gonest/package.json
    const gonestPackagePath = require.resolve("gonest/package.json");
    // Move two directories up:
    // 1st up: from /path/to/consumer/node_modules/gonest to /path/to/consumer/node_modules
    // 2nd up: from /path/to/consumer/node_modules to /path/to/consumer
    return path.join(path.dirname(gonestPackagePath), "../../");
  } catch (error) {
    console.error("❌ Could not determine project root. Using process.cwd() as fallback.");
    return process.cwd();
  }
}

/**
 * Adds a "dev" script to the consumer's package.json if it doesn't already exist.
 * This script uses ts-node-dev to run the application in development mode.
 */
function addDevScriptToPackageJson(): void {
  const projectRoot = getProjectRoot();
  const packageJsonPath = path.join(projectRoot, "package.json");

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    if (!packageJson.scripts.dev) {
      packageJson.scripts.dev =
        "ts-node-dev --clear --respawn --transpile-only --watch src src/index.ts";
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      logMessage("✅ Added 'dev' script to package.json", "SUCCESS");
    } else {
      logMessage("⚠️ 'dev' script already exists in package.json", "WARN");
    }
  } catch (error: any) {
    logMessage(`❌ Failed to update package.json: ${error}`, "ERROR");
  }
}

/**
 * Creates the "appModule.ts" file in the consumer project's root.
 * This file imports GonestFactory from "gonest", registers controllers, sets a global prefix,
 * and exports the created app instance.
 *
 * @param fileExtension The file extension to use (".ts" by default or ".js" if "--js" flag is present).
 */
function createAppModule(fileExtension: ".ts" | ".js"): void {
  const projectRoot = getProjectRoot();
  const appModulePath = path.join(projectRoot, `appModule${fileExtension}`);

  if (fs.existsSync(appModulePath)) {
    logMessage(`⚠️ ${appModulePath} already exists.`, "WARN");
    return;
  }

  const moduleContent = `
import { GonestFactory } from "gonest";

/**
 * Creates an instance of the application using GonestFactory.
 * Registers controllers and sets the global prefix.
 *
 * @returns The created app instance.
 */
export function Invest() {
    const instance = GonestFactory.create({
        controllers: [], // Add controllers as needed
        globalPrefix: "api" // Modify the global prefix if required
    });
    return instance;
}

// Export the app instance
export const app = Invest();
`;

  try {
    fs.writeFileSync(appModulePath, moduleContent.trim(), "utf-8");
    logMessage(`✅ Created ${appModulePath} successfully.`, "SUCCESS");
  } catch (error: any) {
    logMessage(`❌ Failed to create appModule file: ${error}`, "ERROR");
  }
}

/**
 * Determines which file extension to use based on the presence of "--js" in process.argv,
 * then creates the app module accordingly.
 */
function createAppModuleIfNeeded(): void {
  const fileExtension: ".ts" | ".js" = process.argv.includes("--js") ? ".js" : ".ts";
  createAppModule(fileExtension);
}

// Execute both steps:
addDevScriptToPackageJson();
createAppModuleIfNeeded();
