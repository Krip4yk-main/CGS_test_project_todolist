import axios, { AxiosInstance } from 'axios';
import { BACKEND_KEYS, CookieType, getCookie } from '../../consts/app-keys.const';
import {
	IAxiosReq,
	ITodoFilteredReq,
	ITodoReq,
	ITodoReqIndex,
	ITodoResIndex,
	StatusNames,
} from '../../types/request.types';
import { IFiltTodo, ITodo } from '../../types/entities.types';

class AxiosTodo {
	private axiosClient: AxiosInstance;

	constructor() {
		this.axiosClient = axios.create({
			baseURL: BACKEND_KEYS.TODO_API,
			responseType: 'json',
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	public async getById(id: number) {
		const data: ITodoReq = {
			id: id,
		};
		// here could be logic for next tasks
		return this.postCall<ITodoReq, ITodo>('/getById', data);
	}

	public async getFilteredTodos(data: ITodoFilteredReq) {
		// here could be logic for next tasks
		return this.postCall<ITodoFilteredReq, IFiltTodo>('/getFiltered', data);
	}

	public async updateTodo(data: ITodoReq) {
		// here could be logic for next tasks
		return this.postCall<ITodoReq, ITodo>('/update', data);
	}

	public async updateTodoIndex(data: ITodoReqIndex) {
		// here could be logic for next tasks
		const result: ITodoResIndex = {
			res: await this.postCall<ITodoReq, ITodo>('/update', data.todoData),
			index: data.index,
		};
		return result;
	}

	public async deleteTodo(data: ITodoReq) {
		// here could be logic for next tasks
		return this.postCall<ITodoReq, ITodo>('/delete', data);
	}

	public async deleteTodoIndex(data: ITodoReqIndex) {
		// here could be logic for next tasks
		const result: ITodoResIndex = {
			res: await this.postCall<ITodoReq, ITodo>('/delete', data.todoData),
			index: data.index,
		};
		return result;
	}

	public async createTodo(data: ITodoReq) {
		// here could be logic for next tasks
		return this.postCall<ITodoReq, ITodo>('/create', data);
	}

	private async postCall<T, G>(path: string, data: T) {
		try {
			const result: IAxiosReq<G> = await this.axiosClient.post(path, data, {
				headers: { Authorization: getCookie(CookieType.auth) },
			});
			if (!result) return null;
			if (result.status == 401) return StatusNames.Unauthorized;
			if (!result.data || !result.data.data) return null;
			return result.data.data;
		} catch (err: any) {
			if (err.response.status == 401) return StatusNames.Unauthorized;
			console.error(err.message);
			return null;
		}
	}
}

const axiosTodo = new AxiosTodo();
export default axiosTodo;
