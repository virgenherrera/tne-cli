import * as moment from 'moment';

export class SystemHealth {
	public uptime: number = process.uptime();
	public humanUptime: string = moment.duration({ seconds: this.uptime }).humanize();
	public uptimeSince = moment().subtract(this.uptime, 'seconds').format('YYYY/MMMM/DD hh:mm:ss A UTC:ZZ');

	constructor(public environment: string) { }
}
