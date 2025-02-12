"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = Controller;
require("reflect-metadata");
function Controller(prefix) {
    return (target) => {
        Reflect.defineMetadata("prefix", prefix, target);
        if (!Reflect.hasMetadata("routes", target)) {
            Reflect.defineMetadata("routes", [], target);
        }
    };
}
