import { ICommand } from '../interface';
import { getCliOpts, newProject } from '../lib';

export default class New implements ICommand {
	command = 'new';
	alias = 'n';
	syntax = `${this.command} <path>`;
	description = `Create a TNE app in <path>`;

	action(pathParam: string) {
		const { force } = getCliOpts();

		return newProject(pathParam, force);
	}
}
