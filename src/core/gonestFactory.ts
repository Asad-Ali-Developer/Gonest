import { CoreGonestApplication } from "./coreGonestApplication";
import express from "express";

interface ControllerClass {
    new(): any;
}

class GonestFactory {
    private static instance: CoreGonestApplication | null = null;

    private constructor() { } // Prevent instantiation

    public static create(appModule?: { controllers: ControllerClass[], globalPrefix?: string }): CoreGonestApplication {
        if (!GonestFactory.instance) {
            GonestFactory.instance = new CoreGonestApplication();
        }

        GonestFactory.instance.app.use(express.json()); // Force JSON parsing globally
        GonestFactory.instance.app.use(express.urlencoded({ extended: true }));

        if (appModule?.globalPrefix) {
            GonestFactory.instance.setApiGlobalPrefix(appModule.globalPrefix);
        }

        if (appModule?.controllers) {
            const { RegisterControllers } = require("../registerController");
            RegisterControllers(GonestFactory.instance.app, appModule.globalPrefix, appModule.controllers);
        }

        return GonestFactory.instance;
    }
}

const app = GonestFactory.create();

export { GonestFactory, app };