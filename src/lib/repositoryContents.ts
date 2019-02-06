const deleteProcessTpl = 'await Model.deleteOne({ _id: id }).exec();';
const softDeleteProcessTpl = `if (softDelete) {
			Object.assign(entity, {deletedAt: new Date});
			entity = await entity.save();
		} else {
			await Model.deleteOne({ _id: id }).exec();
		}`;

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
	softDeleteArg: string;
	deleteProcess: string;
	softDelCondition: string;
}

export function repositoryContents(softDelete: boolean = false): IRepositoryContents {
	const softDeleteArg = softDeleteArgContent(softDelete);
	const deleteProcess = deleteProcessContent(softDelete);
	const softDelCondition = softDelConditionContent(softDelete);

	return { softDeleteArg, deleteProcess, softDelCondition };
}
