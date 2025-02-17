import fs from "fs";
import path from "path";
import { logMessage } from "../utils";

/**
 * Creates or modifies the appModule file for the user, depending on their environment.
 * If the file doesn't exist, it will be created with the necessary content.
 * 
 * @param extension The file extension for the module (either '.ts' or '.js').
 * @throws Will throw an error if the file creation or modification fails.
 */
function createAppModule(extension: '.ts' | '.js'): void {
    // Path to the appModule (either appModule.ts or appModule.js)
    const appModulePath = path.join(process.cwd(), `appModule${extension}`);

    // Check if the file already exists
    if (fs.existsSync(appModulePath)) {
        console.log(`${appModulePath} already exists.`);
        return;
    }

    // Define the content for the appModule file
    const moduleContent = `
  import { GonestFactory } from "gonest";
  
  /**
   * Creates an instance of the application using GonestFactory.
   * This function sets up the app with the specified controllers and global prefix.
   *
   * @returns The created app instance.
   */
  export function Invest() {
      // Create an app instance using GonestFactory
      const instance = GonestFactory.create({
          controllers: [], // Add controllers here
          globalPrefix: 'api' // Modify the global prefix as needed
      });
  
      // Return the created app instance
      return instance;
  }
  
  // Create the app instance and export it directly
  export const app = Invest();
  `;

    // Write the content to the file
    try {
        fs.writeFileSync(appModulePath, moduleContent.trim(), 'utf-8');
        logMessage(`Created ${appModulePath} successfully.`, "SUCCESS");
    } catch (error: any) {
        logMessage(`Failed to create appModule file: ${error}`, "ERROR")
    }
}
export default createAppModule;
