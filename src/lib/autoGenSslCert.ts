import { execSync } from 'child_process';
import { join } from 'path';
import { mkdir } from 'shelljs';
import { pathExists, fileExists } from '@tne/common';
import ColorConsole from './colorConsole';

const keyFileName = 'key.pem';
const certificateFileName = 'certificate.pem';

export function autoGenSslCert(pathParam: string, force: boolean = false): void {
	const certsPath = join(process.cwd(), pathParam);
	const execOptions: any = { encoding: 'utf-8', stdio: 'ignore', cwd: certsPath };
	const keyFilePath = join(certsPath, keyFileName);
	const certFilePath = join(certsPath, certificateFileName);

	if (!pathExists(certsPath)) {
		mkdir('-p', certsPath);
	}

	if (fileExists(keyFilePath) && !force) {
		ColorConsole.red(`${'\n'}Unable to create self-signed cert since: "${keyFilePath}" already exists.`);
		return;
	} else if (fileExists(certFilePath) && !force) {
		ColorConsole.red(`${'\n'}Unable to create self-signed cert since: "${certFilePath}" already exists.`);
		return;
	} else if ((fileExists(keyFilePath) || fileExists(certFilePath)) && force) {
		ColorConsole.yellow(`Overwriting previously created self-signed cert since option --force has been received.${'\n'}`);
	}

	ColorConsole.white('- generating self-signed cert');

	try {
		execSync('openssl version', execOptions);
		execSync(
			`openssl req -x509 -newkey rsa:2048 -keyout key.tmp.pem -out ${certificateFileName} -days 365 -nodes -subj "/C=US/ST=Foo/L=Bar/O=Baz/CN=localhost"`,
			execOptions
		);
		execSync(`openssl rsa -in key.tmp.pem -out ${keyFileName}`, execOptions);
		execSync('rm key.tmp.pem', execOptions);
	} catch (error) {
		ColorConsole.red(error);
	}

	ColorConsole.white(
		'- Done!\n\n',
		`self-signed certs location: "${certsPath}"`,
		`key filename: "${keyFileName}"`,
		`cert filename: "${certificateFileName}"`,
	);
}
