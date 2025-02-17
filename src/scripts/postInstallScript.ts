import * as fs from 'fs';
import * as path from 'path';
import { logMessage } from '../utils';
import createAppModule from './createAppModule';

/**
 * Adds a 'dev' script to the user's package.json if it doesn't already exist.
 * Ensures that the 'scripts' section is present and adds the `dev` script
 * for using `ts-node-dev` to run the application in development mode.
 *
 * @throws Will throw an error if package.json cannot be read or updated.
 */
export function addDevScriptToPackageJson(): void {
  // Path to the user's package.json (assuming it is at the root of their project)
  const packageJsonPath: string = path.join(process.cwd(), 'package.json');

  try {
    // Load and parse the user's package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Ensure the 'scripts' field exists, if not, create it
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }

    // Add the 'dev' script if it doesn't exist
    if (!packageJson.scripts.dev) {
      packageJson.scripts.dev = 'ts-node-dev --clear --respawn --transpile-only --watch src src/index.ts';
    }

    // Write the updated package.json back to disk
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    logMessage("Added 'dev' script to package.json", "SUCCESS");

  } catch (error: any) {
    // Handle any errors that occur during the file read/write process

    logMessage(`Failed to update package.json: ${error}`, "ERROR");
  }
}

// Call the function to add the dev script when this script is executed
addDevScriptToPackageJson();


//<-------------------------------------------------------------------------------->

/**
 * This is the main function that runs when the script is executed.
 * It checks if TypeScript or JavaScript should be used and creates the respective file.
 */
 export function createAppModuleIfNeeded(): void {
    const fileExtension: '.ts' | '.js' = process.argv.includes('--js') ? '.js' : '.ts';
    createAppModule(fileExtension);
}

// Call the function to create the app module
createAppModuleIfNeeded();

