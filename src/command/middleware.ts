import { ICommand, INewFileOpts } from '../interface';
import { ToTitleCase } from '@tne/common';
import { parse, join } from 'path';
import { getCliOpts, moduleNameParse, newFileFromTemplate } from '../lib';
import { appRegEx, projectRootFolder, projectSrcFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';

export default class Middleware implements ICommand {
	command = 'middleware';
	alias = 'mid';
	syntax = `${this.command} <name>`;
	description = `Create a ${ToTitleCase(this.command)} source file`;

	action(nameArg: string) {
		const { name } = parse(nameArg);
		const { force } = getCliOpts();

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid controller name.`);
			process.exit(1);
		}

		const data = {
			...moduleNameParse(name),
		};
		const args: INewFileOpts = {
			template: 'middleware',
			path: join(projectRootFolder.src, projectSrcFolder.middleware, name),
			data,
			overwrite: force,
		};

		return newFileFromTemplate(args);
	}
}
