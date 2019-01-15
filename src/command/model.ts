import { parse, join } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { newFileFromTemplate, moduleNameParse, attributesParse, forceOption } from '../lib';
import { DEFAULT_ATTRIBUTES, appRegEx, projectSrcFolder, projectRootFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import { dd } from '@tne/common';

export default class Controller implements ICommand {
	command = 'model';
	alias = 'm';
	syntax = `${this.command} <name> [attributes]`;
	description = `helps you create a new model file <name>`;

	action(nameArg: string, attrsStr = DEFAULT_ATTRIBUTES) {
		const { name } = parse(nameArg);

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid model name.`);
			process.exit(1);
		}

		const data = {
			...moduleNameParse(name),
			...attributesParse(attrsStr),
		};


		dd(data);

		const args: INewFileOpts = {
			template: 'model',
			path: join(projectRootFolder.src, projectSrcFolder.model, name),
			data,
			overwrite: forceOption(),
		};

		return newFileFromTemplate(args);
	}
}
