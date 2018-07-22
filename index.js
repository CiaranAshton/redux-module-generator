const generator = require('./lib/generate');
const argv = require('yargs').argv;
const { compact } = require('lodash');

const run = () => {
    const { module, c, r, u, d } = argv;

    generator({
        name: module,
        actions: compact([
            c && 'create',
            r && 'fetch',
            u && 'update',
            d && 'delete',
        ]),
    });
};

run();
