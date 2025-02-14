import express, { Application, RequestHandler, json, urlencoded } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser, { CookieParseOptions } from "cookie-parser";

/**
 * VitalMiddleware class provides essential middleware configurations
 * for an Express application, including CORS, JSON parsing, 
 * URL encoding, cookie parsing, and static file serving.
 */
class VitalMiddleware {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    /**
     * Registers a custom middleware function globally.
     * @param middleware The middleware function to be applied.
     * @returns The current instance of `VitalMiddleware` for method chaining.
     */
    public useMiddleware(middleware: RequestHandler): this {
        this.app.use(middleware);
        return this;
    }

    /**
     * Enables CORS (Cross-Origin Resource Sharing) with user-defined or default options.
     * @param options Optional CORS configuration.
     * @returns The current instance of `VitalMiddleware` for method chaining.
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
     * Enables JSON body parsing for incoming requests.
     * @returns The current instance of `VitalMiddleware` for method chaining.
     */
    public jsonParser(): this {
        this.app.use(json());
        return this;
    }

    /**
     * Enables cookie parsing middleware to parse incoming cookies.
     * @param secret Optional secret string or array of secrets for signed cookies.
     * @param options Optional configuration for cookie parsing.
     * @returns The current instance of `VitalMiddleware` for method chaining.
     */
    public cookieParser(secret?: string | string[], options?: CookieParseOptions): this {
        this.app.use(cookieParser(secret, options));
        return this;
    }

    /**
     * Enables URL-encoded body parsing for incoming requests.
     * @param options Optional configuration for URL-encoded body parsing.
     * @returns The current instance of `VitalMiddleware` for method chaining.
     */
    public urlEncodedParser(options?: { extended: boolean }): this {
        this.app.use(urlencoded(options || { extended: true }));
        return this;
    }

    /**
     * Serves static files from the specified folder.
     * @param folder The directory path to serve static files from.
     * @returns The current instance of `VitalMiddleware` for method chaining.
     */
    public setStaticFolder(folder: string): this {
        this.app.use(express.static(folder));
        return this;
    }
}

export default VitalMiddleware;
