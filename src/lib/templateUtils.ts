import { readFileSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import { render } from 'ejs';
import { mkdir } from 'shelljs';
import { templateTypes, filePermissions, INewFileOpts } from '../interface';
import { rwxFilePerm, rwFilePerm } from '../constant/defaults';
import { pathExists, fileExists, to_snake_case } from '@tne/common';
import ColorConsole from './colorConsole';

export function readTemplate(templateName: templateTypes): string {
	const templatePath = join(__dirname, '../../template', templateName);

	return `${readFileSync(templatePath)}`;
}

export function writeTemplate(path: string, fileContents: string, fPerms: filePermissions = 'rw'): void {
	const mode: number = (fPerms === 'rwx') ? rwxFilePerm : rwFilePerm;

	ColorConsole.green(`Writing file: "${path}"`);

	writeFileSync(path, fileContents, { encoding: 'utf8', mode });
}

export function newFileFromTemplate(args: INewFileOpts): boolean {
	const { template, path, data, overwrite = false, fExt = '.ts', fPerms = 'rw' } = args;
	const furtherPath = join(process.cwd(), path);
	const tplStr = readTemplate(template);
	const fileContents = render(tplStr, data);
	const { dir, name } = parse(furtherPath);
	const fileName = `${to_snake_case(name)}${fExt}`;
	const filePath = join(dir, fileName);
	let success = false;

	if (!pathExists(dir)) {
		ColorConsole.greenBright(`creating non-existent directory tree: "${dir}"${'\n'}`);
		mkdir('-p', dir);
	}

	if (fileExists(filePath) && !overwrite) {
		ColorConsole.yellow(`${'\n'}The creation of the file has been omitted: "${filePath}" since it already existed.`);
		return success;
	} else if (fileExists(filePath) && overwrite) {
		ColorConsole.yellow(`Overwriting the file: "${filePath}" since option --force has been received.${'\n'}`);
	}

	writeTemplate(filePath, fileContents, fPerms);

	success = true;
	return success;
}
