import { Express, Request, Response, Router, NextFunction } from "express";
import "reflect-metadata";
import { RouteDefinition } from "./types";

let globalPrefix: string = "";

const setApiGlobalPrefix = (prefix: string) => {
    globalPrefix = prefix;
}

interface ControllerClass {
    new(): any;
}

const registerControllers = (app: Express, controllers: ControllerClass[]): void => {
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

        app.use(`/${globalPrefix}/${prefix}`, router);
    });
};

export { setApiGlobalPrefix, registerControllers };
