import { Express, Request, Response, Router, NextFunction } from "express";
import "reflect-metadata";
import { ControllerClass, RouteDefinition, HttpMethod } from "../types";
import logMessage from "../utils/logMessage";

/**
 * Registers controllers and their routes within an Express application instance.
 *
 * @param appInstance The Express application instance where routes will be registered.
 * @param apiGlobalPrefix A global prefix for all API routes (e.g., "api/v1").
 * @param controllers An array of controller classes to be registered.
 */
const RegisterControllers = (
  appInstance: Express,
  apiGlobalPrefix: string,
  controllers: ControllerClass[]
): void => {
  controllers.forEach((ControllerClass) => {
    const controllerInstance = new ControllerClass();
    const routePrefix: string =
      Reflect.getMetadata("prefix", ControllerClass) || "";
    const routes: RouteDefinition[] =
      Reflect.getMetadata("routes", ControllerClass) || [];

    const controllerPath = `/${apiGlobalPrefix}/${routePrefix}`;

    const router = Router();

    routes.forEach(({ path, requestMethod, methodName, middlewares }) => {
      // Ensure the requestMethod is valid
      if (!requestMethod || !isValidHttpMethod(requestMethod)) {
        logMessage(`Invalid HTTP method for route: ${methodName}`, "ERROR");
        return;
      }

      const appliedMiddlewares =
        middlewares && middlewares.length > 0 ? middlewares : [];
      const fullPath = `${controllerPath}/${path}`;

      // logMessage(`Registering route: ${requestMethod.toUpperCase()!} ${fullPath}`, "ROUTE");

      router[requestMethod as HttpMethod](
        path,
        ...appliedMiddlewares, // Apply middleware functions
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const boundHandler =
              controllerInstance[methodName].bind(controllerInstance);
            await boundHandler(req, res, next);
          } catch (error) {
            logMessage(`Error in route handler for ${fullPath}:`, "ERROR");
            next(error);
          }
        }
      );
    });

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
