const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { includes } = require('lodash');

const addCreate = require('./addCreate');

const appendFile = promisify(fs.appendFile);
const mkdir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);

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

	var file;
	file = await base();
	file = await addCreate(file, includes(actions, 'create'));
	file = addModule(file, name);

	await appendFile(`./${name}/index.js`, file);
};
