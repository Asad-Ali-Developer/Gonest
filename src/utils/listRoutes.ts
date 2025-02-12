import { Express } from "express";
import logMessage from "./logMessage";

const listAllRoutes = (app: Express): void => {
  const routes: { method: string; path: string }[] = [];

  // Iterate all routes
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Directly defined routes
      routes.push({
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        path: middleware.route.path,
      });
    } else if (middleware.name === "router" && middleware.handle.stack) {
      // Routes added via router
      const basePath = middleware.regexp
        .toString()
        .replace(/^\/\^/, "") // Remove leading "/^"
        .replace(/\\\//g, "/") // Replace escaped slashes
        .replace(/\?\(\?=\/\|\$\)\//g, "") // Remove "?(?=/|$)"
        .replace(/\$\//, "") // Remove trailing "$/"
        .replace(/\/i$/i, "") // Remove trailing "/i" case-insensitively
        .replace(/^\/maps/, "/maps"); // Ensure /maps stays as is

      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          routes.push({
            method: Object.keys(handler.route.methods)[0].toUpperCase(),
            path: `${basePath}${handler.route.path}`,
          });
        }
      });
    }
  });

  // Log the routes
  // logMessage("Mapped routes:", "LOG");
  routes.forEach((route) =>
    logMessage(
      `[RouterExplorer] Mapped {${route.path}, ${route.method}} route`,
      "LOG"
    )
  );
};

export default listAllRoutes;