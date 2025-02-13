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

    constructor() { }

    /**
     * Connects to a MongoDB database.
     */
    public async connectMongoDB(mongoDB_URI: string) {
        try {
            await mongoose.connect(mongoDB_URI);
            this.selectedDatabases.add(DatabaseType.MONGODB); // Store selection internally

            logMessage(`[${DatabaseType.MONGODB}] Connected successfully!`, "LOG");

            mongoose.connection.on("disconnected", () => {
                logMessage(`[${DatabaseType.MONGODB}] Connection lost. Retrying...`, "WARN");
                this.connectMongoDB(mongoDB_URI);
            });

        } catch (error) {
            console.error("Error connecting to MongoDB: ", error);
            throw error;
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

export {databaseConnection, DatabaseType };
