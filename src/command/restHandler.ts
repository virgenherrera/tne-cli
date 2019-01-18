import { join, parse } from 'path';
import { ICommand, INewFileOpts } from '../interface';
import { forceOption, newFileFromTemplate, moduleNameParse } from '../lib';
import { appRegEx, projectRootFolder, projectSrcFolder, projectHandlerFolder } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import { addRoutesToConfig } from '../lib/routesCfg';
import { ToTitleCase } from '@tne/common';

export default class RestHandler implements ICommand {
	command = 'rest-handler';
	alias = 'rh';
	syntax = `${this.command} <name>`;
	description = `Creates a new ${ToTitleCase(this.command)} file.`;

	action(nameArg) {
		const { name } = parse(nameArg);

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid controller name.`);
			process.exit(1);
		}

		const data = {
			...moduleNameParse(name),
		};
		const args: INewFileOpts = {
			template: 'rest-handler',
			path: join(projectRootFolder.src, projectSrcFolder.handler, projectHandlerFolder.rest, name),
			data,
			overwrite: forceOption(),
		};

		const success = newFileFromTemplate(args);

		if (!success) { return; }

		// append to config/Routes
		addRoutesToConfig(data);
	}
}
