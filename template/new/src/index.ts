import { ExpressApplication, IAppSettings } from '@tne/express-app';
import { mongooseConnection } from './lib/mongooseConnection';

const { name } = require('../package.json');
const maxIncomingReq = '2mb';
const config: IAppSettings = {
	appPath: __dirname,
	appName: name,
	corsOptions: 'default',
	compressionOptions: 'default',
	urlEncodedOptions: {
		limit: maxIncomingReq,
		extended: true
	},
	jsonOptions: {
		limit: maxIncomingReq,
		strict: true,
	},
	appMiddleware: [],
	publicFolder: '../public',
	faviconPath: '../public/favicon.ico',
	routesFolder: './handler/rest',
};

async function postLoader({ getConfig, logger }: ExpressApplication) {
	logger.info(`trying to connect to MongoDB, using: "../config/${getConfig('environment')}.json"`);

	try {
		await mongooseConnection(getConfig, logger);
		logger.info(`Service "${getConfig('appName')}" has started using "${getConfig('environment')}" environment.`);
		logger.info(`Service started in ${process.uptime()} seconds`);
	} catch (E) {
		process.exit(1);
	}
}

const instance = ExpressApplication.construct(config);
postLoader(instance);
