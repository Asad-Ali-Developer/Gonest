const os = require("os");
const { execSync } = require("child_process");

try {
  if (os.platform() === "win32") {
    execSync("cls", { stdio: "inherit" });
  } else {
    execSync("clear", { stdio: "inherit" });
  }
} catch (error) {
  console.error("Failed to clear terminal:", error);
}
