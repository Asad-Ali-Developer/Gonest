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
const RegisterControllers = (appInstance: Express, apiGlobalPrefix: string, controllers: ControllerClass[]): void => {
    controllers.forEach((ControllerClass) => {
        const controllerInstance = new ControllerClass();
        const routePrefix: string = Reflect.getMetadata("prefix", ControllerClass) || "";
        const routes: RouteDefinition[] = Reflect.getMetadata("routes", ControllerClass) || [];

        const router = Router();

        routes.forEach(({ path, requestMethod, methodName, middlewares }) => {
            // Make sure requestMethod is a valid HttpMethod type and is defined
            if (!requestMethod || !isValidHttpMethod(requestMethod)) {
                throw new Error(`Invalid or undefined HTTP method for route handler: ${methodName}`);
            }

            const appliedMiddlewares = middlewares && middlewares.length > 0 ? middlewares : [];
            const fullPath = `/${apiGlobalPrefix}/${routePrefix}/${path}`;

            // Apply route method with dynamic access using a valid HttpMethod
            router[requestMethod as HttpMethod](
                path,
                ...appliedMiddlewares, // Apply middleware functions
                async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const boundHandler = controllerInstance[methodName].bind(controllerInstance);
                        await boundHandler(req, res, next);
                    } catch (error) {
                        logMessage(`Error in route handler for ${fullPath}:`, "ERROR");
                        console.error(`Error in route handler for ${fullPath}:`, error);
                        next(error);
                    }
                }
            );
        });

        appInstance.use(`/${apiGlobalPrefix}/${routePrefix}`, router);
    });
};

/**
 * Helper function to check if a method is a valid HTTP method.
 *
 * @param method The HTTP method to check.
 * @returns `true` if the method is valid, `false` otherwise.
 */
const isValidHttpMethod = (method: any): method is HttpMethod => {
    return ["get", "post", "put", "delete", "patch", "options", "head"].includes(method);
};

export { RegisterControllers };
