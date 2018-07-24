const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { includes } = require('lodash');
const appendFile = promisify(fs.appendFile);
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);

const addFetch = require('./addFetch');
const addCreate = require('./addCreate');

const base = async () =>
    await readFile(path.join(__dirname, './templates/base.txt'), 'utf8');

const addModule = (file, name) =>
    file
        .replace(/\<ACTION-TWO\>/g, name)
        .replace(/\<ACTION-CAPS\>/g, name.toUpperCase())
        .replace(
            /\<ACTION-ONE\>/g,
            `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
        );

module.exports = async ({ name, actions }) => {
    await mkdir(`./${name}`);

    var file = await base()
        .then(async res => await addFetch(res, includes(actions, 'fetch')))
        .then(async res => await addCreate(res, includes(actions, 'create')))
        .then(res => addModule(res, name))
        .then(res => res.replace(/(^[ \t]*\n)/gm, ''))
        .then(res => res.replace(/\/\/.*/g, match => `\n${match}`));

    await appendFile(`./${name}/index.js`, file);
};
