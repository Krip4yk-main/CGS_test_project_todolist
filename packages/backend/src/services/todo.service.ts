import { ITodo } from '../types/entities.type';
import { Todo } from '../entities/todo.entity';
import { FindOperator, Like, Not } from 'typeorm';
import { ITodoFiltered } from '../types/request.type';
import { sort } from '../utils/duplicateMethods';

interface IWhereOptionsTodo {
	userId: number | FindOperator<number>;
	name?: FindOperator<string>;
	details?: FindOperator<string>;
	private?: boolean;
	done?: boolean;
}

export default class TodoService {
	async findById(id: number) {
		const todo = await Todo.findOne({
			where: {
				id: id,
			},
		});
		if (!todo) return todo;
		return this.convertTodoToITodo(todo);
	}

	async findAllByUserId(id: number) {
		const todos = await Todo.find({
			where: {
				userId: id,
			},
		});
		if (!todos) return todos;
		return this.convertTodosToITodos(todos);
	}

	async getFiltered(options: ITodoFiltered, id: number) {
		const result: ITodo[] = [];
		// const order = options.orderBy == 'name' ? { name: options.order } : { details: options.order }; // could be helpful
		const searchOptions: IWhereOptionsTodo[] = [];
		switch (options.chosenFilter) {
			case 'Private': {
				searchOptions.push(...this.isSearch({ userId: id, private: true }, options.search));
				const todos = await Todo.find({
					where: searchOptions,
					// order: order, // could be helpful
				});
				result.push(...this.convertTodosToITodos(todos));
				break;
			}
			case 'Public': {
				searchOptions.push(...this.isSearch({ userId: Not(id), private: false }, options.search));
				const allPublic = await Todo.find({
					where: searchOptions,
					// order: order, // could be helpful
				});
				result.push(...this.convertTodosToITodos(allPublic));
				searchOptions.splice(0);
				searchOptions.push(...this.isSearch({ userId: id, private: false }, options.search));
				const todos = await Todo.find({
					where: searchOptions,
					// order: order, // could be helpful
				});
				result.push(...this.convertTodosToITodos(todos));
				break;
			}
			case 'All': {
				searchOptions.push(...this.isSearch({ userId: Not(id), private: false }, options.search));
				const allPublic = await Todo.find({
					where: searchOptions,
					// order: order, // could be helpful
				});
				result.push(...this.convertTodosToITodos(allPublic));
				searchOptions.splice(0);
				searchOptions.push(...this.isSearch({ userId: id }, options.search));
				const todos = await Todo.find({
					where: searchOptions,
					// order: order, // could be helpful
				});
				result.push(...this.convertTodosToITodos(todos));
				break;
			}
			case 'Completed': {
				searchOptions.push(...this.isSearch({ userId: Not(id), private: false, done: true }, options.search));
				const allPublic = await Todo.find({
					where: searchOptions,
					// order: order, // could be helpful
				});
				result.push(...this.convertTodosToITodos(allPublic));
				searchOptions.splice(0);
				searchOptions.push(...this.isSearch({ userId: id, done: true }, options.search));
				const todos = await Todo.find({
					where: searchOptions,
					// order: order, // could be helpful
				});
				result.push(...this.convertTodosToITodos(todos));
				break;
			}
			default: {
				break;
			}
		}

		const size = result.length;
		const sorted = sort(result, options.orderBy, options.order);
		const res: ITodo[] = sorted.slice(options.page * options.limit, (options.page + 1) * options.limit);
		return {
			size: size,
			result: res,
		};
	}

	async findAllPublic(id: number) {
		const todos = await Todo.find({
			where: {
				private: false,
				userId: Not(id),
			},
		});
		if (!todos) return todos;
		return this.convertTodosToITodos(todos);
	}

	async create(todoData: ITodo) {
		const insertResult = await Todo.insert({
			name: todoData.name,
			details: todoData.details ? todoData.details : undefined,
			userId: todoData.userId,
		});
		if (!insertResult || !insertResult.identifiers[0].id) return null;
		return this.findById(insertResult.identifiers[0].id);
	}

	async delete(id: number) {
		return await Todo.delete({
			id: id,
		});
	}

	async update(todoData: ITodo, todoToUpdate: ITodo) {
		return await Todo.save({
			...todoToUpdate,
			...todoData,
		});
	}

	private convertTodoToITodo(todo: Todo): ITodo {
		const result: ITodo = todo;
		result.userId = JSON.parse(JSON.stringify(todo.userId)).id;
		return result;
	}

	private convertTodosToITodos(todos: Todo[]): ITodo[] {
		const result: ITodo[] = todos;
		result.forEach((value, index) => {
			value.userId = JSON.parse(JSON.stringify(todos[index].userId)).id;
		});
		return result;
	}

	private isSearch(data: IWhereOptionsTodo, search: string | undefined) {
		const searchOptions: IWhereOptionsTodo[] = [];
		if (!search || search.length < 3) {
			searchOptions.push({
				...data,
			});
		} else {
			searchOptions.push({
				...data,
				name: Like(search),
			});
			searchOptions.push({
				...data,
				details: Like(search),
			});
		}
		return searchOptions;
	}
}
