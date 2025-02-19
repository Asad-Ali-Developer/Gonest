// import "reflect-metadata";
// import { Sequelize } from "sequelize";
// import mongoose from "mongoose";
// import logMessage from "./logMessage"; // Your logger function

// // Define an interface for the database metadata
// interface DatabaseMetadata {
//     dbName: string;
//     type: string;
//     timestamp: Date;
// }

// // Store connected database names in an array (global)
// const databases: string[] = [];

// // Flags to indicate whether the app is using a particular DB
// let isUsingPostgres = true; // Example: Set this based on app's configuration
// let isUsingMongoDB = true;

// // Store database metadata globally using Reflect
// const storeDatabaseMetadata = (dbName: string, type: string) => {
//     const existingDBs = Reflect.getMetadata("databases", globalThis) || [];

//     if (!existingDBs.some((db: DatabaseMetadata) => db.dbName === dbName)) {
//         existingDBs.push({ dbName, type, timestamp: new Date() });
//         Reflect.defineMetadata("databases", existingDBs, globalThis);
//     }
// };

// // Log connected databases
// const logConnectedDatabases = () => {
//     const connectedDatabases: DatabaseMetadata[] = Reflect.getMetadata("databases", globalThis) || [];
//     const dbNames = connectedDatabases.map((db: DatabaseMetadata) => db.type);

//     const dbConnected = connectedDatabases.length > 0 ? connectedDatabases.length : 0;

//     // Log if any database is connected
//     if (dbConnected > 1) {
//         logMessage(`Detected ${dbConnected} connected databases: ${dbNames.join(", ")}`, "DATABASE")
//     } else if (dbConnected === 1) {
//         connectedDatabases.forEach((db) => {
//             logMessage(`[${db.type}] database connected`, "DATABASE");
//         });
//     }

// };

// // MongoDB connection listener
// const listenMongoDBConnection = (uri: string, dbName: string) => {
//     if (!isUsingMongoDB) return;

//     if (databases.includes("MongoDB")) {
//         return; // MongoDB connection already established
//     }

//     mongoose.connect(uri)
//         .then(() => {
//             storeDatabaseMetadata(dbName, "MongoDB");
//             logConnectedDatabases(); // Log all connected DBs
//             databases.push("MongoDB");
//         })
//         .catch(() => {
//             // Just return without doing anything
//             return;
//         });
// };

// // PostgreSQL connection listener
// const listenPostgresConnection = (connectionString: string, dbName: string) => {
//     if (!isUsingPostgres) return;

//     if (databases.includes("PostgreSQL")) {
//         return; // PostgreSQL connection already established
//     }

//     const sequelize = new Sequelize(connectionString);

//     sequelize.authenticate()
//         .then(() => {
//             storeDatabaseMetadata(dbName, "PostgreSQL");
//             logConnectedDatabases(); // Log all connected DBs
//             databases.push("PostgreSQL");
//         })
//         .catch(() => {
//             // Just return without doing anything
//             return;
//         });
// };

// // Auto-detect and log database connections (Here you should only connect to databases the app is using)
// const autoDetectAndLogDatabaseConnections = () => {
//     if (isUsingMongoDB) {
//         listenMongoDBConnection("mongodb://localhost:27017/mydb", "myMongoDB");
//     }

//     if (isUsingPostgres) {
//         listenPostgresConnection("postgres://user:pass@localhost:5432/mydb", "myPostgresDB");
//     }
// };

// // Automatically detect and log database connections
// autoDetectAndLogDatabaseConnections();

// // Log the connected databases after attempting connection
// logConnectedDatabases();

// export { logConnectedDatabases };
