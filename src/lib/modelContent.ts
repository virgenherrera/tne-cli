import { ITplAttr } from '../interface';

const propNameReplacer = ':propName';
const dataTypeReplacer = ':dataType';
const strPropsReplacer = ':strProp';
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
		// default: '${propNameReplacer}_defaultValue_example',
		// set: (val) => {  },
		// get: () => {  },
		// validate: {
		// 	validator: (val) => {  },
		// 	message: '{VALUE} is not a valid ${propNameReplacer}!'
		// },
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

export function modelInterfaceContent(attrs: ITplAttr[]): string {
	return attrs.reduce((acc, { attribute = null, dataType = '' }) => {
		const lowerType = dataType.toLowerCase();

		if (attribute && Object.keys(tsDataTypes).indexOf(lowerType) > -1) {
			acc += interfaceTpl
				.replace(propNameReplacer, attribute)
				.replace(dataTypeReplacer, tsDataTypes[lowerType]);
		}

		return acc;
	}, '');
}

export function modelSchemaContent(attrs: ITplAttr[]): string {
	return attrs.reduce((acc, { attribute = null, dataType = null }) => {
		const lowerType = dataType.toLowerCase();

		if (attribute && Object.keys(jsDataTypes).indexOf(lowerType) > -1) {
			const strTypeProps = (lowerType === 'string') ? strSchemaProps : '';
			acc += schemaPropTpl
				.replace(propNameReplacer, attribute)
				.replace(dataTypeReplacer, jsDataTypes[lowerType])
				.replace(strPropsReplacer, strTypeProps);
		}

		return acc;
	}, '');
}

export interface IModelContents {
	IDeclaration: string;
	schemaContent: string;
}

export function modelContents(attrs: ITplAttr[]): IModelContents {
	const IDeclaration = modelInterfaceContent(attrs);
	const schemaContent = modelSchemaContent(attrs);

	return { IDeclaration, schemaContent };
}
