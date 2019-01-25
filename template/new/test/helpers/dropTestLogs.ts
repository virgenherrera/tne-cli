import { join } from 'path';
import { readdirSync } from 'fs';
import { appName } from './getTestContext';
import { sync as rimrafSync } from 'rimraf';

// rimraf || unlinkSync not working on windows :/
// https://github.com/nodejs/node-v0.x-archive/issues/3051
export async function dropTestLogs(logsPath: string) {
	if (process.platform === 'win32') { return; }

	const regEx = new RegExp(appName);

	await readdirSync(logsPath)
		.forEach(file => {
			if (regEx.test(file)) {
				rimrafSync(join(logsPath, file));
			}
		});
}
