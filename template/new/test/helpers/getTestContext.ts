import { join } from 'path';
import { IAppSettings, ExpressApplication } from '@tne/express-app';

export const appName = 'service_TEST_CTX';
export const config: IAppSettings = {
	appPath: join(__dirname, '../../src'),
	appName,
	urlEncodedOptions: {
		limit: '2mb',
		extended: true
	},
	jsonOptions: {
		limit: '2mb',
		strict: true
	},
	preRouteHooks: [],
	publicFolder: '../public',
	faviconPath: '../public/favicon.ico',
	routesFolder: './handler/rest',
};

export async function getTestContext(): Promise<ExpressApplication> {
	const { getConfig, logger } = await ExpressApplication.construct(config);

	logger.info(`Service "${getConfig('appName')}" has started using "${getConfig('environment')}" environment.`);

	return ExpressApplication.getInstance();
}
