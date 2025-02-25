const { execSync } = require("./utility-exports");

const InstallDevDependencies = (isTypeScript) => {
  try {
    if (isTypeScript) {
      console.log("Installing depedencies...");
      execSync(
        "npm install express dotenv typescript && npm install -D ts-node-dev @types/typescript @types/node @types/express",
        {
          stdio: "inherit",
        }
      );
    } else {
      execSync("npm install express dotenv && npm install -D nodemon", {
        stdio: "inherit",
      });
    }
    console.log("Dependencies installed successfully!");
  } catch (error) {
    console.error(`Failed to install ts-node-dev: ${error.message}`);
  }
};

module.exports = { InstallDevDependencies };
