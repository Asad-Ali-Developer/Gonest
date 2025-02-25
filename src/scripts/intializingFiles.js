const { execSync } = require("./utility-exports");

const InitializingFilesByCommands = (isTypeScript) => {
  if (isTypeScript) {
    try {
      execSync("npx tsc --init", {
        stdio: "inherit",
      });
      console.log("Files Initialized successfully!");
    } catch (error) {
      console.log("Not initializing files ... ", error.message);
    }
  }
};

module.exports = { InitializingFilesByCommands };
