import { blue, bold, green, magenta, red, white, yellow } from "colorette";
import dayjs from "dayjs";
import { app } from "../core"; // Ensure app is correctly initialized

/**
 * Custom logger function to mimic NestJS-style logs.
 * Supports timestamps, process IDs, application name, and dynamic highlighting.
 *
 * @param message - The log message.
 * @param type - The type of log (default: "LOG").
 */
const LoggerMessage = (
  message: string,
  type: "LOG" | "START" | "SUCCESS" | "WARN" | "ERROR" | "DATABASE" = "LOG"
): void => {
  const timestamp = dayjs().format("MM/DD/YYYY, hh:mm:ss A");
  const pid = process.pid; // Process ID for tracking

  // Define color mappings for different log types
  const typeColors: Record<string, (text: string) => string> = {
    LOG: white,
    START: blue,
    SUCCESS: green,
    WARN: yellow,
    ERROR: red,
    DATABASE: magenta, // Use magenta for database-related logs
  };

  // Format components of the log
  const formattedTimestamp = white(timestamp);
  const formattedPrefix = green(`[${app.getApplicationName()}] ${pid}`);
  const formattedType = typeColors[type]?.(`${type}`) || white(`${type}`);

  // Highlight important patterns dynamically
  const formattedMessage = message
    .replace(/\bTypeScript\b/g, (match) => bold(blue(match)))
    .replace(/\bJavaScript\b/g, (match) => bold(yellow(match)))
    .replace(/\b(MongoDB|PostgreSQL|MySQL|SQLite|Redis)\b/g, (match) =>
      yellow(match)
    ) // Highlight database names
    .replace(/\b(Mapped \{.*?\} route)\b/g, (match) => green(match)) // Highlight route mappings in green
    .replace(/\b(Error:.*)\b/g, (match) => red(match)); // Highlight errors in red

  // Construct the final log message
  const finalMessage = `${formattedPrefix} - ${formattedTimestamp} ${formattedType} ${formattedMessage}`;

  console.log(finalMessage);
};

export { LoggerMessage };
