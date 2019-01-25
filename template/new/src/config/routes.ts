import { Config, Prefix } from '@tne/express-app';

@Config
export class Routes {
	public static base = '/';
	public static apiV1 = '/api/v1/';

	@Prefix('apiV1') public static systemHealth = 'system/health';
}
