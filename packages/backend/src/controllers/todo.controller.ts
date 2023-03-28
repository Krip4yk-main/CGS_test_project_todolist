import { Response } from 'express';
import TodoService from '../services/todo.service';
import { ITodo } from '../types/entities.type';
import { ITodoFiltered, ITypedRequest } from '../types/request.type';
import { currentUser } from '../utils/passport';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async findAllByUserId(_req: ITypedRequest<ITodo>, _res: Response) {
		if (!currentUser || !currentUser.id) {
			throw new Error('Missed user');
		}
		return await this.todoService.findAllByUserId(currentUser.id);
	}

	async getFiltered(_req: ITypedRequest<ITodoFiltered>, _res: Response) {
		if (!currentUser || !currentUser.id) {
			throw new Error('Missed user');
		}
		return await this.todoService.getFiltered(_req.body, currentUser.id);
	}

	async findAllPublic(_req: ITypedRequest<ITodo>, _res: Response) {
		if (!currentUser || !currentUser.id) {
			throw new Error('Missed user');
		}
		return await this.todoService.findAllPublic(currentUser.id);
	}

	async getById(req: ITypedRequest<ITodo>, _res: Response) {
		if (!req.body.id) {
			throw new Error('Missed id');
		}
		return await this.todoService.findById(req.body.id);
	}

	async create(req: ITypedRequest<ITodo>, _res: Response) {
		if (!req.body.name || !currentUser || !currentUser.id) {
			throw new Error('Missed name or user');
		}
		req.body.userId = currentUser.id;
		return await this.todoService.create(req.body);
	}

	async delete(req: ITypedRequest<ITodo>, _res: Response) {
		if (!req.body.id) {
			throw new Error('Missed data');
		}
		return await this.todoService.delete(req.body.id);
	}

	async update(req: ITypedRequest<ITodo>, _res: Response) {
		if (
			!req.body.id ||
			!(req.body.name || req.body.details || req.body.private !== undefined || req.body.done !== undefined)
		) {
			throw new Error('Missed data');
		}

		const todoToUpdate = await this.todoService.findById(req.body.id);
		if (!todoToUpdate) {
			throw new Error('Missed todo');
		}

		return await this.todoService.update(req.body, todoToUpdate);
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
