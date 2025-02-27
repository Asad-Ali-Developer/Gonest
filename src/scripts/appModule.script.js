const fs = require("fs");
const path = require("path");
const {
  moduleContentForJs,
  moduleContentForTs,
} = require("./contents/moduleContent.js");
const {
  controllerContentForJs,
  controllerContentForTs,
} = require("./contents/controllerContent.js");
const LogMessageJsForApplication = require("../utils/LogMessageJsForApplication.js");
const {
  serviceContentForJs,
  serviceContentForTs,
} = require("./contents/serviceContent.js");

/**
 * Creates `src/appModule.module.ts` or `src/appModule.module.js` in the correct project directory.
 */
const createAppModule = (isTypeScript) => {
  const fileExtension = isTypeScript ? ".ts" : ".js";
  const srcPath = path.resolve(process.cwd(), "src");

  if (!fs.existsSync(srcPath)) {
    fs.mkdirSync(srcPath, { recursive: true });
    LogMessageJsForApplication("Created'src/' root directory.", "SUCCESS");
  }

  const appModulePath = path.join(srcPath, `appModule.module${fileExtension}`);

  if (fs.existsSync(appModulePath)) {
    LogMessageJsForApplication(`${appModulePath} already exists.`, "WARN");
    return;
  }

  const moduleContentPrebuilt = isTypeScript
    ? moduleContentForTs
    : moduleContentForJs;

  try {
    fs.writeFileSync(appModulePath, moduleContentPrebuilt.trim(), "utf-8");
  } catch (error) {
    LogMessageJsForApplication(
      `Failed to create appModule file: ${error.message}`,
      "ERROR"
    );
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
    LogMessageJsForApplication(`${controllerPath} already exists.`, "WARN");
    return;
  }

  const controllerContent = isTypeScript
    ? controllerContentForTs
    : controllerContentForJs;

  try {
    fs.writeFileSync(controllerPath, controllerContent.trim(), "utf-8");
  } catch (error) {
    LogMessageJsForApplication(
      `Failed to create DemoController file: ${error.message}`,
      "ERROR"
    );
  }
};

/**
 * Creates `src/services/demo.service.ts` or `src/services/demo.service.js`.
 */
const createDemoService = (isTypeScript) => {
  const fileExtension = isTypeScript ? ".ts" : ".js";
  const srcPath = path.resolve(process.cwd(), "src");

  const servicesPath = path.join(srcPath, "services");

  if (!fs.existsSync(servicesPath)) {
    fs.mkdirSync(servicesPath, { recursive: true });
  }

  const servicePath = path.join(servicesPath, `demo.service${fileExtension}`);

  if (fs.existsSync(servicePath)) {
    LogMessageJsForApplication(`${servicePath} already exists.`, "WARN");
    return;
  }

  const serviceContent = isTypeScript
    ? serviceContentForTs
    : serviceContentForJs;

  try {
    fs.writeFileSync(servicePath, serviceContent.trim(), "");
  } catch (error) {
    LogMessageJsForApplication(
      `Failed to create DemoService file: ${error.message}`,
      "ERROR"
    );
  }
};

module.exports = { createAppModule, createDemoController, createDemoService };
