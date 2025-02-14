import { databaseConnection } from "./databaseConnection";

class DBSelected extends databaseConnection {
    public determinePrimaryDatabase() {
        const databases = this.getSelectedDatabases();

        if (databases.length === 1) {
            console.log(`Only one database is connected: ${databases[0]}`);
        }
    }
}

const dbSelected = new DBSelected();

export { DBSelected, dbSelected };
