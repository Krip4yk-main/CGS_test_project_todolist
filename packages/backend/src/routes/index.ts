import { Application } from 'express';
import * as routes from './api';
import { ERROR, OK } from '../utils/responces';
import { StatusNames } from '../types/responces.type';
import { ITypesCheckList } from '../types/request.type';
import { auth, currentUser } from '../utils/passport';

class AppRouter {
	constructor(private app: Application) {}

	init() {
		this.app.get('/protectedTest', auth, (_req, _res) => {
			console.warn('Success! You are authenticated.');
			OK(_res, { status: StatusNames.OK, data: currentUser?.id });
		});

		this.app.use('*', (req, res, next) => {
			try {
				this.typesCheckMiddleware(req.body);
				next();
			} catch (err: any) {
				ERROR(res, { status: StatusNames.Error, errorMsg: err.message });
			}
		});

		this.app.get('/ping', (_req, res) => {
			res.send('pong');
		});

		Object.values(routes).forEach((value) => {
			this.app.use('/api', value);
		});
	}

	typesCheckMiddleware(body: ITypesCheckList) {
		if (body.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))
			throw new Error('Invalid email');
		if (body.id && typeof body.id != 'number') throw new Error('Invalid id');
		if (body.userId && typeof body.userId != 'number') throw new Error('Invalid userId');
		if (body.private && typeof body.private != 'boolean') throw new Error('Invalid private');
		if (body.done && typeof body.done != 'boolean') throw new Error('Invalid done');
		return;
	}
}

export default AppRouter;
