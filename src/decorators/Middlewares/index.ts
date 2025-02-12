import "reflect-metadata";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware decorator to apply middleware functions to a specific route.
 */
export function Middleware(
    ...middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>
): MethodDecorator {
    return (target, propertyKey) => {
        const existingRoutes = Reflect.getMetadata("routes", target.constructor) || [];

        const updatedRoutes = existingRoutes.map((route: any) =>
            route.methodName === propertyKey
                ? { ...route, middlewares: [...(route.middlewares || []), ...middlewares] }
                : route
        );

        Reflect.defineMetadata("routes", updatedRoutes, target.constructor);
    };
}
