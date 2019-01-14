import { Controller } from './controller';
import { ICommand } from '../interface';
import { New } from './new';

export const commands: ICommand[] = [
	new New,
	new Controller,
];
