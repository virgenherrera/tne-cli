import { ExpressApplication, IAppSettings } from '@tne/express-app';
import { postLoader } from './lib/postLoader';

const { name } = require('../package.json');
const maxIncomingReq = '2mb';
const config: IAppSettings = {
	appPath: __dirname,
	appName: name,
	urlEncodedOptions: {
		limit: maxIncomingReq,
		extended: true
	},
	jsonOptions: {
		limit: maxIncomingReq,
		strict: true,
	},
	preRouteHooks: [],
	publicFolder: '../public',
	faviconPath: '../public/favicon.ico',
	routesFolder: './handler/rest',
};

(postLoader)
	(ExpressApplication.construct(config));
