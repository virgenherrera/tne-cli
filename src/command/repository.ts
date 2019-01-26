import { parse, join } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { newFileFromTemplate, moduleNameParse, attributesParse, getCliOpts, repositoryContents } from '../lib';
import { DEFAULT_ATTRIBUTES, appRegEx, projectSrcFolder, projectRootFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import { ToTitleCase } from '@tne/common';

export default class Repository implements ICommand {
	command = 'repository';
	alias = 'r';
	syntax = `${this.command} <name> [attributes]`;
	description = `Create a ${ToTitleCase(this.command)} source file`;

	action(nameArg: string, attrsStr = DEFAULT_ATTRIBUTES) {
		const { name } = parse(nameArg);
		const { force, softDelete } = getCliOpts();

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid repository name.`);
			process.exit(1);
		}

		const parsedAttrs = attributesParse(attrsStr);
		const data = {
			...moduleNameParse(name),
			...parsedAttrs,
			...repositoryContents(parsedAttrs.attributes, softDelete)
		};

		const args: INewFileOpts = {
			template: 'repository',
			path: join(projectRootFolder.src, projectSrcFolder.repository, name),
			data,
			overwrite: force,
		};

		return newFileFromTemplate(args);
	}
}
