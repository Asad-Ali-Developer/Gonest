import { databaseConnection } from "./databaseConnection";

class DBSelected extends databaseConnection {
    public determinePrimaryDatabase() {
        const databases = this.getSelectedDatabases(); // ✅ Accessing internally

        if (databases.length === 0) {
            console.log("No database is connected.");
        } else if (databases.length === 1) {
            console.log(`Only one database is connected: ${databases[0]}`);
        } else {
            console.log(`Multiple databases connected: ${databases.join(", ")}`);
        }
    }
}

const dbSelected = new DBSelected();

export { DBSelected, dbSelected };