import { ICommand } from '../interface';
import { getCliOpts, generateEnvFile } from '../lib';


export default class Environment implements ICommand {
	command = 'environment';
	alias = 'env';
	syntax = `${this.command} <name> [tplEnv] [hostname] [port]`;
	description = `Create a new env file in ./config/<name>.json using [tplEnv] as environment template`;

	action(name: string, tplEnv: string = 'development', hostname: string = 'localhost', port: any = 3000) {
		const { force } = getCliOpts();

		return generateEnvFile(name, tplEnv, hostname, port, force);
	}
}
