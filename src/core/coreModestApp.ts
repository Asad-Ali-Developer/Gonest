import express, { Application } from "express";
import logMessage from "../utils/logMessage";

class CoreModestApplication {
    public app: Application;
    private appName: string = "";
    private apiGlobalPrefix: string = ""; // No default value, user must set it

    constructor() {
        this.app = express();
    }

    /**
     * Starts the server on the given port.
     */
    public listeningPort(port: number) {
        this.app.listen(port, () => {
            logMessage(`[${this.appName || "ModestApp"}] Server started on port ${port}`, "LOG");
        });
    }

    /**
     * Sets the application name.
     */
    public setApplicationName(name: string) {
        this.appName = name;
        logMessage(`[${this.appName}] Application successfully started`, "LOG");
    }

    /**
     * Gets the currently applicationName.
     * **Protected**: Only accessible within this class and its subclasses.
     */
    protected getApplicationName(): string {
        return this.appName;
    }

    /**
     * Sets the API global prefix.
     * @param prefix - The prefix to set for all API routes.
     */
    public setApiGlobalPrefix(prefix: string) {
        if (!prefix.startsWith("/")) {
            throw new Error("API global prefix must start with a '/'.");
        }
        this.apiGlobalPrefix = prefix;
    }

    /**
     * Gets the currently set API global prefix.
     * **Protected**: Only accessible within this class and its subclasses.
     */
    protected getApiGlobalPrefix(): string {
        return this.apiGlobalPrefix;
    }
}

export default CoreModestApplication;
