import { join } from 'path';
import { projectSrcFolder, appRegEx } from '../constant/defaults';
import { pathExists, fileExists } from '@tne/common';
import ColorConsole from './colorConsole';
import { writeStrToFile } from './templateUtils';

export function envContent(name: string, tplEnv: string, hostname: string, port: number, force: boolean): void {
	const configPath = join(process.cwd(), projectSrcFolder.config);

	if (!pathExists(configPath)) {
		const msg = `unable to find config path on ${configPath}.`;
		ColorConsole.red(msg);
		throw msg;
	}

	const tplPath = join(configPath, `${tplEnv}.json`);
	if (!fileExists(tplPath)) {
		const msg = `unable to find config template file on ${tplPath}.`;
		ColorConsole.red(msg);
		throw msg;
	}

	const tplData = require(tplPath);
	const destinyPath = join(configPath, `${name}.json`);

	if (fileExists(destinyPath) && !force) {
		const msg = `Config ${destinyPath} already exists`;
		ColorConsole.red(msg);
		throw msg;
	} else if (fileExists(destinyPath) && force) {
		ColorConsole.yellow(`Overwriting file ${destinyPath} since --force option was received.`);
	}

	Object.assign(tplData, { hostname, port });
	const fileContents = JSON.stringify(tplData, null, 2);

	return writeStrToFile(destinyPath, fileContents);
}

export function generateEnvFile(name: string, tplEnv: string = 'development', hostname: string = 'localhost', port: any = 3000, force: boolean): void {
	if (!appRegEx.moduleName.test(name)) {
		const msg = `"${name}" is not a valid environment name.`;
		ColorConsole.red(msg);
		throw msg;
	} else if (!appRegEx.moduleName.test(hostname)) {
		const msg = `"${hostname}" is not a valid environment hostname.`;
		ColorConsole.red(msg);
		throw msg;
	} else if (isNaN(port)) {
		const msg = `"${port}" is not a valid environment port. ${'\n'}a valid port should be a number`;
		ColorConsole.red(msg);
		throw msg;
	}

	port = Number(port);
	if (port < 1 || port > 65535) {
		const msg = `"${port}" is not a valid environment port.${'\n'}a valid port should be a number between 1 - 65535`;
		ColorConsole.red(msg);
		throw msg;
	}

	return envContent(name, tplEnv, hostname, port, force);
}
