const esbuild = require('esbuild');
const fs = require('fs');

const ROOT_DIRECTORY = 'code';
const OUTPUT_DIRECTORY = 'dist';
const OUTPUT_CODE_DIRECTORY = `${OUTPUT_DIRECTORY}/${ROOT_DIRECTORY}`;

function findFiles(
  path = ROOT_DIRECTORY,
  htmls = [],
  entries = [],
  extras = []
) {
  let files;

  try {
    files = fs.readdirSync(path, { withFileTypes: true });
  } catch (err) {
    console.error(err);
  }

  files.forEach((file) => {
    if (file.isDirectory()) {
      findFiles(`${path}/${file.name}`, htmls, entries, extras);
    } else {
      if (file.name === 'index.html') {
        htmls.push(`${path}/${file.name}`);
      } else if (file.name === 'index.js') {
        entries.push(`${path}/${file.name}`);
      } else if (file.name === 'base.css') {
        extras.push(`${path}/${file.name}`);
      }
    }
  });

  return {
    htmls,
    entries,
    extras,
  };
}

const files = findFiles();

files.htmls.forEach((htmlFile) => {
  const outputFile = htmlFile.replace(
    `${ROOT_DIRECTORY}/`,
    `${OUTPUT_CODE_DIRECTORY}/`
  );

  fs.mkdirSync(outputFile.replace('/index.html', ''), { recursive: true });
  fs.copyFileSync(htmlFile, outputFile);
});

files.extras.forEach((extraFile) => {
  const outputFile = extraFile.replace(
    `${ROOT_DIRECTORY}/`,
    `${OUTPUT_DIRECTORY}/`
  );

  fs.copyFileSync(extraFile, outputFile);
});

esbuild.buildSync(
  {
    entryPoints: files.entries,
    entryNames: '[dir]/[name]',
    bundle: true,
    outdir: OUTPUT_CODE_DIRECTORY,
  }
);
