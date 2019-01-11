import * as cli from 'commander';
import { ICommand } from '../interface';

export class Weputa implements ICommand {
	command = 'weputa';
	alias = 'w';
	description = 'ouputs to stdout the weputa meaning...';

	constructor() {
		/*
		cli.option('-f, --force', 'descripccion de la f');
		cli.option('-h, --hugo', 'opcion hugo', false);
		*/
	}

	action(...args) {

		console.dir('weputa meaning');

		[
			Object.keys(cli),
			...args

		].forEach(<any>console.dir);
	}
}
