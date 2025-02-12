"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerControllers = exports.setApiGlobalPrefix = void 0;
const express_1 = require("express");
require("reflect-metadata");
let globalPrefix = "";
const setApiGlobalPrefix = (prefix) => {
    globalPrefix = prefix;
};
exports.setApiGlobalPrefix = setApiGlobalPrefix;
const registerControllers = (app, controllers) => {
    controllers.forEach((ControllerClass) => {
        const controllerInstance = new ControllerClass();
        const prefix = Reflect.getMetadata("prefix", ControllerClass) || "";
        const routes = Reflect.getMetadata("routes", ControllerClass) || [];
        const router = (0, express_1.Router)();
        routes.forEach(({ path, requestMethod, methodName, middlewares }) => {
            const appliedMiddlewares = middlewares !== null && middlewares !== void 0 ? middlewares : [];
            router[requestMethod](path, ...appliedMiddlewares, // ✅ Apply middleware functions dynamically
            (req, res, next) => {
                controllerInstance[methodName](req, res, next);
            });
        });
        app.use(`/${globalPrefix}/${prefix}`, router);
    });
};
exports.registerControllers = registerControllers;
