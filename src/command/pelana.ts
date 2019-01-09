import { ICommand } from '../interface';

export class Pelana implements ICommand {
	command = 'pelana';
	alias = 'p';
	description = 'ouputs to stdout the pelana meaning...';
	action() {
		console.dir('pelana meaning');
	}
}
