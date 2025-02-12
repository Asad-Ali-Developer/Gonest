class ApplicationLogs {

    private applicationName: string = ""
    private databaseName: string = ""

    // Name of the Application
    public setApplicationName(name: string) {
        this.applicationName = name;
    }

    // Get the Application Name
    public getApplicationName() {
        return this.applicationName;
    }

    // Set the Database Name

    public setDatabaseName(name: string) {
        this.databaseName = name;
    }

    // Get the Database Name
    public getDatabaseName() {
        return this.databaseName;
    }
}

export const applicationLogs = new ApplicationLogs();