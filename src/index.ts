import * as cli from 'commander';
import commands from './command';
import ColorConsole from './lib/colorConsole';
const appPackage = require('../package.json');
const availableCommands = [];

cli
	.version(appPackage.version)
	.description(appPackage.description)
	.option('-f, --force', 'forces cli to overwrite files if any.');

for (const { command, syntax = null, alias, description, action } of commands) {
	availableCommands.push(command, alias);

	cli
		.command((syntax) ? syntax : command)
		.alias(alias)
		.description(description)
		.action(action);
}

// if none or invalid option was received
const [, , firstArg = null] = process.argv;
if (availableCommands.indexOf(firstArg) < 0) {
	ColorConsole.blueBright('@tne/cli help');

	if (firstArg) {
		ColorConsole.yellow(`${'\n\t'}unknown command received: "${firstArg}"${'\n'}`);
	}

	cli.outputHelp();
	process.exit();
}

cli.parse(process.argv);
