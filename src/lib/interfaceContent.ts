import { ITplAttr } from '../interface';

const propNameReplacer = ':propName';
const dataTypeReplacer = ':dataType';
const propNameRegEx = new RegExp(propNameReplacer, 'g');
const dataTypeRegEx = new RegExp(dataTypeReplacer, 'g');
const interfaceTpl = `${'\n'}	${propNameReplacer}?: ${dataTypeReplacer};`;

enum tsDataTypes {
	boolean = 'boolean',
	date = 'Date',
	number = 'number',
	string = 'string',
}

function buildInterfaceContent(attrs: ITplAttr[], softDelete: boolean): string {
	let content = attrs.reduce((acc, { attribute = null, dataType = '' }) => {
		const lowerType = dataType.toLowerCase();

		if (attribute && Object.keys(tsDataTypes).indexOf(lowerType) > -1) {
			acc += interfaceTpl
				.replace(propNameRegEx, attribute)
				.replace(dataTypeRegEx, tsDataTypes[lowerType]);
		}


		return acc;
	}, '');

	if (softDelete) {
		content += '\n\tdeletedAt: Date;';
	}

	return content + '\n';
}

export interface IModelContents {
	IDeclaration: string;
}

export function interfaceContents(attrs: ITplAttr[], softDelete: boolean = false): IModelContents {
	const IDeclaration = buildInterfaceContent(attrs, softDelete);

	return { IDeclaration };
}
