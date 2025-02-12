"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = Middleware;
require("reflect-metadata");
/**
 * Middleware decorator to apply middleware functions to a specific route.
 */
function Middleware(...middlewares) {
    return (target, propertyKey) => {
        const existingRoutes = Reflect.getMetadata("routes", target.constructor) || [];
        const updatedRoutes = existingRoutes.map((route) => route.methodName === propertyKey
            ? Object.assign(Object.assign({}, route), { middlewares: [...(route.middlewares || []), ...middlewares] }) : route);
        Reflect.defineMetadata("routes", updatedRoutes, target.constructor);
    };
}
