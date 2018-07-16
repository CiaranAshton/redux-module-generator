const generator = require('./lib/generate');
const argv = require('yargs')
    .array('actions')
    .parse();

const start = () => {
    const { module, actions } = argv;
    
	generator({
        name: module,
        actions,
	});
};

start();
