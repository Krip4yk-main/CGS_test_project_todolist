export interface IUser {
	id: number;
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}

export interface ITodo {
	id: number;
	userId: number;
	name: string;
	details: string;
	private: boolean;
	done: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface IFiltTodo {
	size: number;
	result: ITodo[];
}
