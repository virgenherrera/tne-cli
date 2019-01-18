import { expect, should } from 'chai';
import * as supertest from 'supertest';
import { ExpressApplication } from '@tne/express-app';
import { Routes } from '../../src/config/routes';
import { getTestContext, dropTestLogs } from '../helpers';

should();
describe(`${Routes.systemHealth} endpoints`, () => {
	let request = null;

	before(async () => {
		const { app } = await getTestContext();

		request = await supertest.agent(app);
	});

	after(async () => {
		const { logsPath } = ExpressApplication.instance;
		await ExpressApplication.destruct();

		await dropTestLogs(logsPath);
	});

	it('should return systemHealth stats through POST', async () => {
		const { status, body } = await request.post(Routes.systemHealth);

		expect(status).to.be.equal(200);
		expect(body).to.be.an('object')
			.that.has.keys('success', 'message', 'data');

		expect(body.success).to.be.equal(true);
		expect(body.message).to.be.equal('Resource found');

		const { data } = body;

		expect(data).to.be.an('object')
			.that.has.keys('environment', 'uptime', 'humanUptime', 'uptimeSince');

		expect(data.environment).to.be.a('string');
		expect(data.uptime).to.be.a('number');
		expect(data.humanUptime).to.be.a('string');
		expect(data.uptimeSince).to.be.a('string');
	});

	it('should return systemHealth stats through GET', async () => {
		const { status, body } = await request.get(Routes.systemHealth);

		expect(status).to.be.equal(200);
		expect(body).to.be.an('object')
			.that.has.keys('success', 'message', 'data');

		expect(body.success).to.be.equal(true);
		expect(body.message).to.be.equal('Resource found');

		const { data } = body;

		expect(data).to.be.an('object')
			.that.has.keys('environment', 'uptime', 'humanUptime', 'uptimeSince');
		expect(data.environment).to.be.a('string');
		expect(data.uptime).to.be.a('number');
		expect(data.humanUptime).to.be.a('string');
		expect(data.uptimeSince).to.be.a('string');
	});
});
