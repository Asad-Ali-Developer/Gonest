#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const packageJsonPath = path.resolve(process.cwd(), "package.json");
const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

// Detect if TypeScript is being used
const isTypeScript = fs.existsSync(tsConfigPath);

const devScript = "node scripts/dev-runner.js"; // ✅ Custom watcher for both JS/TS

function updatePackageJson() {
  if (!fs.existsSync(packageJsonPath)) {
    console.error("❌ package.json not found.");
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  packageJson.scripts = packageJson.scripts || {};

  if (!packageJson.scripts.dev) {
    packageJson.scripts.dev = devScript;
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(`✅ 'dev' script added to package.json: ${devScript}`);
}

// Ensure the dev-runner script is created
const devRunnerPath = path.resolve(process.cwd(), "scripts/dev-runner.js");
if (!fs.existsSync(devRunnerPath)) {
  fs.mkdirSync(path.dirname(devRunnerPath), { recursive: true });
  fs.writeFileSync(
    devRunnerPath,
    `#!/usr/bin/env node
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const isTypeScript = fs.existsSync(path.resolve(process.cwd(), "tsconfig.json"));
const entryFile = isTypeScript ? "src/index.ts" : "src/index.js";
const nodeCommand = isTypeScript ? "ts-node" : "node";

let childProcess = null;

function clearTerminal() {
  process.stdout.write("\\x1Bc"); // Clears the terminal
}

function startServer() {
  clearTerminal();
  console.log(\`🚀 Starting \${entryFile}...\n\`);

  if (childProcess) {
    childProcess.kill(); // Kill previous instance
  }

  childProcess = spawn(nodeCommand, [entryFile], { stdio: "inherit" });
}

fs.watch("src", { recursive: true }, (eventType, filename) => {
  if (filename.endsWith(".ts") || filename.endsWith(".js")) {
    console.log(\`\\n🔄 File changed: \${filename}\`);
    startServer();
  }
});

startServer();`
  );
  console.log("✅ dev-runner.js script created.");
}

updatePackageJson();
