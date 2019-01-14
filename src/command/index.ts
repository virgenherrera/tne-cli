import { Controller } from './controller';
import { ICommand } from '../interface';
import { New } from './new';
import { RestHandler } from './restHandler';

export const commands: ICommand[] = [
	new New,
	new Controller,
	new RestHandler,
];
