#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

// Detect if TypeScript is being used
const isTypeScript = fs.existsSync(tsConfigPath);

const devScript = isTypeScript
  ? "ts-node-dev --clear --respawn --transpile-only --watch src src/index.ts"
  : "nodemon --exec \"cls && node index.js\" --watch .";

function updatePackageJson() {
  if (!fs.existsSync(packageJsonPath)) {
    console.log("❌ package.json not found...");
    return;
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  packageJson.scripts = packageJson.scripts || {};
  console.log("Your gonest application has been initialized")

  packageJson.scripts.dev = devScript;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  // console.log("'dev' script set to:", devScript);
}

updatePackageJson();
