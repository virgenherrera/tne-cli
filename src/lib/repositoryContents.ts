import { ITplAttr } from '../interface';

const propReplacer = ':propName';
const conditionReplacer = ':condition';
const propRegEx = new RegExp(propReplacer, 'g');
const conditionRegEx = new RegExp(conditionReplacer, 'g');
const booleanCondition = `[true, false].indexOf(${propReplacer}) > -1`;
const destructPropsTpl = `${'\n'}			${propReplacer} = null,`;
const propUpdateTpl = `if (${conditionReplacer}) { entity.${propReplacer} = ${propReplacer}; }${'\n'}		`;
const deleteProcessTpl = 'await Model.deleteOne({ _id: id }).exec();';
const softDeleteProcessTpl = `if (softDelete) {
			entity.deletedAt = true;
			entity = await entity.save();
		} else {
			await Model.deleteOne({ _id: id }).exec();
		}`;

export function destructPropsContent(attrs: ITplAttr[], softDelete: boolean) {
	return attrs.reduce((acc, { attribute = null }, i, arr) => {
		if (attribute) {
			acc += destructPropsTpl.replace(propRegEx, attribute);
		}

		if (softDelete && arr.length === (i + 1)) {
			acc += '\n\t\t\tdeletedAt = null,';
		}

		return acc;
	}, '');
}

export function propUpdateContent(attrs: ITplAttr[], softDelete: boolean) {
	return attrs.reduce((acc, { attribute = null, dataType = null }, i, arr) => {
		if (attribute) {
			const condition = (dataType === 'boolean') ? booleanCondition.replace(propRegEx, attribute) : attribute;

			acc += propUpdateTpl
				.replace(conditionRegEx, condition)
				.replace(propRegEx, attribute);

			if (softDelete && arr.length === (i + 1)) {
				acc += 'if ([true, false].indexOf(deletedAt) > -1) { entity.deletedAt = deletedAt; }';
			}
		}

		return acc;
	}, '');
}

export function softDeleteArgContent(softDelete: boolean): string {
	return (softDelete) ? 'softDelete: boolean = true, ' : '';
}

export function deleteProcessContent(softDelete: boolean): string {
	return (softDelete) ? softDeleteProcessTpl : deleteProcessTpl;
}

export function softDelConditionContent(softDelete: boolean): string {
	return (softDelete) ? ' || entity.deletedAt' : '';
}

export interface IRepositoryContents {
	destructProps: string;
	propUpdate: string;
	softDeleteArg: string;
	deleteProcess: string;
	softDelCondition: string;
}

export function repositoryContents(attrs: ITplAttr[], softDelete: boolean = false): IRepositoryContents {
	const destructProps = destructPropsContent(attrs, softDelete);
	const propUpdate = propUpdateContent(attrs, softDelete);
	const softDeleteArg = softDeleteArgContent(softDelete);
	const deleteProcess = deleteProcessContent(softDelete);
	const softDelCondition = softDelConditionContent(softDelete);

	return { destructProps, propUpdate, softDeleteArg, deleteProcess, softDelCondition };
}
