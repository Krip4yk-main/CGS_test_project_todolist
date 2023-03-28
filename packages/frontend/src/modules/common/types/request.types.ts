import { Order, OrderBy, TFilter } from './components.types';
import { ITodo } from './entities.types';

export enum StatusNames {
	OK = 'OK',
	Error = 'Error',
	Unauthorized = 'Unauthorized',
}

export interface IAxiosReq<T> {
	data: IReqData<T>;
	status?: number;
	statusText?: string;
}

export interface IReqData<T> {
	status: StatusNames;
	data?: T;
	errorMsg?: string;
}

export interface ITodoReq {
	id?: number;
	userId?: number;
	name?: string;
	details?: string;
	private?: boolean;
	done?: boolean;
	created_at?: Date;
	updated_at?: Date;
}

export interface ITodoReqIndex {
	todoData: ITodoReq;
	index: number;
}

export interface ITodoResIndex {
	res: ITodo | StatusNames.Unauthorized | null;
	index: number;
}

export interface IBearer {
	bearer: string;
	userId: number;
}

export interface IUserReq {
	id?: number;
	email?: string;
	password?: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface ITodoFilteredReq {
	chosenFilter: TFilter;
	search?: string;
	orderBy: OrderBy;
	order: Order;
	limit: number;
	page: number;
}
