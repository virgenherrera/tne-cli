import { parse, join } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { newFileFromTemplate, moduleNameParse, attributesParse, forceOption, modelContents } from '../lib';
import { DEFAULT_ATTRIBUTES, appRegEx, projectSrcFolder, projectRootFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';

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

		const parsedAttrs = attributesParse(attrsStr);
		const data = {
			...moduleNameParse(name),
			...parsedAttrs,
			...modelContents(parsedAttrs.attributes)
		};

		const args: INewFileOpts = {
			template: 'model',
			path: join(projectRootFolder.src, projectSrcFolder.model, name),
			data,
			overwrite: forceOption(),
		};

		return newFileFromTemplate(args);
	}
}
