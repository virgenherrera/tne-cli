import { readFileSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import { render } from 'ejs';
import { mkdir } from 'shelljs';
import { templateTypes, filePermissions } from '../interface';
import { rwxFilePerm, rwFilePerm, logColor } from '../constant/defaults';
import { toCamelCase, pathExists } from '@tne/common';

export function readTemplate(templateName: templateTypes): string {
	const templatePath = join(__dirname, '../../template', templateName);

	return `${readFileSync(templatePath)}`;
}

export function writeTemplate(path: string, fileContents: string, fPerms: filePermissions = 'rw'): void {
	const mode: number = (fPerms === 'rwx') ? rwxFilePerm : rwFilePerm;

	console.log(logColor.FgGreen, `Writing file: "${path}"`);
	writeFileSync(path, fileContents, { encoding: 'utf8', mode });
}

export function newFileFromTemplate(template: templateTypes, path: string, data: any, fPerms: filePermissions = 'rw'): void {
	let furtherPath = join(process.cwd(), 'node/src', path);
	const tplStr = readTemplate(template);
	const fileContents = render(tplStr, data);
	const { dir, name, ext } = parse(furtherPath);
	const fileName = `${toCamelCase(name)}${ext || '.ts'}`;

	if (!pathExists(dir)) {
		console.log(logColor.FgYellow, `the directory tree is being created: "${dir}"`);
		mkdir('-p', dir);
	}

	furtherPath = join(dir, fileName);

	writeTemplate(furtherPath, fileContents, fPerms);
}
