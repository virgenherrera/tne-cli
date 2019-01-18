import { ExpressRouter, Endpoint, IRequest, IResponse } from '@tne/express-app';
import { Routes } from '../../config/routes';
import { SystemController } from '../../controller/system';

/* System Rest Handler Class */
@ExpressRouter
export default class SystemRestHandler {
	@Endpoint({
		method: ['GET', 'POST'],
		path: Routes.systemHealth,
		middleware: [],
	})
	static async get_post_system_health(req: IRequest, res: IResponse) {
		try {
			const data = await SystemController.instance.showHealth();
			req.logger.info(`requested System Health for environment: ${data.environment}`);

			return res.successJson('GET', data);
		} catch (E) {
			return res.errorJson(E);
		}
	}
}
