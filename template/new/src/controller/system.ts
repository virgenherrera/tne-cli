import { ExpressApplication } from '@tne/express-app';
import { SystemHealth } from '../poco/system_health';

export class SystemController {
	async showHealth(): Promise<SystemHealth> {
		const { getConfig } = ExpressApplication.instance;
		const environment = getConfig('environment');

		return new SystemHealth(environment);
	}
}
