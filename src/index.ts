import * as cli from 'commander';
import { commands } from './command';
import ColorConsole from './lib/colorConsole';
import { COMPLEMENTARY_DESCRIPTION } from './constant/defaults';
const appPackage = require('../package.json');
const availableCommands = [];

const { chalk } = ColorConsole;

const description = chalk.white(appPackage.description);
const complementary = chalk.blueBright(COMPLEMENTARY_DESCRIPTION);

cli
	.version(appPackage.version)
	.description(`${description}${complementary}`)
	.option('-f, --force', 'forces cli to overwrite files if any.');

for (const { command, syntax = null, alias, description, action } of commands[Symbol.iterator]()) {
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
