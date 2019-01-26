import { join } from 'path';
import { mkdir } from 'shelljs';
import { projectRootFolder, projectSrcFolder, rwFilePerm } from '../constant/defaults';
import ColorConsole from './colorConsole';
import { writeFileSync, readFileSync } from 'fs';
import { fileExists, pathExists } from '@tne/common';
import { IModuleNames } from '../interface';

const fileHeader = `import { Config, Prefix } from '@tne/express-app';

@Config
export class Routes {
	public static base = '/';
	public static apiV1 = '/api/v1/';
`;
const routesProp = `@Prefix(':prefix') public static :propName = ':routePath';`;

const fileFooter = '}\n';
const cfgPath = join(process.cwd(), projectRootFolder.src, projectSrcFolder.config);
const routesCfgFilePath = join(cfgPath, 'routes.ts');

export function generateRoutesCfgFile(content: string = null) {
	const mode: number = rwFilePerm;
	const fileContents = (content) ? content : fileHeader + fileFooter;

	if (content) {
		ColorConsole.green(`Updating routes file in: ${routesCfgFilePath}`);
	}

	writeFileSync(routesCfgFilePath, fileContents, { encoding: 'utf8', mode });
}

export function addRoutesToConfig(names: IModuleNames, prefix: string = 'apiV1'): void {
	const { singular, plural, routePath } = names;
	const pluralRoute = routesProp.replace(':prefix', prefix).replace(':propName', plural).replace(':routePath', routePath);
	const singularRoute = routesProp.replace(':prefix', prefix).replace(':propName', singular).replace(':routePath', `${routePath}/:id`);

	if (!pathExists(cfgPath)) {
		mkdir('-p', cfgPath);
	}

	if (!fileExists(routesCfgFilePath)) {
		generateRoutesCfgFile();
	}

	const fileContent = `${readFileSync(routesCfgFilePath)}`;

	if (fileContent.includes(pluralRoute) || fileContent.includes(singularRoute)) {
		return;
	}

	const newFileContent = fileContent.replace(/^(.*)(\;\n)(\}\n)$/gm, '$1$2\n\t' + pluralRoute + '\n\t' + singularRoute + '\n' + '$3');

	return generateRoutesCfgFile(newFileContent);
}
