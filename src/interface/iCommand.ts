export interface ICommand {
	command: string;
	alias?: string;
	syntax?: string;
	description: string;
	action(...opts: any[]): void;
}
