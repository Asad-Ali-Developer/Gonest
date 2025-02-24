import "reflect-metadata";
import { HttpMethod, RouteDefinition } from "../../types";

/**
 * Factory function to create HTTP method decorators for route handling.
 *
 * @param method The HTTP method (e.g., "get", "post", "put", etc.).
 * @returns A decorator function that registers a route with the specified HTTP method.
 */
const createRouterDecorator = (method: HttpMethod) => {
  return (path: string): MethodDecorator => {
    return (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) => {
      if (!descriptor || typeof descriptor.value !== "function") {
        throw new Error(
          `@${method.toUpperCase()} can only be applied to methods.`
        );
      }

      // Retrieve existing metadata or initialize an empty array
      const routes: RouteDefinition[] =
        Reflect.getMetadata("routes", target.constructor) || [];

      // Find existing route definition
      const existingRoute = routes.find(
        (route) => route.methodName === propertyKey
      );

      if (existingRoute) {
        // If the method is already in metadata (from @Middleware), update it
        existingRoute.path = path;
        existingRoute.requestMethod = method;
      } else {
        // Otherwise, create a new route entry
        routes.push({
          path,
          requestMethod: method,
          methodName: propertyKey as string,
          middlewares: [], // Middleware will be added by @Middleware
        });
      }

      Reflect.defineMetadata("routes", routes, target.constructor);
    };
  };
};

// Export HTTP method decorators
export const Get = createRouterDecorator("get");
export const Post = createRouterDecorator("post");
export const Put = createRouterDecorator("put");
export const Delete = createRouterDecorator("delete");
export const Patch = createRouterDecorator("patch");
export const Options = createRouterDecorator("options");
export const Head = createRouterDecorator("head");
