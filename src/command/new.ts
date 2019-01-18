import { ICommand } from '../interface';
import { forceOption, newProject } from '../lib';

export default class New implements ICommand {
	command = 'new';
	alias = 'n';
	syntax = `${this.command} <path>`;
	description = `Creates a new TNE app in <path>`;

	action(pathParam: string) {
		const force = forceOption();

		return newProject(pathParam, force);
	}
}
