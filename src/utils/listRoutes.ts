import { Express } from "express";
import logMessage from "./logMessage";

const listAllRoutes = (app: Express): void => {
  if (!app._router) {
    console.error("No routes defined yet.");
    return;
  }

  const routes: { method: string; path: string }[] = [];

  // Iterate over routes safely
  app._router?.stack.forEach((middleware: any) => {
    if (middleware.route) {
      routes.push({
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        path: middleware.route.path,
      });
    } else if (middleware.name === "router" && middleware.handle.stack) {
      const basePath = middleware.regexp
        .toString()
        .replace(/^\/\^/, "")
        .replace(/\\\//g, "/")
        .replace(/\?\(\?=\/\|\$\)\//g, "")
        .replace(/\$\//, "")
        .replace(/\/i$/i, "")
        .replace(/^\/maps/, "/maps");

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

  // Log all routes
  routes.forEach((route) =>
    logMessage(`[RouterExplorer] Mapped {${route.path}, ${route.method}} route`, "LOG")
  );
};

export default listAllRoutes;
