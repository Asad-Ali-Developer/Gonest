import { green, white, yellow } from "colorette";
import dayjs from "dayjs";
import { applicationLogs } from "./logs";

const applicationName = applicationLogs.getApplicationName();
const databaseName = applicationLogs.getApplicationName();

// Custom logger function to mimic NestJS-style logs
const logMessage = (message: string, type: string = "LOG") => {
  const timestamp = dayjs().format("MM/DD/YYYY, hh:mm:ss A");
  const pid = process.pid; // Process ID for the application

  // Format specific parts of the message
  const formattedTimestamp = white(timestamp); // Timestamp in white
  const formattedPrefix = green(`[${applicationName}] ${pid}`); // Prefix in green
  const formattedType = type === "LOG" ? green(type) : yellow(type); // Log type dynamically colored

  // Dynamically generate regex pattern for application name and special keywords
  const highlightPattern = new RegExp(
    `(\\[RouterExplorer\\]|\\[${databaseName} Connected\\]|\\[${applicationName}\\])`,
    "g"
  );

  // Apply formatting
  const formattedMessage = message
    .replace(highlightPattern, (match) => yellow(match)) // Highlight keywords in yellow
    .replace(/(Mapped \{.*?\} route)/g, (match) => green(match)); // Keep route mappings green

  // Combine all components
  const finalMessage = `${formattedPrefix}  -  ${formattedTimestamp}   ${formattedType} ${formattedMessage}`;

  // Output the log
  console.log(finalMessage);
};

if (databaseName) {
  logMessage(`[${[databaseName]} Connected] ${databaseName} connected successfully!`, "LOG");
}

if (applicationName) {
  logMessage(`[${applicationName}] Production-Grade App successfully started`);
}


export default logMessage;
