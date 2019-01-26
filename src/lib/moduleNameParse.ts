import { ToTitleCase, to_snake_case, toCamelCase } from '@tne/common';
import { plural as toPlural, singular as toSingular } from 'pluralize';
import { IModuleNames } from '../interface';

export function moduleNameParse(name: string): IModuleNames {
	const className = ToTitleCase(name, '');
	const fileName = to_snake_case(name);
	const functionName = toCamelCase(name);
	const IName = `I${className}`;
	const routePath = toPlural(fileName);
	const plural = toPlural(functionName);
	const collectionName = toPlural(className);
	const singular = toSingular(functionName);

	return { className, fileName, functionName, IName, routePath, plural, singular, collectionName, };
}
