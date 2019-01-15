import { ICommand } from '../interface';
import { appRegEx } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import { createFolderStructure, forceOption } from '../lib';

export default class New implements ICommand {
	command = 'new';
	alias = 'n';
	syntax = `${this.command} <path>`;
	description = `helps you create a new TNE app in <path>`;

	action(name: string) {
		const force = forceOption();

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid name name.`);
			process.exit(1);
		}

		// task1 create dirStructure
		createFolderStructure(name, force);
	}
}
