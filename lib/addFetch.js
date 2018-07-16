const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = async (baseFile, required) =>
	required
		? baseFile
				.replace(
					/\<FETCH-REDUCER\>/g,
					await readFile(
						path.join(__dirname, './templates/fetch/reducer.txt'),
						'utf8',
					),
				)
				.replace(
					/\<FETCH-ACTIONS\>/g,
					await readFile(
						path.join(__dirname, './templates/fetch/actions.txt'),
						'utf8',
					),
				)
				.replace(
					/\<FETCH-EVENTS\>/g,
					await readFile(
						path.join(__dirname, './templates/fetch/events.txt'),
						'utf8',
					),
				)
				.replace(
					/\<FETCH-WATCHER\>/g,
					await readFile(
						path.join(__dirname, './templates/fetch/watcher.txt'),
						'utf8',
					),
				)
				.replace(
					/\<FETCH-SAGA\>/g,
					await readFile(
						path.join(__dirname, './templates/fetch/saga.txt'),
						'utf8',
					),
				)
		: baseFile
				.replace(/\<FETCH-REDUCER\>/g, '')
				.replace(/\<FETCH-ACTIONS\>/g, '')
				.replace(/\<FETCH-EVENTS\>/g, '')
				.replace(/\<FETCH-WATCHER\>/g, '')
				.replace(/\<FETCH-SAGA\>/g, '');

