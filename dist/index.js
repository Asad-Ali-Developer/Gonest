"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setApiGlobalPrefix = exports.registerControllers = void 0;
__exportStar(require("./src/decorators/ClassDecorator"), exports);
__exportStar(require("./src/decorators/MethodDecorator"), exports);
__exportStar(require("./src/decorators/Middlewares"), exports);
__exportStar(require("./src/types"), exports);
var registerController_1 = require("./src/registerController");
Object.defineProperty(exports, "registerControllers", { enumerable: true, get: function () { return registerController_1.registerControllers; } });
Object.defineProperty(exports, "setApiGlobalPrefix", { enumerable: true, get: function () { return registerController_1.setApiGlobalPrefix; } });
