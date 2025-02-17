import cookieParser, { CookieParseOptions } from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express, { Express, json, urlencoded } from "express";
import { Server as HttpServer, createServer } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import { listAllRoutes } from "../utils";
import logMessage from "../utils/logMessage";

interface ControllerClass {
    new(): any;
}

class CoreGonestApplication {
    public app: Express;
    private appName: string = "";
    private appPort: number = 0;
    private apiGlobalPrefix: string = "";
    private httpServer: HttpServer | null = null;
    private io: SocketIOServer | null = null;
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
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(cookieParser());
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

    /**
    * Proxies all Express methods to allow direct method calls on the class instance.
    */
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

    /**
     * Starts the Express server on the given port.
     * @param port The port number to listen on.
     * @param cb Optional callback function to execute after the server starts.
     */
    public listen(port: number, cb?: () => void): void {
        this.appPort = port;
        this.app.listen(port, () => {
            logMessage(`[${this.appName || "GonestApp"}] Server started on port ${port}`, "LOG", port);
            if (cb) cb();
        });
    }

    /**
     * Sets a global prefix for all API routes.
     * @param prefix The API prefix (should not start with '/').
     */
    public setApiGlobalPrefix(prefix: string): void {
        if (prefix.startsWith("/")) {
            logMessage("API global prefix must not start with a '/'", "ERROR")
        }
        this.apiGlobalPrefix = prefix;
    }

    /**
     * Retrieves the current API global prefix.
     */
    public getApiGlobalPrefix(): string {
        return this.apiGlobalPrefix;
    }

    /**
     * Sets the application name.
     * @param name The name of the application.
     */
    public setApplicationName(name: string): void {
        this.appName = name;
        logMessage(`[${this.appName}] Application successfully started`, "START");
    }


    /**
     * Retrieves the application name.
     */
    public getApplicationName(): string {
        return this.appName;
    }

    /**
     * Lists all registered routes in the application.
     */
    public listAllRoutes(): void {
        if (!this.app._router) {
            logMessage("No routes registered", "ROUTE");
            return;
        }
        listAllRoutes(this.app);
    }

    /**
     * Enables CORS (Cross-Origin Resource Sharing) with user-defined or default options.
     * @param options Optional CORS configuration.
     */
    public enableCors(options?: CorsOptions): void {
        const corsDefaultOptions: CorsOptions = {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"]
        };
        this.app.use(cors(options || corsDefaultOptions));
    }

    /**
      * Configures and enables JSON parsing middleware for incoming requests.
      * @param options Optional configuration for the JSON parsing middleware.
      * @returns The current instance of `CoreGonestApplication` for method chaining.
      */
    public enableJsonParsing(options?: { limit?: string; strict?: boolean; type?: string }): this {
        this.app.use(json(options));
        return this;  // Enables method chaining
    }

    /**
      * Configures and enables cookie parsing middleware.
      * @param secret Optional secret key(s) for signing cookies.
      * @param options Additional cookie parsing options.
      * @returns The current instance of `CoreGonestApplication` for method chaining.
      */
    public enableCookieParser(secret?: string | string[], options?: CookieParseOptions): this {
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

    /**
     * Retrieves or creates the HTTP server instance.
     */
    public getHttpServer(): HttpServer {
        if (!this.httpServer) {
            this.httpServer = createServer(this.app);
        }
        return this.httpServer;
    }

    /**
    * Initializes a WebSocket server and attaches it to the HTTP server.
    * @param corsOptions CORS configuration for the WebSocket server.
    * @param eventHandlers Optional function to handle WebSocket events.
    */
    public connectSocket<T extends Record<string, (...args: any[]) => void>>(
        corsOptions: CorsOptions,
        eventHandlers?: (socket: Socket<T>) => void
    ): SocketIOServer {
        const server: HttpServer = this.getHttpServer(); // Ensure we get the Express HTTP server

        if (!this.io) {
            this.io = new SocketIOServer<T>(server, { cors: corsOptions });

            this.io.on("connection", (clientSocket: Socket<T>) => {
                logMessage(`🔌 Client connected: ${clientSocket.id}`, "SUCCESS")

                // Register event handlers if provided
                if (eventHandlers) {
                    eventHandlers(clientSocket);
                }

                clientSocket.on("disconnect", () => {
                    console.log(`❌ Client disconnected: ${clientSocket.id}`);
                });
            });

            logMessage("✅ WebSocket server initialized", "SUCCESS");
        }

        return this.io;
    }

    public getUrl(): string {
        if (!this.appPort) {
            throw new Error("Server port is not set. Call `listen()` method first.");
        }
        return process.env.NODE_ENV !== "production"
            ? `http://localhost:${this.appPort}`
            : `https://your-app-name.herokuapp.com`;
    }
}

export { CoreGonestApplication };
