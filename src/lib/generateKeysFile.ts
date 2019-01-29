import { join } from 'path';
import { projectSrcFolder } from '../constant/defaults';
import { pathExists, fileExists } from '@tne/common';
import ColorConsole from './colorConsole';
import { writeStrToFile } from './templateUtils';

export function mapEnvToKeys(param: any, defaultKeys: any = {}): any {
	const data: any = defaultKeys;
	const maps = new Map();

	Object.getOwnPropertyNames(param).forEach((currVal) => {
		const prop = `${param[currVal]}`;

		if (prop.indexOf('$keys.') === 0) {
			maps.set(prop.substring(6), '');
		}
	});

	maps.forEach((value, currMap) => {
		const keys = currMap.split('.');
		const last = keys.pop();

		keys.reduce((acc, curr) => acc[curr] = acc[curr] || {}, data)[last] = value;
	});

	return data;
}

export function generateKeysFile(envFile: string, force: boolean): void {
	const configPath = join(process.cwd(), projectSrcFolder.config);

	if (!pathExists(configPath)) {
		const msg = `unable to find config path on ${configPath}.`;
		ColorConsole.red(msg);
		throw msg;
	}

	const tplPath = join(configPath, `${envFile}.json`);
	if (!fileExists(tplPath)) {
		const msg = `unable to find config env file on ${tplPath}.`;
		ColorConsole.red(msg);
		throw msg;
	}

	const tplData = require(tplPath);
	const destinyPath = join(configPath, 'keys.json');

	if (fileExists(destinyPath) && !force) {
		const msg = `Config ${destinyPath} already exists`;
		ColorConsole.red(msg);
		throw msg;
	} else if (fileExists(destinyPath) && force) {
		ColorConsole.yellow(`Merging file ${destinyPath} since --force option was received.`);
	}

	let keysData = {};
	try {
		keysData = require(destinyPath);
	} catch (e) { }

	const data = mapEnvToKeys(tplData, keysData);
	const fileContents = JSON.stringify(data, null, 2);

	return writeStrToFile(destinyPath, fileContents);
}
