const { execSync, spawnSync } = require("child_process");
const { warn, error, info } = require("simple-output");
const FileGenerator = require("./file-generator");
const { resolve } = require("path");
const { readFileSync } = require("fs");

new (class DeployManager {
  constructor() {
    if (process.env.RANGE) {
      try {
        const typePaths = this.getTypePaths();
        if (typePaths.size) {
          info(`The following types were found: ${[...typePaths].join(", ")}`);
          for (const typePath of typePaths) {
            const outPath = this.getOutPath(typePath);
            this.generateFiles(outPath);
            console.log(execSync(`ls -al ${outPath}`));
            console.log(process.env.NPM_TOKEN);
            console.log(readFileSync(`${outPath}/.npmrc`).toString());
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

  publish(outPath) {
    const spawnProcess = spawnSync("npm", ["publish", outPath], { stdio: "inherit", cwd: outPath });
    if (spawnProcess.error) throw spawnProcess.error;
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
    const files = execSync(`git diff --name-only ${process.env.RANGE}`)
      .toString()
      .split("\n");
    const typeDirs = new Set();
    for (const file of files) {
      if (/^types/.test(file)) {
        typeDirs.add(file.replace(/(?<=types\/.+?)\/.*$/, ""));
      }
    }

    return typeDirs;
  }
})();
