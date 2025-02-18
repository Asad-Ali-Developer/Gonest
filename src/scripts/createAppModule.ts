import * as fs from "fs";
import * as path from "path";
import { logMessage } from "../utils";

/**
 * Detects the correct root directory of the project using `gonest`.
 * Ensures `appModule.ts` is created in the actual project using `gonest`.
 * @returns The absolute path of the project using the package.
 */
function getProjectRoot(): string {
  try {
    // This finds gonest in the node_modules of the *actual project*
    const gonestPackagePath = require.resolve("gonest/package.json");
    // Move up twice from .../node_modules/gonest/package.json to get the real project
    return path.join(path.dirname(gonestPackagePath), "../../");
  } catch (error) {
    // Fallback if for some reason it can't find gonest
    console.error("❌ Could not determine project root. Using process.cwd() as fallback.");
    return process.cwd();
  }
}

/**
 * Creates `appModule.ts` in the correct project directory.
 * @param fileExtension The file extension (".ts" or ".js").
 */
export default function createAppModule(fileExtension: ".ts" | ".js"): void {
  const projectRoot = getProjectRoot();
  const appModulePath = path.join(projectRoot, `appModule${fileExtension}`);

  if (fs.existsSync(appModulePath)) {
    logMessage(`⚠️ ${appModulePath} already exists.`, "WARN");
    return;
  }

  const moduleContent = `
import { GonestFactory } from "gonest";

export function Invest() {
    const instance = GonestFactory.create({
        controllers: [],
        globalPrefix: "api",
    });
    return instance;
}

export const app = Invest();
`;

  try {
    fs.writeFileSync(appModulePath, moduleContent.trim(), "utf-8");
    logMessage(`✅ Created ${appModulePath} successfully.`, "SUCCESS");
  } catch (error: any) {
    logMessage(`❌ Failed to create appModule file: ${error}`, "ERROR");
  }
}
