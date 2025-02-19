import "reflect-metadata";
import { green, yellow, red, cyan, white, magenta, blue } from "colorette";
import dayjs from "dayjs";
import { app } from "../core"; // Assuming app is correctly initialized in your project

// Custom logger function to mimic NestJS-style logs
const logMessage = (
  message: string,
  type: "LOG" | "START" | "SUCCESS" | "ROUTE" | "WARN" | "ERROR" | "DATABASE" = "LOG",
  port?: number
) => {
  const timestamp = dayjs().format("MM/DD/YYYY, hh:mm:ss A");
  const pid = process.pid; // Process ID for the application

  // Color coding for different log types
  const typeColors = {
    LOG: white,
    START: blue,
    SUCCESS: green,
    ROUTE: cyan,
    WARN: yellow,
    ERROR: red,
    DATABASE: magenta, // Color for DATABASE logs (magenta)
  };

  // Format log components
  const formattedTimestamp = white(timestamp);
  const formattedPrefix = green(`[${app.getApplicationName()}] ${pid}`);
  const formattedType = typeColors[type](type); // Apply respective color

  // Highlight important patterns dynamically
  const highlightPattern = new RegExp(
    `(\\[RouterExplorer\\]|\\[${app.getApplicationName()}\\])`,
    "g"
  );

  const formattedMessage = message
    .replace(highlightPattern, (match) => yellow(match)) // Highlight keywords in yellow
    .replace(/(Mapped \{.*?\} route)/g, (match) => green(match)) // Route mappings in green
    .replace(/(Error:.*)/g, (match) => red(match)) // Errors in red
    .replace(/(MongoDB|PostgreSQL|MySQL)/g, (match) => yellow(match)) // Highlight database names in cyan
    .replace(/(`${port}`)/g, (match) => cyan(match)); // Highlight "port" occurrences in cyan

  // Final log message with port information if applicable
  const finalMessage = `${formattedPrefix} - ${formattedTimestamp} ${formattedType} ${formattedMessage}`;

  console.log(finalMessage);
};

export default logMessage;
