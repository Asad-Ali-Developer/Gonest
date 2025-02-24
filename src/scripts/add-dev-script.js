#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const updateTsConfig = require("./updateTsConfig.js");
const { createAppModule, createDemoController } = require("./appModule.script.js");

const packageJsonPath = path.resolve(process.cwd(), "package.json");

const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

// Detect if TypeScript is being used
const isTypeScript = fs.existsSync(tsConfigPath);

// Scripts for development
const devScript = isTypeScript
  ? "ts-node-dev --clear --respawn --transpile-only --watch src src/index.ts"
  : 'nodemon --exec "cls && node index.js" --watch .';


  /**
 * Checks if `ts-node-dev` is installed
 */
function isTsNodeDevInstalled() {
  try {
    require.resolve("ts-node-dev");
    return true;
  } catch {
    return false;
  }
}

  /**
 * Installs `ts-node-dev` if TypeScript is detected and not installed
 */
function installTsNodeDev() {
  if (isTypeScript && !isTsNodeDevInstalled()) {
    console.log("🚀 Installing ts-node-dev...");
    execSync("npm install -D ts-node-dev", { stdio: "inherit" });
    console.log("✅ ts-node-dev installed successfully!");
  }
}


/**
 * Updates `package.json` by adding required scripts.
 */
function updatePackageJson() {
  if (!fs.existsSync(packageJsonPath)) {
    console.error("package.json not found. Run 'npm init -y' first.");
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.dev = devScript;

  // Add TypeScript-specific scripts
  if (isTypeScript) {
    packageJson.scripts.build = "npx tsc";
    packageJson.scripts.start = "node dist/index.js";
  }

  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    console.error(`Failed to update package.json: ${error.message}`);
  }
}

// Run initialization
installTsNodeDev();
updateTsConfig();
createAppModule();
createDemoController();
updatePackageJson();
