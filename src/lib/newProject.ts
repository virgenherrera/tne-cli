import { render } from 'ejs';
import { join, parse } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { mkdir, cp, rm, mv } from 'shelljs';
import { pathExists } from '@tne/common';
import ColorConsole from './colorConsole';
import { projectRootFolder, projectSrcFolder, projectHandlerFolder, appRegEx } from '../constant/defaults';
import { moduleNameParse } from './moduleNameParse';
import { IModuleNames } from '../interface';
import { writeStrToFile } from './templateUtils';
import { execSync } from 'child_process';

export function genRandStr() {
	return Math.random().toString(36).slice(2).toUpperCase();
}

export function createFolderStructure(projectPath: string): void {
	if (!pathExists(projectPath)) {
		mkdir('-p', projectPath);
	}

	ColorConsole.blueBright(`- fulfilling folder structure...`);

	Object.keys(projectRootFolder).forEach(k => {
		const folderPath = join(projectPath, projectRootFolder[k]);

		if (!pathExists(folderPath)) {
			mkdir('-p', folderPath);
		}
	});

	Object.keys(projectSrcFolder).forEach(k => {
		const folderPath = join(projectPath, projectRootFolder.src, projectSrcFolder[k]);

		if (!pathExists(folderPath)) {
			mkdir('-p', folderPath);
		}
	});

	Object.keys(projectHandlerFolder).forEach(k => {
		const folderPath = join(projectPath, projectRootFolder.src, projectSrcFolder.handler, projectHandlerFolder[k]);

		if (!pathExists(folderPath)) {
			mkdir('-p', folderPath);
		}
	});
}

export function interpolateProjectVars(projectPath: string, moduleNames: IModuleNames) {
	const selfPackagePath = join(__dirname, '../../package.json');
	const packagePath = join(projectPath, 'package.json');
	const readmePath = join(projectPath, 'README.md');
	const keysPath = join(projectPath, 'config/keys.json');
	const selfPackageData = require(selfPackagePath);
	const packageData = require(packagePath);
	const keysData = require(keysPath);
	const readmeTpl = `${readFileSync(readmePath, { encoding: 'utf8' })}`;
	const readmeData = {
		name: moduleNames.fileName,
		description: packageData.description,
	};
	const readmeContents = render(readmeTpl, readmeData);

	// inject data to json files
	packageData.name = moduleNames.fileName;
	packageData.repository.url = `git+https://github.com/your_username/${moduleNames.fileName}`;
	packageData.homepage = `https://https://github.com/your_username/${moduleNames.fileName}#readme`;
	packageData.bugs.url = `https://https://github.com/your_username/${moduleNames.fileName}/issues`;

	packageData.devDependencies[selfPackageData.name] = selfPackageData.version;

	const orderedDevDependencies = {};
	Object.keys(packageData.devDependencies).sort().forEach(k => orderedDevDependencies[k] = packageData.devDependencies[k]);
	packageData.devDependencies = orderedDevDependencies;

	keysData.app.secret = `${Array(3).fill(null).map(genRandStr).join('')}`;
	keysData.mongodb.development.db = `${moduleNames.className}_development`;
	keysData.mongodb.production.db = `${moduleNames.className}_production`;
	keysData.mongodb.test.db = `${moduleNames.className}_test`;

	writeStrToFile(packagePath, JSON.stringify(packageData, null, 2));
	writeStrToFile(keysPath, JSON.stringify(keysData, null, 2));
	writeStrToFile(readmePath, readmeContents);
}

export function newProject(pathParam: string, force: boolean = false): void {
	if (!appRegEx.appName.test(pathParam)) {
		ColorConsole.red(`"${pathParam}" is not a valid name for a new TNE application.`);
		process.exit(1);
	}

	const parsedPath = parse(join(process.cwd(), pathParam));
	const parentPath = parsedPath.dir;
	const originalName = parsedPath.name;
	const parsedNames = moduleNameParse(originalName);
	const originPath = join(__dirname, '../../template/new');
	const destinyPath = join(parentPath, originalName);

	// ensure destiny path is empty
	if (pathExists(destinyPath) && readdirSync(destinyPath).length > 0 && !force) {
		ColorConsole.red(`It is not possible to initialize a new project, since the destination folder is not empty.`);
		process.exit(1);
	} else if (pathExists(destinyPath) && readdirSync(destinyPath).length > 0 && force) {
		ColorConsole.yellow('The option \'--force\' was received.', 'Initializing a new project in a non-empty folder.');

		rm('-Rf', destinyPath);
	}

	// copy sample project to target
	ColorConsole.blueBright(`- initializing folder structure...`);
	cp('-Rf', originPath, destinyPath);

	// rename gitignore to .gitignore
	const gitignoreFilePath = join(destinyPath, 'gitignore');
	const _gitignoreFilePath = join(destinyPath, '.gitignore');
	ColorConsole.blueBright(`- Writing file: ".gitignore"`);
	mv('-f', gitignoreFilePath, _gitignoreFilePath);

	// task2 complete dirStructure
	createFolderStructure(destinyPath);

	// prepare new project
	interpolateProjectVars(destinyPath, parsedNames);

	// install project
	ColorConsole.blueBright(`- installing project dependencies...`);
	execSync(`npm install`, { encoding: 'utf-8', stdio: 'inherit', cwd: destinyPath });

	ColorConsole.greenBright(
		'- Project creation completed!',
		`Project location: "${destinyPath}"`,
		'\n\n\tNow build an awesome product!!!\n\n'
	);
}
