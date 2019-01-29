import { ICommand, } from '../interface';
import { getCliOpts, autoGenSslCert } from '../lib';
import { projectRootFolder, appRegEx } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';

export default class AutoSsl implements ICommand {
	command = 'auto-ssl';
	alias = 'ssl';
	syntax = `${this.command} [path]`;
	description = `auto-generates SSL certificate and key files.`;

	action(pathParam: string = projectRootFolder.certs) {
		const { force } = getCliOpts();

		if (pathParam !== projectRootFolder.certs && !appRegEx.appName.test(pathParam)) {
			ColorConsole.red(`"${pathParam}" is not a valid path for ssl files.`);
			process.exit(1);
		}

		return autoGenSslCert(pathParam, force);
	}
}
