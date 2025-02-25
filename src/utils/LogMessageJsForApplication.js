const {
  bgGreen,
  bgYellow,
  bgRed,
  bgBlue,
  bgWhite,
  white,
  bold,
  yellow,
  blue,
} = require("colorette");

/**
 * Custom logger function to mimic NestJS-style logs.
 * @param {string} message - The log message.
 * @param {"LOG" | "START" | "SUCCESS" | "WARN" | "ERROR"} type - The type of log (default: "LOG").
 */
const LogMessageJsForApplication = (message, type = "LOG") => {
  // Background colors for different log types
  const typeBgColors = {
    LOG: bgWhite,
    START: bgBlue,
    SUCCESS: bgGreen,
    WARN: bgYellow,
    ERROR: bgRed,
  };

  // Highlight TypeScript as bold blue and JavaScript as bold yellow
  const formattedMessage = message
    .replace(/TypeScript/g, bold(blue("TypeScript")))
    .replace(/JavaScript/g, bold(yellow("JavaScript")));

  // Format the type badge
  const formattedType = bold(typeBgColors[type](` ${type} `)).trim();

  // Construct the final message with proper styling
  const finalMessage = `${formattedType} ${white(formattedMessage)}`;

  console.log(finalMessage);
};

module.exports = LogMessageJsForApplication;
