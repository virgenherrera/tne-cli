import { join } from 'path';
import { mkdir } from 'shelljs';
import { projectRootFolder, projectSrcFolder, rwFilePerm } from '../constant/defaults';
import ColorConsole from './colorConsole';
import { writeFileSync, readFileSync } from 'fs';
import { moduleNameParse } from './moduleNameParse';
import { fileExists, pathExists } from '@tne/common';

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
		ColorConsole.green(`Creating routes file in: ${routesCfgFilePath}`);
	}

	writeFileSync(routesCfgFilePath, fileContents, { encoding: 'utf8', mode });
}

export function addRoutesToConfig(routeName: string, prefix: string = 'apiV1'): void {
	const { functionName, fileName } = moduleNameParse(routeName);
	const generalRoute = routesProp.replace(':prefix', prefix).replace(':propName', functionName).replace(':routePath', fileName);
	const particularRoute = routesProp.replace(':prefix', prefix).replace(':propName', `${functionName}Id`).replace(':routePath', `${fileName}/:id`);
	const concatStr = generalRoute + '\n\t' + particularRoute + '\n';

	if (!pathExists(cfgPath)) {
		mkdir('-p', cfgPath);
	}

	if (!fileExists(routesCfgFilePath)) {
		generateRoutesCfgFile();
	}

	const fileContent = `${readFileSync(routesCfgFilePath)}`;
	const newFileContent = fileContent.replace(/^(.*)(\;\n)(\}\n)$/gm, '$1$2\n\t' + concatStr + '$3');

	generateRoutesCfgFile(newFileContent);
}
