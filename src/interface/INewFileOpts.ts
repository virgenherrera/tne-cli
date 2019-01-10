import { templateTypes, filePermissions } from '.';

export interface INewFileOpts {
	template: templateTypes;
	path: string;
	data: any;
	overwrite?: boolean;
	fExt?: string;
	fPerms?: filePermissions;
}
