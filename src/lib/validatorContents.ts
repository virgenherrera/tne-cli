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

export function softRemoveContent(softDelete: boolean): string {
	return (softDelete) ? '\n\tsoftDelete: joi.boolean().default(true),' : '';
}

export function softUpdateContent(softDelete: boolean): string {
	return (softDelete) ? '\n\tdeletedAt: joi.boolean(),' : '';
}

export interface IValidatorContents {
	mainSchema: string;
	creationSchema: string;
	softRemove: string;
	softUpdate: string;
}

export function validatorContents(attrs: ITplAttr[], softDelete: boolean = false): IValidatorContents {
	const mainSchema = mainSchemaContent(attrs);
	const creationSchema = creationSchemaContent(attrs);
	const softRemove = softRemoveContent(softDelete);
	const softUpdate = softUpdateContent(softDelete);

	return { mainSchema, creationSchema, softRemove, softUpdate };
}
