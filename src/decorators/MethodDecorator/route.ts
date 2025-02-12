import "reflect-metadata";
import { HttpMethod, RouteDefinition } from "../../types";

const createRouterDecorator = (method: HttpMethod) => {
  return (path: string, ...middlewares: Array<(req: any, res: any, next: any) => void>): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
      if (!descriptor || typeof descriptor.value !== "function") {
        throw new Error(`@${method.toUpperCase()} can only be applied to methods.`);
      }

      const routes: RouteDefinition[] = Reflect.getMetadata("routes", target.constructor) || [];

      routes.push({
        path,
        requestMethod: method,
        methodName: propertyKey as string,
        middlewares: middlewares || [],
      });

      Reflect.defineMetadata("routes", routes, target.constructor);
    };
  };
};

export const Get = createRouterDecorator("get");
export const Post = createRouterDecorator("post");
export const Put = createRouterDecorator("put");
export const Delete = createRouterDecorator("delete");
export const Patch = createRouterDecorator("patch");
export const Options = createRouterDecorator("options");
export const Head = createRouterDecorator("head");
