import { parse, join } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { newFileFromTemplate, moduleNameParse, attributesParse, getCliOpts, pocoContents } from '../lib';
import { DEFAULT_ATTRIBUTES, appRegEx, projectSrcFolder, projectRootFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import { ToTitleCase } from '@tne/common';

export default class Poco implements ICommand {
	command = 'poco';
	alias = 'p';
	syntax = `${this.command} <name> [attributes]`;
	description = `Create a ${ToTitleCase(this.command)} source file`;

	action(nameArg: string, attrsStr = DEFAULT_ATTRIBUTES) {
		const { name } = parse(nameArg);
		const { force, softDelete } = getCliOpts();

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid poco name.`);
			process.exit(1);
		}

		const parsedAttrs = attributesParse(attrsStr);
		const data = {
			...moduleNameParse(name),
			...parsedAttrs,
			...pocoContents(parsedAttrs.attributes, softDelete)
		};

		const args: INewFileOpts = {
			template: 'poco',
			path: join(projectRootFolder.src, projectSrcFolder.poco, name),
			data,
			overwrite: force,
		};

		return newFileFromTemplate(args);
	}
}
