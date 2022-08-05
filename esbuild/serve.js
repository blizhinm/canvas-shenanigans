const fs = require('fs');

const DIRECTORY_REGEX = /\d{1,}-\w+/;
const ROOT_DIRECTORY = 'code';
const OUTPUT_FOLDER = 'dist';
const BASE_CSS_FILENAME = 'base.css';

const entryPoints = [];
let fileNames;

try {
  fileNames = fs.readdirSync(ROOT_DIRECTORY);
} catch (err) {
  console.error(err);
  return;
}

fileNames.forEach((fileName) => {
  const dirName = `${ROOT_DIRECTORY}/${fileName}`;
  const isDir = fs.lstatSync(dirName).isDirectory();

  if (isDir && DIRECTORY_REGEX.test(fileName)) {
    const outputPath = `${OUTPUT_FOLDER}/${fileName}`;

    fs.mkdirSync(outputPath, { recursive: true });
    fs.copyFileSync(
      `${dirName}/index.html`,
      `${OUTPUT_FOLDER}/${fileName}/index.html`
    );

    entryPoints.push(`${dirName}/index.js`);
  }

  if (!isDir && fileName === BASE_CSS_FILENAME) {
    fs.copyFileSync(
      `${ROOT_DIRECTORY}/${BASE_CSS_FILENAME}`,
      `${OUTPUT_FOLDER}/${BASE_CSS_FILENAME}`
    );
  }
});

const esbuild = require('esbuild');

esbuild.serve(
  {
    port: 8810,
    servedir: 'dist',
  },
  {
    entryPoints,
    entryNames: '[dir]/[name]',
    bundle: true,
    outdir: 'dist',
  }
);
