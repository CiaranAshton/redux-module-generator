const generate = require('../lib/generate');
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const rimraf = promisify(require('rimraf'));

const testyFix = require('./fixtures/fetch')();

describe('lib/generate', () => {
    it('creates a "testy" module for fetching', async () => {
        await generate({ name: 'testy' });

        const res = await readFile(
            path.join(__dirname, '../testy/index.js'),
            'utf8',
        );

        expect(res.trim()).to.equal(testyFix);

        await rimraf(path.join(__dirname, '../testy'));
    });
});
