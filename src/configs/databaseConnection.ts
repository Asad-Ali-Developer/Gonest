import mongoose from "mongoose";
import { Pool } from "pg";
import logMessage from "../utils/logMessage";

/**
 * Enum to represent the supported database types.
 */
enum DatabaseType {
    MONGODB = "MongoDB",
    POSTGRESQL = "PostgreSQL"
}

class databaseConnection {
    private postgreSQLConnection?: Pool;
    private selectedDatabases: Set<DatabaseType> = new Set();

    constructor() {
        // console.log("🚀 Attempting to connect to the database...");
    }

    /**
     * Connects to a MongoDB database.
     */
    public async connectMongoDB(mongoDB_URI: string) {
        try {
            mongoose.set("strictQuery", false);

            console.log("🚀 Attempting to connect to MongoDB...");

            mongoose.connection.on("connected", () => {
                console.log("✅ [MongoDB] Connection established. Ready for queries!");
            });

            mongoose.connection.on("error", (err) => {
                console.error("❌ [MongoDB] Connection error:", err);
            });

            mongoose.connection.on("disconnected", () => {
                console.warn("⚠️ [MongoDB] Disconnected. Retrying...");
                setTimeout(() => this.connectMongoDB(mongoDB_URI), 5000);
            });

            await mongoose.connect(mongoDB_URI, {
                connectTimeoutMS: 30000,
                socketTimeoutMS: 30000,
                serverSelectionTimeoutMS: 30000,
                maxPoolSize: 50,
                minPoolSize: 10,
                bufferCommands: false, //  Keep this as false for production
                autoIndex: true,
            });

            this.selectedDatabases.add(DatabaseType.MONGODB);
            logMessage(`[${DatabaseType.MONGODB}] Connected successfully!`, "LOG");

            console.log("✅ [MongoDB] Database connection is now open!");

        } catch (error) {
            console.error("❌ Error connecting to MongoDB: ", error);
            process.exit(1); // Exit the process on initial connection failure
        }
    }

    /**
     * Connects to a PostgreSQL database.
     */
    public async connectPostgreSQL(postgresDB_URI: string) {
        try {
            this.postgreSQLConnection = new Pool({ connectionString: postgresDB_URI });
            await this.postgreSQLConnection.connect();
            this.selectedDatabases.add(DatabaseType.POSTGRESQL); // Store selection internally

            logMessage(`[${DatabaseType.POSTGRESQL}] Connected successfully!`, "LOG");

        } catch (error) {
            console.error("Error connecting to PostgreSQL: ", error);
            throw error;
        }
    }

    /**
     * Internal method to retrieve selected databases.
     * ⚠️ This is protected: Only accessible within this class and its subclasses.
     */
    protected getSelectedDatabases(): DatabaseType[] {
        return Array.from(this.selectedDatabases);
    }
}

export { databaseConnection, DatabaseType };
