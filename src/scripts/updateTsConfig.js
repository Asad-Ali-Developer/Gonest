const fs = require('fs');
const path = require('path');
const LogMessageJsForApplication = require("../utils/LogMessageJsForApplication.js");

const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

// Required compiler options
const requiredOptions = {
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  strictFunctionTypes: false,
  outDir: "./dist",
  rootDir: "src",
};

// Include and exclude options to be added at the end
const includeExcludeOptions = ` 
"include": ["src/**/*", "src/@types/**/*.d.ts"],
"exclude": ["node_modules"]
`;

/**
 * Updates `tsconfig.json` while preserving comments.
 * - **Uncomments** existing commented-out properties.
 * - **Updates** existing options.
 * - **Adds missing** options.
 * - **Ensures** "include" and "exclude" are at the end.
 */
function updateTsConfig() {
  if (!fs.existsSync(tsConfigPath)) {
    LogMessageJsForApplication("tsconfig.json not found.", "WARN");
    return;
  }

  let content = fs.readFileSync(tsConfigPath, "utf-8");

  Object.entries(requiredOptions).forEach(([key, value]) => {
    const regexCommented = new RegExp(`//\\s*"${key}"\\s*:\\s*[^,\\n]+`, "g");
    const regexExisting = new RegExp(`("${key}"\\s*:\\s*)([^,\\n]+)`, "g");

    if (regexCommented.test(content)) {
      // Uncomment and update value
      content = content.replace(
        regexCommented,
        `"${key}": ${JSON.stringify(value)}`
      );
    } else if (regexExisting.test(content)) {
      // Update existing value
      content = content.replace(regexExisting, `$1${JSON.stringify(value)}`);
    } else {
      // Append missing option inside "compilerOptions"
      content = content.replace(
        /"compilerOptions"\s*:\s*\{([\s\S]*?)\}/,
        `"compilerOptions": {\n$1\n    "${key}": ${JSON.stringify(value)},`
      );
    }
  });

  // Ensure "include" and "exclude" are at the end
  if (!content.includes('"include"') && !content.includes('"exclude"')) {
    content = content.replace(/\}\s*$/, `,\n${includeExcludeOptions}\n}`);
  }

  fs.writeFileSync(tsConfigPath, content, "utf-8");
}

module.exports = { updateTsConfig };
