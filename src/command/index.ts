import { ICommand } from '../interface';
import { readdirSync } from 'fs';
import { parse, join } from 'path';

const firstCommands: ICommand[] = new Array(2);
const otherCommands: ICommand[] = [];

readdirSync(__dirname)
	.forEach(file => {
		const filePath = join(__dirname, file);
		const { name, ext } = parse(filePath);

		if (['.ts', '.js'].indexOf(ext) < 0 || name === 'index') { return; }

		const module = require(filePath);

		if (!module || !module.default) { return; }

		const cmd = new module.default;

		if (cmd.command === 'new') {
			firstCommands[0] = cmd;
		} else if (cmd.command === 'module') {
			firstCommands[1] = cmd;
		} else {
			otherCommands.push(cmd);
		}
	});

export const commands: ICommand[] = [...firstCommands, ...otherCommands];

