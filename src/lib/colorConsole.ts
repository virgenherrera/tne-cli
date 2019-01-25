import chalk, { Chalk } from 'chalk';

export default class ColorConsole {
	static get chalk(): Chalk {
		return chalk;
	}

	static reset = (...args: string[]) => args.forEach(a => console.log(chalk.reset(a)));
	static bold = (...args: string[]) => args.forEach(a => console.log(chalk.bold(a)));
	static dim = (...args: string[]) => args.forEach(a => console.log(chalk.dim(a)));
	static italic = (...args: string[]) => args.forEach(a => console.log(chalk.italic(a)));
	static underline = (...args: string[]) => args.forEach(a => console.log(chalk.underline(a)));
	static inverse = (...args: string[]) => args.forEach(a => console.log(chalk.inverse(a)));
	static hidden = (...args: string[]) => args.forEach(a => console.log(chalk.hidden(a)));
	static strikethrough = (...args: string[]) => args.forEach(a => console.log(chalk.strikethrough(a)));
	static visible = (...args: string[]) => args.forEach(a => console.log(chalk.visible(a)));
	static black = (...args: string[]) => args.forEach(a => console.log(chalk.black(a)));
	static red = (...args: string[]) => args.forEach(a => console.log(chalk.red(a)));
	static green = (...args: string[]) => args.forEach(a => console.log(chalk.green(a)));
	static yellow = (...args: string[]) => args.forEach(a => console.log(chalk.yellow(a)));
	static blue = (...args: string[]) => args.forEach(a => console.log(chalk.blue(a)));
	static magenta = (...args: string[]) => args.forEach(a => console.log(chalk.magenta(a)));
	static cyan = (...args: string[]) => args.forEach(a => console.log(chalk.cyan(a)));
	static white = (...args: string[]) => args.forEach(a => console.log(chalk.white(a)));
	static gray = (...args: string[]) => args.forEach(a => console.log(chalk.gray(a)));
	static grey = (...args: string[]) => args.forEach(a => console.log(chalk.grey(a)));
	static blackBright = (...args: string[]) => args.forEach(a => console.log(chalk.blackBright(a)));
	static redBright = (...args: string[]) => args.forEach(a => console.log(chalk.redBright(a)));
	static greenBright = (...args: string[]) => args.forEach(a => console.log(chalk.greenBright(a)));
	static yellowBright = (...args: string[]) => args.forEach(a => console.log(chalk.yellowBright(a)));
	static blueBright = (...args: string[]) => args.forEach(a => console.log(chalk.blueBright(a)));
	static magentaBright = (...args: string[]) => args.forEach(a => console.log(chalk.magentaBright(a)));
	static cyanBright = (...args: string[]) => args.forEach(a => console.log(chalk.cyanBright(a)));
	static whiteBright = (...args: string[]) => args.forEach(a => console.log(chalk.whiteBright(a)));
	static bgBlack = (...args: string[]) => args.forEach(a => console.log(chalk.bgBlack(a)));
	static bgRed = (...args: string[]) => args.forEach(a => console.log(chalk.bgRed(a)));
	static bgGreen = (...args: string[]) => args.forEach(a => console.log(chalk.bgGreen(a)));
	static bgYellow = (...args: string[]) => args.forEach(a => console.log(chalk.bgYellow(a)));
	static bgBlue = (...args: string[]) => args.forEach(a => console.log(chalk.bgBlue(a)));
	static bgMagenta = (...args: string[]) => args.forEach(a => console.log(chalk.bgMagenta(a)));
	static bgCyan = (...args: string[]) => args.forEach(a => console.log(chalk.bgCyan(a)));
	static bgWhite = (...args: string[]) => args.forEach(a => console.log(chalk.bgWhite(a)));
	static bgBlackBright = (...args: string[]) => args.forEach(a => console.log(chalk.bgBlackBright(a)));
	static bgRedBright = (...args: string[]) => args.forEach(a => console.log(chalk.bgRedBright(a)));
	static bgGreenBright = (...args: string[]) => args.forEach(a => console.log(chalk.bgGreenBright(a)));
	static bgYellowBright = (...args: string[]) => args.forEach(a => console.log(chalk.bgYellowBright(a)));
	static bgBlueBright = (...args: string[]) => args.forEach(a => console.log(chalk.bgBlueBright(a)));
	static bgMagentaBright = (...args: string[]) => args.forEach(a => console.log(chalk.bgMagentaBright(a)));
	static bgCyanBright = (...args: string[]) => args.forEach(a => console.log(chalk.bgCyanBright(a)));
	static bgWhiteBright = (...args: string[]) => args.forEach(a => console.log(chalk.bgWhiteBright(a)));
}
