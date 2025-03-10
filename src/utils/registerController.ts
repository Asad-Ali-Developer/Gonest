import { Express, Request, Response, Router, NextFunction } from "express";
import "reflect-metadata";
import { ControllerClass, RouteDefinition, HttpMethod } from "../types";
import LogMessageTsForApplication from "../utils/LogMessageTsForApplication";

/**
 * Registers controllers and their routes within an Express application instance.
 *
 * @param appInstance The Express application instance where routes will be registered.
 * @param apiGlobalPrefix A global prefix for all API routes (e.g., "api/v1"). This parameter is optional.
 * @param controllers An array of controller classes to be registered.
 */
const RegisterControllers = (
  appInstance: Express,
  apiGlobalPrefix: string = "",
  controllers: ControllerClass[]
): void => {
  controllers.forEach((ControllerClass) => {
    // Create an instance of the controller
    const controllerInstance = new ControllerClass();

    // Retrieve metadata for route prefix from the controller class
    const routePrefix: string =
      Reflect.getMetadata("prefix", ControllerClass) || "";

    // Build the full controller path by combining the global prefix and the controller's prefix
    const controllerPath = `/${apiGlobalPrefix}/${routePrefix}`.replace(
      /\/+/g,
      "/"
    );

    // Initialize a new router for the controller
    const router = Router();

    // Retrieve the route definitions metadata for the controller
    const routes: RouteDefinition[] =
      Reflect.getMetadata("routes", ControllerClass) || [];

    routes.forEach(({ path, requestMethod, methodName, middlewares }) => {
      // Ensure the requestMethod is valid
      if (!requestMethod || !isValidHttpMethod(requestMethod)) {
        LogMessageTsForApplication(
          `Invalid HTTP method for route: ${methodName}`,
          "ERROR"
        );
        return;
      }

      // Apply middlewares if any, else an empty array
      const appliedMiddlewares =
        middlewares && middlewares.length > 0 ? middlewares : [];
      const fullPath = `${controllerPath}/${path}`.replace(/\/+/g, "/");

      // Register the route with Express
      router[requestMethod as HttpMethod](
        path,
        ...appliedMiddlewares,
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const boundHandler =
              controllerInstance[methodName].bind(controllerInstance);
            await boundHandler(req, res, next);
          } catch (error) {
            LogMessageTsForApplication(
              `Error in route handler for ${fullPath}:`,
              "ERROR"
            );
            next(error);
          }
        }
      );
    });

    // Attach the router to the Express application
    appInstance.use(controllerPath, router);
  });
};

/**
 * Helper function to check if a method is a valid HTTP method.
 *
 * @param method The HTTP method to check.
 * @returns `true` if the method is valid, `false` otherwise.
 */
const isValidHttpMethod = (method: any): method is HttpMethod => {
  return ["get", "post", "put", "delete", "patch", "options", "head"].includes(
    method
  );
};

export { RegisterControllers };
