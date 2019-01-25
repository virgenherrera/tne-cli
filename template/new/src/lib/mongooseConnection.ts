import * as mongoose from 'mongoose';

export function mongooseConnection(getConfig: Function, logger: any = console, mockedMongoUri: string = null): Promise<string> {
	return new Promise((Resolve, Reject) => {
		const environment = getConfig('environment', 'development');
		const mongodbHost = getConfig('mongodbHost');
		const mongodbDb = getConfig('mongodbDb', 'sawappy-api_default');
		const mongodbOptions: any = getConfig('mongodbOptions', { useNewUrlParser: true });
		const connectionUri = (mockedMongoUri) ? mockedMongoUri : `${mongodbHost}/${mongodbDb}`;

		(<any>mongoose).Promise = Promise;

		// to avoid new version warnings
		mongodbOptions.useCreateIndex = true;
		mongodbOptions.useNewUrlParser = true;
		// to avoid new version warnings

		if (environment === 'development') {
			mongoose.set('debug', logger);
		}

		mongoose.connect(connectionUri, mongodbOptions);

		mongoose.connection.on('error', E => {
			if (E.message.code === 'ETIMEDOUT') {
				logger.warn(E);
				mongoose.connect(connectionUri, mongodbOptions);
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
