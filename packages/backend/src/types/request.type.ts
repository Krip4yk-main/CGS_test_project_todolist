import { Request } from 'express';

export interface ITypedRequest<T> extends Request {
	body: T;
}

export interface ITypesCheckList {
	email?: string;
	id?: number | string;
	userId?: number | string;
	private?: boolean | string;
	done?: boolean | string;
}

export type TFilter = 'All' | 'Private' | 'Public' | 'Completed';
export type Order = 'ASC' | 'DESC';
export type OrderBy = 'name' | 'details';

export interface ITodoFiltered {
	chosenFilter: TFilter;
	search?: string;
	orderBy: OrderBy;
	order: Order;
	limit: number;
	page: number;
}
