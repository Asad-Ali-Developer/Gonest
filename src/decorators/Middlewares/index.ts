import { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import { RouteDefinition } from "../../types";

/**
 * Middleware decorator to apply middleware functions to a specific route.
 * Ensures middlewares are stored correctly without overwriting other metadata.
 *
 * @param middlewares Array of middleware functions to apply.
 * @returns MethodDecorator for applying the middlewares to a specific method.
 */
export function Middleware(
  ...middlewares: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >
): MethodDecorator {
  return (target, propertyKey) => {
    // Retrieve existing metadata or initialize an empty array
    const routes: RouteDefinition[] =
      Reflect.getMetadata("routes", target.constructor) || [];

    // Find if the method already has a route definition
    const existingRoute = routes.find(
      (route) => route.methodName === propertyKey
    );

    if (existingRoute) {
      // Append middlewares to the existing route definition
      existingRoute.middlewares = [
        ...(existingRoute.middlewares || []),
        ...middlewares,
      ];
    } else {
      // If no route is defined yet, create a new one WITHOUT setting requestMethod
      routes.push({
        path: "", // Will be updated later by @Get(), @Post(), etc.
        methodName: propertyKey as string,
        middlewares: [...middlewares], // Ensure middleware is stored
      } as RouteDefinition); // ✅ Explicitly cast to RouteDefinition
    }

    Reflect.defineMetadata("routes", routes, target.constructor);
  };
}
