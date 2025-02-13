import { coreModestApplication } from "../core";
import { VitalMiddleware } from "../middlewares";
import { databaseConnection } from "../configs";

// Create main application instance
class ModestApp extends coreModestApplication {
    public middleware: VitalMiddleware;
    public database: databaseConnection;

    constructor() {
        super(); // Calls ModestApplication constructor
        this.middleware = new VitalMiddleware(this.app);
        this.database = new databaseConnection();
    }
}

// Create a single instance
const app = new ModestApp();

export { app };
