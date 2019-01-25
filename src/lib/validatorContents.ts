import { ITplAttr } from '../interface';

const propReplacer = ':propName';
const joiReplacer = ':joiMethod';
const propRegEx = new RegExp(propReplacer, 'g');
const joiRegEx = new RegExp(joiReplacer, 'g');
const mainSchemaTpl = `${'\n'}	${propReplacer}: joi.${joiReplacer}(),`;
const creationSchemaTpl = `${'\n'}	${propReplacer}: joi.${joiReplacer}().required(),`;

export function mainSchemaContent(attrs: ITplAttr[]): string {
	const content = attrs.reduce((acc, { attribute = null, dataType = '' }) => {
		if (attribute && dataType) {
			acc += mainSchemaTpl
				.replace(propRegEx, attribute)
				.replace(joiRegEx, dataType.toLowerCase());
		}

		return acc;
	}, '');

	return content + '\n';
}

export function creationSchemaContent(attrs: ITplAttr[]): string {
	const content = attrs.reduce((acc, { attribute = null, dataType = null }) => {
		if (attribute && dataType) {
			acc += creationSchemaTpl
				.replace(propRegEx, attribute)
				.replace(joiRegEx, dataType.toLowerCase());
		}

		return acc;
	}, '');

	return content + '\n';
}

export interface IValidatorContents {
	mainSchema: string;
	creationSchema: string;
}

export function validatorContents(attrs: ITplAttr[]): IValidatorContents {
	const mainSchema = mainSchemaContent(attrs);
	const creationSchema = creationSchemaContent(attrs);

	return { mainSchema, creationSchema };
}
