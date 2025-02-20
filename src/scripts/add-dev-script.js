#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

// Detect if TypeScript is being used
const isTypeScript = fs.existsSync(tsConfigPath);

const devScript = isTypeScript
  ? "ts-node-dev --clear --respawn --transpile-only --watch src src/index.ts"
  : "nodemon --exec \"node scripts/cls.js && node index.js\" --watch .";

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


// Copy clear-terminal.js to user’s project if not present
function copyClearTerminal() {

  // Path to the clear-terminal.js in your gonest package
  const sourcePath = path.resolve(__dirname, "cls.js");
  
  // Destination in the user’s project
  const destDir = path.resolve(process.cwd(), "scripts");
  const destPath = path.join(destDir, "cls.js");

  fs.mkdirSync(destDir, { recursive: true });

  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(sourcePath, destPath);
  }
}

updatePackageJson();
// Only copy the file if we’re dealing with JS (not TS) or you can always copy
copyClearTerminal();
