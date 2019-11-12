const { resolve } = require("path");
const { spawnSync, execSync } = require("child_process");
const { error, success } = require("simple-output");
const rootPath = process.cwd();

function checkThatCallCameFromTypes() {
  return /types\/\w+$/.test(rootPath);
}

(function main() {
  if (checkThatCallCameFromTypes()) test(rootPath);
})();

function test(path, useErrorHandler = true) {
  if (useErrorHandler) {
    try {
      lintTask(path);
      compileTask(path);
    } catch (e) {
      error("An error occurred while testing:");
      error(e);
      process.exit(1);
    }
  } else {
    lintTask(path);
    compileTask(path);
  }
}

function lintTask(path) {
  const tsConfigPath = resolve(path, "tsconfig.json");
  const tsLintPath = resolve(path, "tslint.json");
  const tslint = resolve(__dirname, "../node_modules/.bin/tslint");

  execSync(`${tslint} --fix -p ${tsConfigPath} -c ${tsLintPath}`, {
    cwd: path,
    stdio: "inherit"
  });
  success("Lint test was successful");
}

function compileTask(path) {
  const tsConfigPath = resolve(path, "tsconfig.json");
  const tsc = resolve(__dirname, "../node_modules/.bin/tsc");

  execSync(`${tsc} -p ${tsConfigPath}`, { cwd: path, stdio: "inherit" });
  success("Compile test was successful");
}

module.exports = test;
