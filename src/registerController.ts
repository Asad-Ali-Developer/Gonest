import { Express, Request, Response, Router, NextFunction } from "express";
import "reflect-metadata";
import { RouteDefinition } from "./types";
import { app } from "./core";

interface ControllerClass {
    new(): any;
}

const RegisterControllers = (appInstance: Express, controllers: ControllerClass[]): void => {
    const apiPrefix = app.getApiGlobalPrefix()
    controllers.forEach((ControllerClass) => {
        const controllerInstance = new ControllerClass();
        const route: string = Reflect.getMetadata("prefix", ControllerClass) || "";
        const routes: RouteDefinition[] = Reflect.getMetadata("routes", ControllerClass) || [];

        const router = Router();

        routes.forEach(({ path, requestMethod, methodName, middlewares }) => {
            const appliedMiddlewares = middlewares ?? [];

            router[requestMethod](
                path,
                ...appliedMiddlewares,
                (req: Request, res: Response, next: NextFunction) => {
                    controllerInstance[methodName](req, res, next);
                }
            );
        });

        appInstance.use(`/${apiPrefix}/${route}`, router);
    });
};

export { RegisterControllers };
