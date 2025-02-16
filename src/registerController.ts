import { Express, Request, Response, Router, NextFunction } from "express";
import "reflect-metadata";
import { RouteDefinition } from "./types";

interface ControllerClass {
    new(): any;
}

const RegisterControllers = (appInstance: Express, apiGlobalPrefix: string, controllers: ControllerClass[]): void => {
    controllers.forEach((ControllerClass) => {
        const controllerInstance = new ControllerClass();
        const routePrefix: string = Reflect.getMetadata("prefix", ControllerClass) || "";
        const routes: RouteDefinition[] = Reflect.getMetadata("routes", ControllerClass) || [];

        const router = Router();

        routes.forEach(({ path, requestMethod, methodName, middlewares }) => {
            const appliedMiddlewares = middlewares && middlewares.length > 0 ? middlewares : [];
            const fullPath = `/${apiGlobalPrefix}/${routePrefix}/${path}`;

            router[requestMethod](
                path,
                ...appliedMiddlewares, // Apply middlewares only if they exist
                async (req: Request, res: Response, next: NextFunction) => {
                    try {
                        const boundHandler = controllerInstance[methodName].bind(controllerInstance);
                        await boundHandler(req, res, next);
                    } catch (error) {
                        console.error(`Error in route handler for ${fullPath}:`, error);
                        next(error);
                    }
                }
            );
        });

        appInstance.use(`/${apiGlobalPrefix}/${routePrefix}`, router);
    });
};

export { RegisterControllers };
