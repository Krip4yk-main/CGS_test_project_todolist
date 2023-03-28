export enum StatusNames {
	OK = 'OK',
	Error = 'Error',
	Unauthorized = 'Unauthorized',
	Authorized = 'Authorized',
}

export interface Responses<T> {
	status: StatusNames;
	data?: T;
	errorMsg?: string;
}
