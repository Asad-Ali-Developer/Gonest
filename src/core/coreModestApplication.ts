import express, { Express } from "express";
import { VitalMiddleware } from "../middlewares";
import { RegisterControllers } from "../registerController";
import { listAllRoutes } from "../utils";  // Ensure you have a utility function to list routes
import { databaseConnection } from "../configs";
import logMessage from "../utils/logMessage";

interface ControllerClass {
    new(): any;
}

class CoreModestApplication {
    public app: Express;
    private appName: string = "";
    private apiGlobalPrefix: string = "";
    public middleware: VitalMiddleware;
    public database: databaseConnection;

    constructor(app: Express) {
        this.app = app;
        this.middleware = new VitalMiddleware(this.app);
        this.database = new databaseConnection();
    }

    public listeningPort(port: number) {
        this.app.listen(port, () => {
            logMessage(`[${this.appName || "ModestApp"}] Server started on port ${port}`, "LOG");
        });
    }

    public setApiGlobalPrefix(prefix: string) {
        if (prefix.startsWith("/")) {
            throw new Error("API global prefix must not start with a '/'");
        }
        this.apiGlobalPrefix = prefix;
    }

    public getApiGlobalPrefix(): string {
        return this.apiGlobalPrefix;
    }

    public setApplicationName(name: string) {
        this.appName = name;
        logMessage(`[${this.appName}] Application successfully started`, "LOG");
    }

    public getApplicationName(): string {
        return this.appName;
    }

    public listAllRoute() {
        if (!this.app?._router) {
            console.warn("⚠ No routes registered yet.");
            return;
        }
        listAllRoutes(this.app);
    }

    public registerControllers(...controllers: ControllerClass[]) {
        RegisterControllers(this.app, controllers);
    }
}

class ModestFactory {
    private static instance: CoreModestApplication | null = null;

    public static create(app: Express): CoreModestApplication {
        if (!ModestFactory.instance) {
            ModestFactory.instance = new CoreModestApplication(app);
        }
        return ModestFactory.instance;
    }

    public static getInstance(): CoreModestApplication {
        if (!ModestFactory.instance) {
            ModestFactory.instance = new CoreModestApplication(express());
        }
        return ModestFactory.instance;
    }
}

const app = ModestFactory.getInstance();
export { CoreModestApplication, ModestFactory, app };
