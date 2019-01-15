import { ICommand } from '../interface';
import { readdirSync } from 'fs';
import { parse, join } from 'path';

const commands: ICommand[] = [];

readdirSync(__dirname)
	.forEach(file => {
		const filePath = join(__dirname, file);
		const { name, ext } = parse(filePath);

		if (['.ts', '.js'].indexOf(ext) < 0 || name === 'index') { return; }

		const module = require(filePath);

		if (!module || !module.default) { return; }
		commands.push(new module.default);
	});


export { commands };
