import { parse, join } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { newFileFromTemplate, moduleNameParse, attributesParse, forceOption } from '../lib';
import { DEFAULT_ATTRIBUTES, appRegEx, projectSrcFolder, projectRootFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';

export class Controller implements ICommand {
	command = 'controller';
	alias = 'c';
	syntax = `${this.command} <name> [attributes]`;
	description = `helps you create a new controller file <name>`;

	action(nameArg: string, attrsStr = DEFAULT_ATTRIBUTES) {
		const { name } = parse(nameArg);

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid controller name.`);
			process.exit(1);
		}

		const data = {
			...moduleNameParse(name),
			...attributesParse(attrsStr),
		};
		const args: INewFileOpts = {
			template: 'controller',
			path: join(projectRootFolder.src, projectSrcFolder.controller, name),
			data,
			overwrite: forceOption(),
		};

		return newFileFromTemplate(args);
	}
}
