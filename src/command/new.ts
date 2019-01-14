import * as cli from 'commander';
import { ICommand } from '../interface';
import { appRegEx } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import { createFolderStructure } from '../lib';

export class New implements ICommand {
	command = 'new';
	alias = 'n';
	syntax = `${this.command} <name>`;
	description = `helps you create a new <name> TNE app in <name>`;

	action(name: string) {
		const { force = false } = cli;

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid name name.`);
			process.exit(1);
		}

		// task1 create dirStructure
		createFolderStructure(name, force);
	}
}
