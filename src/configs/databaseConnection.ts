import mongoose from "mongoose";
import { Pool } from "pg";
import logMessage from "../utils/logMessage";

class databaseConnection {
    private postgreSQLConnection!: Pool; // Non-null assertion

    constructor() {}

    /**
     * Connects to a MongoDB database.
     */
    public async connectMongoDB(mongoDB_URI: string) {
        try {
            const connectionInstance = await mongoose.connect(mongoDB_URI);
            logMessage("[MongoDB] MongoDB connected successfully!", "LOG");

            mongoose.connection.on("disconnected", () => {
                logMessage("[MongoDB] Connection lost. Retrying...", "WARN");
                this.connectMongoDB(mongoDB_URI);
            });

            return connectionInstance;
        } catch (error) {
            console.error("Error connecting to MongoDB: ", error);
            throw error;
        }
    }

    /**
     * Connects to a PostgreSQL database.
     */
    public async connectPostgreSQL(postgresDB_URI: string) {
        this.postgreSQLConnection = new Pool({ connectionString: postgresDB_URI }); // Initialized here
        try {
            const connectionInstance = await this.postgreSQLConnection.connect();
            logMessage("[PostgreSQL] PostgreSQL connected successfully!", "LOG");
            return connectionInstance;
        } catch (error) {
            console.error("Error connecting to PostgreSQL: ", error);
            throw error;
        }
    }
}

export default databaseConnection;
