import express, { Application } from "express";
import logMessage from "../utils/logMessage";

class coreModestApplication {
    public app: Application;
    private appName: string = "";

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
     * Gets the application name.
     */
    public getApplicationName(): string {
        return this.appName;
    }
}

export default coreModestApplication;
