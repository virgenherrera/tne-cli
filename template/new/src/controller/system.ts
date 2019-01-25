import { ExpressApplication } from '@tne/express-app';
import { SystemHealth } from '../poco/system_health';

/* System Controller Class */
export class SystemController {
	static get instance(): SystemController {
		return new SystemController;
	}

	async showHealth(): Promise<SystemHealth> {
		const { getConfig } = ExpressApplication.instance;
		const environment = getConfig('environment');

		return new SystemHealth(environment);
	}
}
