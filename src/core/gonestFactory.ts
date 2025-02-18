import { CoreGonestApplication } from "./coreGonestApplication";

interface ControllerClass {
    new(): any;
}

/**
 * Factory class responsible for creating and managing a singleton instance of `CoreGonestApplication`.
 * This ensures a single instance of the application is used across the system.
 */
class GonestFactory {
    private static instance: CoreGonestApplication | null = null;

    /**
     * Private constructor to prevent direct instantiation.
     */
    private constructor() { }

    /**
     * Creates or retrieves the singleton instance of `CoreGonestApplication`.
     * It also configures global middleware, API prefix, and registers controllers.
     *
     * @param appModule Optional configuration object containing controllers and a global prefix.
     * @param appModule.controllers An array of controller classes to register.
     * @param appModule.globalPrefix A string representing the global API prefix.
     * @returns The singleton instance of `CoreGonestApplication`.
     */
    public static create(appModule?: { controllers: ControllerClass[], globalPrefix?: string }): CoreGonestApplication {
        if (!GonestFactory.instance) {
            GonestFactory.instance = new CoreGonestApplication();
        }

        // Apply global API prefix if provided
        if (appModule?.globalPrefix) {
            GonestFactory.instance.setApiGlobalPrefix(appModule.globalPrefix);
        }

        // Register controllers if provided
        if (appModule?.controllers) {
            const { RegisterControllers } = require("../utils/registerController");
            RegisterControllers(GonestFactory.instance.app, appModule.globalPrefix, appModule.controllers);
        }

        return GonestFactory.instance;  // Return the singleton instance
    }
}

// Create a singleton instance of the application
const app = GonestFactory.create();

export { app, GonestFactory };
