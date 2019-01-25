import * as cli from 'commander';

export function forceOption(): boolean {
	const { force = false } = cli;

	return force;
}
