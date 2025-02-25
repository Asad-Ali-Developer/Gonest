const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Resolve the path to the 'package.json' file in the current working directory
const packageJsonPath = path.resolve(process.cwd(), "package.json");

// Resolve the path to the 'tsconfig.json' file in the current working directory
const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

// Read the 'package.json' file and parse its contents
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

// Export the resolved paths and the TypeScript detection result
module.exports = { packageJsonPath, tsConfigPath, packageJson, execSync, path, fs };
