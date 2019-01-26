import { ITplAttr } from '../interface';

const propNameReplacer = ':propName';
const dataTypeReplacer = ':dataType';
const strPropsReplacer = ':strProp';
const propNameRegEx = new RegExp(propNameReplacer, 'g');
const dataTypeRegEx = new RegExp(dataTypeReplacer, 'g');
const strPropsRegEx = new RegExp(strPropsReplacer, 'g');
const interfaceTpl = `${'\n'}	${propNameReplacer}: ${dataTypeReplacer};`;
const strSchemaProps = `
		trim: true,
		lowercase: false,
		uppercase: false,`;
const schemaPropTpl = `
	${propNameReplacer}: {
		index: false,
		select: true,
		unique: false,
		required: false,
		type: ${dataTypeReplacer},${strPropsReplacer}
		// default: '${propNameReplacer}_field_default_value_example',
		// set: (val) => {  },
		// get: () => {  },
		// validate: (val) => { /* validator fn body */ },
	},`;
const softDeleteSchemaContent = `
	deletedAt: {
		index: false,
		unique: false,
		required: false,
		type: Date,
		trim: true,
		select: true,
		default: null,
		set: (val: boolean) => (val === true) ? Date.now() : null,
	},`;

enum jsDataTypes {
	boolean = 'Boolean',
	date = 'Date',
	number = 'Number',
	string = 'String',
}

enum tsDataTypes {
	boolean = 'boolean',
	date = 'Date',
	number = 'number',
	string = 'string',
}

export function modelInterfaceContent(attrs: ITplAttr[], softDelete: boolean): string {
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

export function modelSchemaContent(attrs: ITplAttr[], softDelete: boolean): string {
	let content = attrs.reduce((acc, { attribute = null, dataType = null }) => {
		const lowerType = dataType.toLowerCase();

		if (attribute && Object.keys(jsDataTypes).indexOf(lowerType) > -1) {
			const strTypeProps = (lowerType === 'string') ? strSchemaProps : '';
			acc += schemaPropTpl
				.replace(propNameRegEx, attribute)
				.replace(dataTypeRegEx, jsDataTypes[lowerType])
				.replace(strPropsRegEx, strTypeProps);
		}

		return acc;
	}, '');

	if (softDelete) {
		content += softDeleteSchemaContent;
	}

	return content + '\n';
}

export interface IModelContents {
	IDeclaration: string;
	schemaContent: string;
}

export function modelContents(attrs: ITplAttr[], softDelete: boolean = false): IModelContents {
	const IDeclaration = modelInterfaceContent(attrs, softDelete);
	const schemaContent = modelSchemaContent(attrs, softDelete);

	return { IDeclaration, schemaContent };
}
