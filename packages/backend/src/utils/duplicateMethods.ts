import { BearerType } from '../types/bearer.type';
import { AES, enc } from 'crypto-ts';
import process from 'process';
import { ERROR, OK } from './responces';
import { StatusNames } from '../types/responces.type';
import { Request, Response } from 'express';
import { Order } from '@cgs-team-boilerplate/frontend/src/modules/common/types/components.types';

export const handleError = (msg?: string) => {
	throw new Error(msg);
};

export const parseBearer = (bearer: string): BearerType => {
	const splittedBearer = bearer.split('Bearer ')[1];
	return JSON.parse(AES.decrypt(splittedBearer, process.env.JWT_SECRET).toString(enc.Utf8));
};

export const tcMiddleware = async (req: Request, res: Response, method: Function) => {
	try {
		const data = await method(req, res);
		OK(res, {
			status: StatusNames.OK,
			data: data,
		});
	} catch (err: any) {
		ERROR(res, {
			status: StatusNames.Error,
			errorMsg: err.message,
		});
	}
	return;
};

export const sort = <T>(array: T[], orderBy: keyof T, order: Order) => {
	const myOrder: boolean = order === 'ASC';
	return array.sort((a, b) => {
		if (!a[orderBy] || !b[orderBy]) return 0;
		if (typeof a[orderBy] === 'string') {
			if ((a[orderBy] as string).toUpperCase() > (b[orderBy] as string).toUpperCase()) return myOrder ? 1 : -1;
			if ((a[orderBy] as string).toUpperCase() === (b[orderBy] as string).toUpperCase()) return 0;
			return myOrder ? -1 : 1;
		} else {
			if (a[orderBy] > b[orderBy]) return myOrder ? 1 : -1;
			if (a[orderBy] === b[orderBy]) return 0;
			return myOrder ? -1 : 1;
		}
	});
};
