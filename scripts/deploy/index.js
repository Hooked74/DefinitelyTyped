const { execSync } = require("child_process");
const { warn, error, info } = require("simple-output");
const FileGenerator = require("./file-generator");
const { resolve } = require("path");
const { readFileSync } = require("fs");
const testTypes = require("../test");

new (class DeployManager {
  constructor() {
    if (process.env.RANGE) {
      try {
        const typePaths = this.getTypePaths();
        if (typePaths.size) {
          info(`The following types were found: ${[...typePaths].join(", ")}`);
          for (const typePath of typePaths) {
            const outPath = this.getOutPath(typePath);
            this.installDependencies(outPath);
            testTypes(outPath, false);
            this.generateFiles(outPath);
            this.publish(outPath);
          }
        } else {
          info("Types not found");
        }
      } catch (e) {
        error(e.stack);
        process.exit(1);
      }
    } else {
      warn("Failed to get the list of commits for further deployment");
    }
  }

  installDependencies(outPath) {
    execSync(`cd ${outPath} && npm install`, { stdio: "inherit", cwd: outPath });
  }

  publish(outPath) {
    execSync(`npm publish ${outPath}`, { stdio: "inherit", cwd: outPath });
  }

  generateFiles(outPath) {
    const fileGenerator = new FileGenerator(outPath);

    fileGenerator.generateLicense();
    fileGenerator.generateReadme();
    fileGenerator.generateNpmrc();
  }

  getOutPath(typePath) {
    return resolve(process.cwd(), typePath);
  }

  getTypePaths() {
    const files = execSync(`git diff --name-status ${process.env.RANGE}`)
      .toString()
      .split("\n");
    const typeDirs = new Set();
    for (const file of files) {
      if (file[0] !== "D" && /^\w\ttypes/.test(file)) {
        typeDirs.add(file.slice(2).replace(/(?<=types\/.+?)\/.*$/, ""));
      }
    }

    return typeDirs;
  }
})();
