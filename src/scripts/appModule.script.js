const path = require("path");
const fs = require("fs");

const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

// Detect if TypeScript is being used
const isTypeScript = fs.existsSync(tsConfigPath);
const fileExtension = isTypeScript ? ".ts" : ".js";

const srcPath = path.resolve(process.cwd(), "src");
/**
 * Ensures that the `src/` directory exists in the project.
 */
const ensureSrcDirectory = () => {
  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath, { recursive: true });
    console.info("📂 Created 'src/' directory.");
  }
};

/**
 * Creates `src/appModule.ts` or `src/appModule.js` in the correct project directory.
 */
const createAppModule = () => {
  ensureSrcDirectory();
  const appModulePath = path.join(srcPath, `appModule${fileExtension}`);

  if (fs.existsSync(appModulePath)) {
    console.warn(`⚠️ ${appModulePath} already exists.`);
    return;
  }

  const moduleContent = `
import { GonestFactory } from "gonest";
import { DemoController } from "./controllers/demo.controller";

/**
 * Initializes and configures the Gonest application.
 * - Sets up global API prefix.
 * - Enables CORS, JSON parsing, and URL encoding.
 * - Defines a simple route.
 * - Lists all routes for debugging.
 * - Handles exceptions gracefully (Must be added last).
 *
 * Note: Ensure that Express is installed along with the \`gonest.js\` package,
 * as it is required for handling routes and middleware properly.
 *
 * @returns {object} The initialized Gonest application.
 */
export function Invest() {
  // Define the application module with controllers and global prefix
  const appModule = {
    controllers: [DemoController],
    globalPrefix: "api/v1",
  };

  const app = GonestFactory.create(appModule);

  app.setApplicationName("Gonest");

  // Enable Cross-Origin Resource Sharing
  app.enableCors();

  // Allow JSON data parsing in requests
  app.enableJsonParsing();

  // Enable URL-encoded form parsing
  app.urlEncodedParser();

  // Define a simple root route
  app.get("/", (req, res) => {
    res.send("Hello from Gonest!");
  });

  // Display all registered routes
  app.listAllRoutes();

  // Set up global exception handling (This is a must!).
  app.exceptionHandler();

  // Return the initialized Gonest application instance
  return app;
}

// Export the application instance for use in other parts of the project
export const app = Invest();
`;

  try {
    fs.writeFileSync(appModulePath, moduleContent.trim(), "utf-8");
  } catch (error) {
    console.error(`Failed to create appModule file: ${error.message}`);
  }
};

/**
 * Creates `src/controllers/demo.controller.ts` or `src/controllers/demo.controller.js`.
 */
const createDemoController = () => {
  ensureSrcDirectory();
  const controllersPath = path.join(srcPath, "controllers");

  if (!fs.existsSync(controllersPath)) {
    fs.mkdirSync(controllersPath, { recursive: true });
  }

  const controllerPath = path.join(
    controllersPath,
    `demo.controller${fileExtension}`
  );

  if (fs.existsSync(controllerPath)) {
    console.warn(`⚠️ ${controllerPath} already exists.`);
    return;
  }

  const controllerContent = `
import { Controller, Get } from "gonest";

@Controller("demo") // Base route: /api/v1/demo
export class DemoController {

  /**
   * Handles GET requests to "/api/v1/demo/route".
   * @returns A simple JSON response.
   */
  @Get("/route")
  async demo() {
    return { message: "Hello, Gonest!" };
  }
}
`;

  try {
    fs.writeFileSync(controllerPath, controllerContent.trim(), "utf-8");
  } catch (error) {
    console.error(`Failed to create DemoController: ${error.message}`);
  }
};

module.exports = { createAppModule, createDemoController };
