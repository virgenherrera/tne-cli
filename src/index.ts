import * as cli from 'commander';
import commands from './command';
import { ICommand } from './interface';
// import { Dictionary } from './lib/dictionary';
const { version, description } = require('../package.json');
const availableCommands = [];
const [, , command] = process.argv;

cli
	.version(version)
	.description(description);

for (const { command, syntax = null, alias, description, action } of <ICommand[]>commands) {
	availableCommands.push(command, alias);

	cli
		.command((syntax) ? syntax : command)
		.alias(alias)
		.description(description)
		.action(action);
}

// if none or invalid option was received
if (!process.argv.slice(2).length || availableCommands.indexOf(command) < 0) {
	cli.outputHelp();
	process.exit();
}

cli.parse(process.argv);
