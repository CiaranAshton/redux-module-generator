const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = async (baseFile, required) =>
	required
		? baseFile
				.replace(
					/\<CREATE-REDUCER\>/g,
					await readFile(
						path.join(__dirname, './templates/create/reducer.txt'),
						'utf8',
					),
				)
				.replace(
					/\<CREATE-ACTIONS\>/g,
					await readFile(
						path.join(__dirname, './templates/create/actions.txt'),
						'utf8',
					),
				)
				.replace(
					/\<CREATE-EVENTS\>/g,
					await readFile(
						path.join(__dirname, './templates/create/events.txt'),
						'utf8',
					),
				)
				.replace(
					/\<CREATE-WATCHER\>/g,
					await readFile(
						path.join(__dirname, './templates/create/watcher.txt'),
						'utf8',
					),
				)
				.replace(
					/\<CREATE-SAGA\>/g,
					await readFile(
						path.join(__dirname, './templates/create/saga.txt'),
						'utf8',
					),
				)
		: baseFile
				.replace(/\<CREATE-REDUCER\>/g, '')
				.replace(/\<CREATE-ACTIONS\>/g, '')
				.replace(/\<CREATE-EVENTS\>/g, '')
				.replace(/\<CREATE-WATCHER\>/g, '')
				.replace(/\<CREATE-SAGA\>/g, '');
