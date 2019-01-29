import * as cli from 'commander';

export interface ICliOpts {
	force: boolean;
	softDelete: boolean;
}

export function getCliOpts(): ICliOpts {
	const { force = false, softDelete = false } = cli;

	return { force, softDelete };
}
