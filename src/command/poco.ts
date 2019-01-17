import { parse, join } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { newFileFromTemplate, moduleNameParse, attributesParse, forceOption, pocoContents } from '../lib';
import { DEFAULT_ATTRIBUTES, appRegEx, projectSrcFolder, projectRootFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';

export default class Poco implements ICommand {
	command = 'poco';
	alias = 'p';
	syntax = `${this.command} <name> [attributes]`;
	description = `helps you create a new poco file <name>`;

	action(nameArg: string, attrsStr = DEFAULT_ATTRIBUTES) {
		const { name } = parse(nameArg);

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid poco name.`);
			process.exit(1);
		}

		const parsedAttrs = attributesParse(attrsStr);
		const data = {
			...moduleNameParse(name),
			...parsedAttrs,
			...pocoContents(parsedAttrs.attributes)
		};

		const args: INewFileOpts = {
			template: 'poco',
			path: join(projectRootFolder.src, projectSrcFolder.poco, name),
			data,
			overwrite: forceOption(),
		};

		return newFileFromTemplate(args);
	}
}
