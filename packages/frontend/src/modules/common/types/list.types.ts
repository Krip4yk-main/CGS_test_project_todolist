import { ITodo } from './entities.types';
import { Order, OrderBy } from './components.types';

export interface IParams {
	dataSource: ITodo[];
	setDataSource: (value: ITodo[]) => any;
	privateChange: (index: number, data: ITodo) => any;
	doneChange: (index: number, data: ITodo) => any;
	viewTodo: (id: number) => any;
	deleteTodo: (index: number, id: number) => any;
	page: number;
	setPage: (value: number) => any;
	pages: number;
}

export interface IParamsPC {
	dataSource: ITodo[];
	setDataSource: (value: ITodo[]) => any;
	privateChange: (index: number, data: ITodo) => any;
	doneChange: (index: number, data: ITodo) => any;
	viewTodo: (id: number) => any;
	deleteTodo: (index: number, id: number) => any;
	page: number;
	setPage: (value: number) => any;
	pages: number;
	orderBy: OrderBy;
	setOrderBy: (value: OrderBy) => any;
	order: Order;
	setOrder: (value: Order) => any;
}
