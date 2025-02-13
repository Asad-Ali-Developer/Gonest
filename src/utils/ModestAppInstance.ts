import CoreModestApplication from "../core/coreModestApp";

/**
 * ModestAppInstance extends CoreModestApplication to expose
 * protected methods for application-wide usage.
 */
class ModestAppInstance extends CoreModestApplication {
    /**
     * Exposes the application name publicly.
     */
    public getAppName(): string {
        return this.getApplicationName(); // Accessing protected method from parent class
    }

    /**
     * Exposes the API global prefix publicly.
     */
    public getApiGlobalPrefix(): string {
        return this.getApiGlobalPrefix(); // Accessing protected method from parent class
    }
}

// Create a single shared instance to be used across the application
const appInstance = new ModestAppInstance();
export { appInstance, ModestAppInstance };
