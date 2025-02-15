import express, { Express } from "express";
import { VitalMiddleware } from "../middlewares";
import { RegisterControllers } from "../registerController";
import { listAllRoutes } from "../utils";
import logMessage from "../utils/logMessage";
import cors, { CorsOptions } from "cors";

interface ControllerClass {
    new(): any;
}

class CoreModestApplication {
    public app: Express;
    private appName: string = "";
    private appPort: number = 0;
    private apiGlobalPrefix: string = "";
    public middleware: VitalMiddleware;
    public use;
    public get;
    public post;
    public put;
    public delete;
    public all;
    public options;
    public head;
    public patch;
    public listenExpress;

    constructor() {
        this.app = express();
        this.middleware = new VitalMiddleware(this.app);
        this.use = this.app.use.bind(this.app);
        this.get = this.app.get.bind(this.app);
        this.post = this.app.post.bind(this.app);
        this.put = this.app.put.bind(this.app);
        this.delete = this.app.delete.bind(this.app);
        this.all = this.app.all.bind(this.app);
        this.options = this.app.options.bind(this.app);
        this.head = this.app.head.bind(this.app);
        this.patch = this.app.patch.bind(this.app);
        this.listenExpress = this.app.listen.bind(this.app);
        this.proxyExpressMethods();
    }

    private proxyExpressMethods() {
        const expressMethods = Object.keys(Object.getPrototypeOf(this.app));

        for (const method of expressMethods) {
            if (
                typeof (this.app as any)[method] === "function" &&
                !(this as any)[method]
            ) {
                (this as any)[method] = (this.app as any)[method].bind(this.app);
            }
        }
    }


    public listen(port: number, cb?: () => void) {
        this.appPort = port;
        this.app.listen(port, () => {
            logMessage(`[${this.appName || "ModestApp"}] Server started on port ${port}`, "LOG");
            if (cb) cb();
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

    public listAllRoutes() {
        if (!this.app._router) {
            console.warn("⚠ No routes registered yet.");
            return;
        }
        listAllRoutes(this.app);
    }

    public registerControllers(...controllers: ControllerClass[]) {
        RegisterControllers(this.app, controllers);
    }

    public enableCors(options?: CorsOptions) {
        const corsDefaultOptions: CorsOptions = {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
        };
        this.app.use(cors(options || corsDefaultOptions));
    }

    public getHttpServer() {
        return this.app;
    }

    public getUrl() {
        if (!this.appPort) {
            throw new Error("Server port is not set. Call `listen()` method first.");
        }
        return process.env.NODE_ENV !== "production"
            ? `http://localhost:${this.appPort}`
            : `https://your-app-name.herokuapp.com`;
    }
}

class ModestFactory {
    private static instance: CoreModestApplication | null = null;

    private constructor() { } // Prevent instantiation

    public static create(appModule?: { controllers: ControllerClass[], globalPrefix?: string }): CoreModestApplication {
        if (!ModestFactory.instance) {
            ModestFactory.instance = new CoreModestApplication();
        }

        if (appModule?.globalPrefix) {
            ModestFactory.instance.setApiGlobalPrefix(appModule.globalPrefix); // ✅ Ensure prefix is set before controllers
        }

        if (appModule?.controllers) {
            ModestFactory.instance.registerControllers(...appModule.controllers);
        }

        return ModestFactory.instance;
    }


    public static getInstance(): CoreModestApplication {
        if (!ModestFactory.instance) {
            throw new Error("ModestFactory has not been initialized. Call `ModestFactory.create()` first.");
        }
        return ModestFactory.instance;
    }
}

const app = ModestFactory.create();

export { CoreModestApplication, ModestFactory, app };
