const moduleContentForTs = `
import { GonestFactory } from "gonest";
import { DemoController } from "./controllers/demo.controller";

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
const { GonestFactory, app } = require("gonest");
const { DemoController } = require("./controllers/demo.controller.js");

function Invest() {
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
module.exports.app = Invest();
`;

module.exports = {
  moduleContentForTs,
  moduleContentForJs,
};
