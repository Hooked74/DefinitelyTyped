const { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } = require("fs");
const { resolve, join } = require("path");
const { promptInput } = require("@hooked74/prompt");
const template = require("lodash/template");

const typesPath = resolve(process.cwd(), "types");
const types = getFolders(typesPath);

function getFolders(dir) {
  return readdirSync(dir).filter(file => statSync(join(dir, file)).isDirectory());
}

(async function main() {
  const package = await getPackage();
  const author = await getAuthor();
  const templatePath = resolve(process.cwd(), "scripts/create/template");
  const outPath = resolve(typesPath, package);
  const files = readdirSync(templatePath).map(fileName => ({
    path: resolve(templatePath, fileName),
    name: /test\.ts/.test(fileName) ? `${package}.${fileName}` : fileName
  }));

  mkdirSync(outPath);

  for (const file of files) {
    writeFileSync(
      resolve(outPath, file.name),
      template(readFileSync(file.path).toString())({ package, author })
    );
  }
})();

function getPackage() {
  return promptInput("Enter package name:", {
    validate: input => !!input && !types.includes(input)
  });
}

function getAuthor() {
  return promptInput("Enter package author:");
}
