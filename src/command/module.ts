import { parse } from 'path';
import { ICommand } from '../interface';
import { DEFAULT_ATTRIBUTES, appRegEx } from '../constant/defaults';
import ColorConsole from '../lib/colorConsole';
import RestHandler from './restHandler';
import Controller from './controller';
import Model from './model';
import Poco from './poco';
import Repository from './repository';
import Validator from './validator';

export default class Module implements ICommand {
	command = 'module';
	alias = 'mod';
	syntax = `${this.command} <name> [attributes]`;
	description = `Create one following files: Controller, Model, Poco, Repository, RestHandler, Validator.`;

	action(nameArg: string, attrsStr = DEFAULT_ATTRIBUTES) {
		const { name } = parse(nameArg);

		if (!appRegEx.moduleName.test(name)) {
			ColorConsole.red(`"${name}" is not a valid module name.`);
			process.exit(1);
		}

		const cCommand = new Controller;
		const mCommand = new Model;
		const pCommand = new Poco;
		const rCommand = new Repository;
		const rhCommand = new RestHandler;
		const vCommand = new Validator;

		cCommand.action(name, attrsStr);
		mCommand.action(name, attrsStr);
		pCommand.action(name, attrsStr);
		rCommand.action(name, attrsStr);
		rhCommand.action(name);
		vCommand.action(name, attrsStr);
	}
}
