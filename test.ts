import { GonestFactory } from "gonest";

/**
 * Creates an instance of the application using GonestFactory.
 * This function sets up the app with the specified controllers and global prefix.
 *
 * @returns The created app instance.
 */
export function Invest() {
    // Create an app instance using GonestFactory
    const instance = GonestFactory.create({
        controllers: [], // You can add controllers here
        globalPrefix: 'api' // You can modify the global prefix as needed
    });

    // Return the created app instance
    return instance;
}

// Create the app instance and export it directly
export const app = Invest();