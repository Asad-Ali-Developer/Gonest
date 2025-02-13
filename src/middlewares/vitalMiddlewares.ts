import express, { Application, RequestHandler } from "express";
import cors, { CorsOptions } from "cors";

class VitalMiddleware {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    /**
     * Registers a custom middleware function.
     */
    public useMiddleware(middleware: RequestHandler): this {
        this.app.use(middleware);
        return this;
    }

    /**
     * Enables CORS with user-defined or default options.
     */
    public cors(options?: CorsOptions): this {
        const defaultOptions: CorsOptions = {
            origin: "*",
            credentials: true,
            methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        };

        this.app.use(cors(options || defaultOptions));
        return this;
    }

    /**
     * Enables JSON body parsing.
     */
    public jsonParser(): this {
        this.app.use(express.json());
        return this;
    }

    /**
     * Enables URL-encoded body parsing.
     */
    public urlEncodedParser(): this {
        this.app.use(express.urlencoded({ extended: true }));
        return this;
    }

    /**
     * Sets a static folder for serving public assets.
     */
    public setStaticFolder(folder: string): this {
        this.app.use(express.static(folder));
        return this;
    }
}

export default VitalMiddleware;
