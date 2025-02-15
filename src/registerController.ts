import { Express, Request, Response, Router, NextFunction } from "express";
import "reflect-metadata";
import { RouteDefinition } from "./types";
import { app } from "./core";

interface ControllerClass {
    new(): any;
}

const RegisterControllers = (appInstance: Express, controllers: ControllerClass[]): void => {
    const apiPrefix = app.getApiGlobalPrefix() || ""; 

    controllers.forEach((ControllerClass) => {
        const controllerInstance = new ControllerClass();
        const routePrefix: string = Reflect.getMetadata("prefix", ControllerClass) || "";
        const routes: RouteDefinition[] = Reflect.getMetadata("routes", ControllerClass) || [];

        const router = Router();

        routes.forEach(({ path, requestMethod, methodName, middlewares }) => {
            const appliedMiddlewares = middlewares ?? [];
            const fullPath = `/${apiPrefix}/${routePrefix}/${path}`; // Construct full path

            router[requestMethod](
                path, // Use the path directly on the router
                ...appliedMiddlewares,
                async (req: Request, res: Response, next: NextFunction) => {  // Make this async
                    try {
                        // Crucial: Bind 'this' and await the controller method
                        const boundHandler = controllerInstance[methodName].bind(controllerInstance);
                        await boundHandler(req, res, next);
                    } catch (error) {
                        console.error(`Error in route handler for ${fullPath}:`, error);
                        next(error); // Pass error to Express error handler
                    }
                }
            );
        });

        appInstance.use(`/${apiPrefix}/${routePrefix}`, router); // Use the router with prefix
        console.log(`Registered routes for /${apiPrefix}/${routePrefix}`); // Log route registration
    });
};

export { RegisterControllers };