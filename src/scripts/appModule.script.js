const { fs, path } = require("./utility-exports");
const {
  moduleContentForJs,
  moduleContentForTs,
} = require("./contents/moduleContent.js");
const {
  controllerContentForJs,
  controllerContentForTs,
} = require("./contents/controllerContent.js");

/**
 * Creates `src/appModule.ts` or `src/appModule.js` in the correct project directory.
 */
const createAppModule = (isTypeScript) => {
  const fileExtension = isTypeScript ? ".ts" : ".js";
  const srcPath = path.resolve(process.cwd(), "src");

  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath, { recursive: true });
    console.info("Created 'src/' root directory.");
  }

  const appModulePath = path.join(srcPath, `appModule${fileExtension}`);

  if (fs.existsSync(appModulePath)) {
    console.warn(`⚠️ ${appModulePath} already exists.`);
    return;
  }

  const moduleContentPrebuilt = isTypeScript
    ? moduleContentForTs
    : moduleContentForJs;

  try {
    fs.writeFileSync(appModulePath, moduleContentPrebuilt.trim(), "utf-8");
  } catch (error) {
    console.error(`Failed to create appModule file: ${error.message}`);
  }
};

/**
 * Creates `src/controllers/demo.controller.ts` or `src/controllers/demo.controller.js`.
 */
const createDemoController = (isTypeScript) => {
  const fileExtension = isTypeScript ? ".ts" : ".js";
  const srcPath = path.resolve(process.cwd(), "src");

  const controllersPath = path.join(srcPath, "controllers");

  if (!fs.existsSync(controllersPath)) {
    fs.mkdirSync(controllersPath, { recursive: true });
  }

  const controllerPath = path.join(
    controllersPath,
    `demo.controller${fileExtension}`
  );

  if (fs.existsSync(controllerPath)) {
    console.warn(`⚠️ ${controllerPath} already exists.`);
    return;
  }

  const controllerContent = isTypeScript
    ? controllerContentForTs
    : controllerContentForJs;

  try {
    fs.writeFileSync(controllerPath, controllerContent.trim(), "utf-8");
  } catch (error) {
    console.error(`Failed to create DemoController: ${error.message}`);
  }
};

module.exports = { createAppModule, createDemoController };
