import { parse, join } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { newFileFromTemplate, moduleNameParse, attributesParse, getCliOpts, interfaceContents } from '../lib';
import { DEFAULT_ATTRIBUTES, appRegEx, projectSrcFolder, projectRootFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import { ToTitleCase } from '@tne/common';

export default class Model implements ICommand {
	command = 'interface';
	alias = 'i';
	syntax = `${this.command} <name> [attributes]`;
	description = `Create a ${ToTitleCase(this.command)} source file`;

	action(nameArg: string, attrsStr = DEFAULT_ATTRIBUTES) {
		const { name } = parse(nameArg);
		const { force, softDelete } = getCliOpts();

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid interface name.`);
			process.exit(1);
		}

		const parsedAttrs = attributesParse(attrsStr);
		const data = {
			...moduleNameParse(name),
			...interfaceContents(parsedAttrs.attributes, softDelete)
		};

		const args: INewFileOpts = {
			template: 'interface',
			path: join(projectRootFolder.src, projectSrcFolder.interface, name),
			data,
			overwrite: force,
		};

		return newFileFromTemplate(args);
	}
}
