import { join } from 'path';
import { readdirSync } from 'fs';
import { mkdir } from 'shelljs';
import { pathExists } from '@tne/common';
import ColorConsole from './colorConsole';
import { projectRootFolder, projectSrcFolder, projectHandlerFolder } from '../constant/defaults';
import { moduleNameParse } from './moduleNameParse';

export function createFolderStructure(originalName: string, force: boolean = false): void {
	const { fileName } = moduleNameParse(originalName);
	const furtherPath = join(process.cwd(), fileName);

	if (!pathExists(furtherPath)) {
		mkdir('-p', furtherPath);
	}

	if (readdirSync(furtherPath).length > 0 && force) {
		ColorConsole.yellow(`overwriting non-empty path: "${furtherPath}"`);
	}

	ColorConsole.blueBright(`Creating folder structure...`);

	Object.keys(projectRootFolder).forEach(k => {
		const folderPath = join(furtherPath, projectRootFolder[k]);

		if (!pathExists(folderPath)) {
			mkdir('-p', folderPath);
		}
	});

	Object.keys(projectSrcFolder).forEach(k => {
		const folderPath = join(furtherPath, projectRootFolder.src, projectSrcFolder[k]);

		if (!pathExists(folderPath)) {
			mkdir('-p', folderPath);
		}
	});

	Object.keys(projectHandlerFolder).forEach(k => {
		const folderPath = join(furtherPath, projectRootFolder.src, projectSrcFolder.handler, projectHandlerFolder[k]);

		if (!pathExists(folderPath)) {
			mkdir('-p', folderPath);
		}
	});
}
