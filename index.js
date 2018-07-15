const generator = require('./lib/generate');
const argv = require('yargs').argv;

generator({
    name: argv.module,
});
