const { readFileSync, writeFileSync } = require("fs");
const { resolve, basename, join } = require("path");
const template = require("lodash/template");
const prettier = require("prettier");
const flow = require("lodash/flow");
const { warn, info } = require("simple-output");

module.exports = class FileGenerator {
  constructor(outPath) {
    this.outPath = outPath;
    this.pkg = require(resolve(outPath, "package.json"));
  }

  generateLicense() {
    this._generate({
      author: this.pkg.author,
      fileName: "LICENSE"
    });
  }

  generateReadme() {
    this._generate({
      name: basename(this.pkg.name),
      packageName: this.pkg.name,
      dependencies: this._filterDependencies(this.pkg.dependencies),
      author: this.pkg.author,
      fileName: "README.md"
    });
  }

  generateNpmrc() {
    this._generate({
      token: process.env.TOKEN,
      fileName: ".npmrc"
    });
  }

  _generate(data) {
    writeFileSync(
      join(this.outPath, data.fileName),
      flow(
        this._replace.bind(this, data),
        this._format.bind(this, data.fileName)
      )(readFileSync(resolve(__dirname, `templates/${data.fileName}`)).toString())
    );
    info(`${data.fileName} file created in ${this.outPath}`);
  }

  _filterDependencies(dependencies) {
    return (
      Object.keys(dependencies)
        .filter(dep => /^(@types|@h74-types\/)/.test(dep))
        .join(", ") || "none"
    );
  }

  _format(fileName, content) {
    try {
      return prettier.format(content, { printWidth: 100, filepath: fileName });
    } catch (e) {
      warn(e);
      return content;
    }
  }

  _replace(data, content) {
    return template(content, { interpolate: /<%=([\s\S]+?)%>/g })(data);
  }
};
