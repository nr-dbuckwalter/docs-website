const mdx = require('@mdx-js/mdx');
const fs = require('fs');
const glob = require('glob');

const readFile = async (filePath) => {
  try {
    console.log(`reading ${filePath}`);
    const mdxText = fs.readFileSync(filePath, 'utf8');
    const jsx = mdx.sync(mdxText);
  } catch (exception) {
    console.log(JSON.stringify(exception, null, 4));
    return filePath;
  }
};

const main = async () => {
  let filePaths = process.argv.slice(2);

  if (filePaths.length === 0) {
    // if user did not supply paths, default to all
    filePaths = glob.sync(
      `${__dirname}/../src{/content/**/*.mdx,/i18n/content/**/*.mdx}`
    );
  }

  const allResults = await Promise.all(filePaths.map((f) => readFile(f)));
  const results = allResults.filter(Boolean);

  console.log(results);
  console.log(`Failed file count: ${results.length}`);
};

main();
