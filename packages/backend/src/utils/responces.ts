import * as express from 'express';
import { Responses } from '../types/responces.type';

export const OK = <T>(response: express.Response, data: Responses<T>) => {
	response.statusCode = 200;
	response.send(data);
};

export const ERROR = <T>(response: express.Response, data: Responses<T>) => {
	response.statusCode = 200;
	response.send(data);
};

export const UNAUTHORIZED = <T>(response: express.Response, data: Responses<T>) => {
	response.statusCode = 401;
	response.send(data);
};
