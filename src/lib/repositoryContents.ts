import { ITplAttr } from '../interface';

const propReplacer = ':propName';
const conditionReplacer = ':condition';
const propRegEx = new RegExp(propReplacer, 'g');
const conditionRegEx = new RegExp(conditionReplacer, 'g');
const booleanCondition = `[true, false].indexOf(${propReplacer}) > -1`;
const destructPropsTpl = `${'\n'}			${propReplacer} = null,`;
const propUpdateTpl = `if (${conditionReplacer}) { entity.${propReplacer} = ${propReplacer}; }${'\n'}		`;

export function destructPropsContent(attrs: ITplAttr[]) {
	return attrs.reduce((acc, { attribute = null }) => {
		if (attribute) {
			acc += destructPropsTpl.replace(propRegEx, attribute);
		}

		return acc;
	}, '');
}

export function propUpdateContent(attrs: ITplAttr[]) {
	return attrs.reduce((acc, { attribute = null, dataType = null }) => {
		if (attribute) {
			const condition = (dataType === 'boolean') ? booleanCondition.replace(propRegEx, attribute) : attribute;

			acc += propUpdateTpl
				.replace(conditionRegEx, condition)
				.replace(propRegEx, attribute);
		}

		return acc;
	}, '');
}

export interface IRepositoryContents {
	destructProps: string;
	propUpdate: string;
}

export function repositoryContents(attrs: ITplAttr[]): IRepositoryContents {
	const destructProps = destructPropsContent(attrs);
	const propUpdate = propUpdateContent(attrs);

	return { destructProps, propUpdate };
}
