import { ICommand } from '../interface';
import { parse, join } from 'path';

export class Controller implements ICommand {
	command = 'controller';
	alias = 'c';
	syntax = `${this.command} <path>`;
	description = 'will create a controller template when completed';

	action(providedPath: string) {
		const protoName = providedPath.split('/').pop();

		if (!/^\w+$/i.test(protoName)) {
			throw new TypeError(`The path: "${providedPath}" does not contain a valid controller name.`);
		}

		const furtherPath = join(process.cwd(), 'node/src', providedPath);
		const { dir, name } = parse(furtherPath);
		[
			providedPath,
			furtherPath,
			dir, name,
			/^\w+$/i.test(name)
		].forEach(<any>console.dir);
	}
}
