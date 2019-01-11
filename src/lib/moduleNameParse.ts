import { ToTitleCase, to_snake_case, toCamelCase } from '@tne/common';
import { IModuleNames } from '../interface';

export function moduleNameParse(name: string): IModuleNames {
	const className = ToTitleCase(name, '');
	const fileName = to_snake_case(name);
	const functionName = toCamelCase(name);
	const IName = `I${className}`;

	return { className, fileName, functionName, IName };
}
