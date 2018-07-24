const generate = require('../lib/generate');
const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const rimraf = promisify(require('rimraf'));

const testyFetchFix = require('./fixtures/fetch')();
const testyCreateFix = require('./fixtures/create')();
const testyFetchCreateFix = require('./fixtures/fetchcreate')();

describe('lib/generate', () => {
    it('creates a "testy" module for fetching', async () => {
        await generate({ name: 'testy', actions: ['fetch'] });

        const res = await readFile(
            path.join(__dirname, '../testy/index.js'),
            'utf8',
        );

        await rimraf(path.join(__dirname, '../testy'));

        expect(res.trim()).to.equal(testyFetchFix);
    });

    it('creates a "testy" module for creating', async () => {
        await generate({ name: 'testy', actions: ['create'] });

        const res = await readFile(
            path.join(__dirname, '../testy/index.js'),
            'utf8',
        );

        await rimraf(path.join(__dirname, '../testy'));

        expect(res.trim()).to.equal(testyCreateFix);
    });

    it('creates a "testy" module for reading and creating', async () => {
        await generate({ name: 'testy', actions: ['fetch', 'create'] });

        const res = await readFile(
            path.join(__dirname, '../testy/index.js'),
            'utf8',
        );

        await rimraf(path.join(__dirname, '../testy'));

        expect(res.trim()).to.equal(testyFetchCreateFix);
    });
});
