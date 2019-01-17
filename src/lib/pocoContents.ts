import { ITplAttr } from '../interface';

const propReplacer = ':propName';
const propRegEx = new RegExp(propReplacer, 'g');
const propDeclareTpl = `${'\n'}	${propReplacer};`;
const propAssignTpl = `${'\n'}		this.${propReplacer} = params.${propReplacer};`;
const listFilterDestructTpl = `${propReplacer}, `;
const conditionReplacer = ':condition';
const booleanCondition = `[true, false].indexOf(${propReplacer}) > -1`;
const filterParseTpl = `
		if (${conditionReplacer}) {
			this.query.${propReplacer} = ${propReplacer};
			this.queryStringArgs.${propReplacer} = ${propReplacer};
		}
`;

export function propDeclarationContent(attrs: ITplAttr[]): string {
	return attrs.reduce((acc, { attribute = null }) => {
		if (attribute) {
			acc += propDeclareTpl.replace(propRegEx, attribute);
		}

		return acc;
	}, '');
}

export function propAssignContent(attrs: ITplAttr[]): string {
	return attrs.reduce((acc, { attribute = null }) => {
		if (attribute) {
			acc += propAssignTpl.replace(propRegEx, attribute);
		}

		return acc;
	}, '');
}

export function listFilterDestructContent(attrs: ITplAttr[]): string {
	return attrs.reduce((acc, { attribute = null }) => {
		if (attribute) {
			acc += listFilterDestructTpl.replace(propRegEx, attribute);
		}

		return acc;
	}, '');
}

export function filterParseContent(attrs: ITplAttr[]): string {
	return attrs.reduce((acc, { attribute = null, dataType = '' }) => {
		if (attribute) {
			const condition = (dataType === 'boolean') ? booleanCondition.replace(propRegEx, attribute) : attribute;

			acc += filterParseTpl
				.replace(conditionReplacer, condition)
				.replace(propRegEx, attribute);
		}

		return acc;
	}, '');
}

export interface IPocoContents {
	propDeclaration: string;
	propAssign: string;
	listFilterDestruct: string;
	filterParse: string;
}

export function pocoContents(attrs: ITplAttr[]): IPocoContents {
	const propDeclaration = propDeclarationContent(attrs);
	const propAssign = propAssignContent(attrs);
	const listFilterDestruct = listFilterDestructContent(attrs);
	const filterParse = filterParseContent(attrs);

	return { propDeclaration, propAssign, listFilterDestruct, filterParse };
}
