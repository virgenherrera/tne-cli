import { ExpressApplication } from '@tne/express-app';
import { mongooseConnection } from './mongooseConnection';

export async function postLoader({ getConfig, logger }: ExpressApplication) {
	logger.info(`trying to connect to MongoDB, using the file's configuration: "../config/${getConfig('environment')}.json"`);

	try {
		await mongooseConnection(getConfig, logger);
	} catch (E) {
		process.exit(1);
	}

	logger.info(`Service "${getConfig('appName')}" has started using "${getConfig('environment')}" environment.`);
}
