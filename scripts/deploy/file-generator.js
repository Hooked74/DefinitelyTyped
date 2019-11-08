const { readFileSync, writeFileSync } = require("fs");
const { resolve, basename, join } = require("path");
const template = require("lodash/template");
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
      fileName: ".npmrc"
    });
  }

  _generate(data) {
    writeFileSync(
      join(this.outPath, data.fileName),
      this._replace(data, readFileSync(resolve(__dirname, `templates/${data.fileName}`)).toString())
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

  _replace(data, content) {
    return template(content, { interpolate: /<%=([\s\S]+?)%>/g })(data);
  }
};
