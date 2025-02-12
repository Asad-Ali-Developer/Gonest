"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Head = exports.Options = exports.Patch = exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
require("reflect-metadata");
const createRouterDecorator = (method) => {
    return (path, ...middlewares) => {
        return (target, propertyKey, descriptor) => {
            if (!descriptor || typeof descriptor.value !== "function") {
                throw new Error(`@${method.toUpperCase()} can only be applied to methods.`);
            }
            const routes = Reflect.getMetadata("routes", target.constructor) || [];
            routes.push({
                path,
                requestMethod: method,
                methodName: propertyKey,
                middlewares: middlewares || [],
            });
            Reflect.defineMetadata("routes", routes, target.constructor);
        };
    };
};
exports.Get = createRouterDecorator("get");
exports.Post = createRouterDecorator("post");
exports.Put = createRouterDecorator("put");
exports.Delete = createRouterDecorator("delete");
exports.Patch = createRouterDecorator("patch");
exports.Options = createRouterDecorator("options");
exports.Head = createRouterDecorator("head");
