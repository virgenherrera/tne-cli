import { ICommand } from '../interface';
import { getCliOpts, generateKeysFile } from '../lib';


export default class Keys implements ICommand {
	command = 'keys';
	alias = 'k';
	syntax = `${this.command} [envFile]`;
	description = `Create a keys file using ./config/[envFile].json file as mapKeys`;

	action(envFile: string = 'development') {
		const { force } = getCliOpts();

		return generateKeysFile(envFile, force);
	}
}
