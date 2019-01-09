import { parse } from 'path';
import { ToTitleCase, toCamelCase } from '@tne/common';
import { ICommand } from '../interface';
import { newFileFromTemplate } from '../lib';

export class Controller implements ICommand {
	command = 'controller';
	alias = 'c';
	syntax = `${this.command} <path>`;
	description = 'will create a controller template when completed';

	action(providedPath: string) {
		const { name } = parse(providedPath);

		if (!/^\w+$/i.test(name)) {
			throw new TypeError(`The path: "${providedPath}" does not contain a valid controller name.`);
		}

		const data = {
			moduleFileName: toCamelCase(name),
			moduleName: ToTitleCase(name, ''),
		};

		return newFileFromTemplate('controller', providedPath, data);
	}
}
