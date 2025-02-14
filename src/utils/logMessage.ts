import { green, white, yellow } from "colorette";
import dayjs from "dayjs";
import { app } from "../core";
import { dbSelected } from "../configs";

// Custom logger function to mimic NestJS-style logs
const logMessage = (message: string, type: string = "LOG") => {
  const databaseName = dbSelected.determinePrimaryDatabase();
  const timestamp = dayjs().format("MM/DD/YYYY, hh:mm:ss A");
  const pid = process.pid; // Process ID for the application

  // Format specific parts of the message
  const formattedTimestamp = white(timestamp); // Timestamp in white
  const formattedPrefix = green(`[${app.getApplicationName()}] ${pid}`); // Prefix in green
  const formattedType = type === "LOG" ? green(type) : yellow(type); // Log type dynamically colored

  // Dynamically generate regex pattern for application name and special keywords
  const highlightPattern = new RegExp(
    `(\\[RouterExplorer\\]|\\[${databaseName} Connected\\]|\\[${app.getApplicationName()}\\])`,
    "g"
  );

  // Apply formatting
  const formattedMessage = message
    .replace(highlightPattern, (match) => yellow(match)) // Highlight keywords in yellow
    .replace(/(Mapped \{.*?\} route)/g, (match) => green(match)); // Keep route mappings green

  // Combine all components
  const finalMessage = `${formattedPrefix} - ${formattedTimestamp} ${formattedType} ${formattedMessage}`;

  // Output the log
  console.log(finalMessage);
};

export default logMessage;
