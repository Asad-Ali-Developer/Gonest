import { Express, Request, Response, Router, NextFunction } from "express";
import "reflect-metadata";
import { RouteDefinition } from "./types";
import { appInstance } from "./utils/ModestAppInstance";

interface ControllerClass {
    new(): any;
}

const RegisterControllers = (app: Express, controllers: ControllerClass[]): void => {
    controllers.forEach((ControllerClass) => {
        const controllerInstance = new ControllerClass();
        const prefix: string = Reflect.getMetadata("prefix", ControllerClass) || "";
        const routes: RouteDefinition[] = Reflect.getMetadata("routes", ControllerClass) || [];

        const router = Router();

        routes.forEach(({ path, requestMethod, methodName, middlewares }) => {
            const appliedMiddlewares = middlewares ?? [];

            router[requestMethod](
                path,
                ...appliedMiddlewares, // ✅ Apply middleware functions dynamically
                (req: Request, res: Response, next: NextFunction) => {
                    controllerInstance[methodName](req, res, next);
                }
            );
        });

        app.use(`${appInstance.getApiGlobalPrefix}/${prefix}`, router);
    });
};

export { RegisterControllers };
