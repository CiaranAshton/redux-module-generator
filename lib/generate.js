const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const appendFile = promisify(fs.appendFile);
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);

const mod = async ({ name }) =>
    (await readFile(path.join(__dirname, './templates/fetch.txt'), 'utf8'))
        .replace(
            /\<ACTION-ONE\>/g,
            `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
        )
        .replace(/\<ACTION-TWO\>/g, name)
        .replace(/\<ACTION-CAPS\>/g, name.toUpperCase());

module.exports = async ({ name }) => {
    await mkdir(`./${name}`);
    await appendFile(`./${name}/index.js`, await mod({ name }));
};
