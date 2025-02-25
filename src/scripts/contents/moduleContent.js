const moduleContentForTs = `
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

  // Start the server on port 8080
  app.listen(8080);

  // Return the initialized Gonest application instance
  return app;
}

// Export the application instance for use in other parts of the project
export const app = Invest();
`;

const moduleContentForJs = `
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

  // Start the server on port 8080
  app.listen(8080);

  // Return the initialized Gonest application instance
  return app;
}

// Export the application instance for use in other parts of the project
export const app = Invest();
`;

module.exports = {
  moduleContentForTs,
  moduleContentForJs,
};
