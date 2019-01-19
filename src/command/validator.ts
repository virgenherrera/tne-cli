import { parse, join } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { newFileFromTemplate, moduleNameParse, attributesParse, forceOption, validatorContents } from '../lib';
import { DEFAULT_ATTRIBUTES, appRegEx, projectSrcFolder, projectRootFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import { ToTitleCase } from '@tne/common';

export default class Validator implements ICommand {
	command = 'validator';
	alias = 'v';
	syntax = `${this.command} <name> [attributes]`;
	description = `Create a ${ToTitleCase(this.command)} source file`;

	action(nameArg: string, attrsStr = DEFAULT_ATTRIBUTES) {
		const { name } = parse(nameArg);

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid validator name.`);
			process.exit(1);
		}

		const parsedAttrs = attributesParse(attrsStr);
		const data = {
			...moduleNameParse(name),
			...parsedAttrs,
			...validatorContents(parsedAttrs.attributes)
		};

		const args: INewFileOpts = {
			template: 'validator',
			path: join(projectRootFolder.src, projectSrcFolder.validator, name),
			data,
			overwrite: forceOption(),
		};

		return newFileFromTemplate(args);
	}
}
