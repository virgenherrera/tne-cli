import * as mongoose from 'mongoose';

export function mongooseConnection(getConfig: Function, logger: any = console, mockedMongoUri: string = null): Promise<string> {
	return new Promise((Resolve, Reject) => {
		const appName = getConfig('appName');
		const environment = getConfig('environment');
		const dbHost = getConfig('dbHost');
		const dbName = getConfig('dbName', `${appName}_default`);
		const dbOptions: any = getConfig('dbOptions', {});
		const connectionUri = (mockedMongoUri) ? mockedMongoUri : `${dbHost}/${dbName}`;

		(<any>mongoose).Promise = Promise;

		if (environment !== 'production') {
			mongoose.set('debug', logger);
		}

		// to avoid new version warnings
		mongoose.set('useFindAndModify', false);
		mongoose.set('useCreateIndex', true);
		mongoose.set('useNewUrlParser', true);

		mongoose.connect(connectionUri, dbOptions);

		mongoose.connection.on('error', E => {
			if (E.message.code === 'ETIMEDOUT') {
				logger.warn(E);
				mongoose.connect(connectionUri, dbOptions);
			}

			const { name, message } = E;
			logger.error(`${name}: ${message}`);
			logger.error(`connectionUri: ${connectionUri}`);
			logger.error(`please update your connection settings in /config/${environment}.json file and make your sure your mongodb service is running`);

			return Reject(E);
		});

		mongoose.connection.once('open', () => {
			const message = `Successfully connected to: "${connectionUri}" MongoDB Database`;

			logger.info(message);

			return Resolve(message);
		});
	});
}
