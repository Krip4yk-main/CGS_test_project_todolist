import React, { useEffect, useState } from 'react';
import { ITodoReq, StatusNames } from '../../types/request.types';
import { ITodo } from '../../types/entities.types';
import {
	Action,
	Actions,
	Buttons,
	Description,
	Details,
	DetailsBody,
	MainPage,
	MainPanel,
	Title,
} from './todoview.styled';
import { Button, Switch } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../../../common/consts';
import { TodoformComponent } from '../todoforms';
import { THEME } from '../../consts/styles.const';
import axiosTodo from '../../utils/axiosClasses/axiosTodo';
import { useMutation } from 'react-query';

export const TodoviewComponent = () => {
	const history = useHistory();
	const queryParams = new URLSearchParams(window.location.search);
	const [todoItem, setTodoItem] = useState<ITodo>();
	const [showForm, setShowForm] = useState(false);

	const mutationDeleteTodo = useMutation((todoData: ITodoReq) => axiosTodo.deleteTodo(todoData), {
		onSuccess: (res) => {
			if (!res) return;
			if (res == StatusNames.Unauthorized) {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			back();
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});
	const mutationUpdateTodo = useMutation((todoData: ITodoReq) => axiosTodo.updateTodo(todoData), {
		onSuccess: (res) => {
			if (!res) return;
			if (res == StatusNames.Unauthorized) {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			setTodoItem(res);
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});
	const mutationGetTodoById = useMutation((id: number) => axiosTodo.getById(id), {
		onSuccess: (res) => {
			if (!res) return;
			if (res == StatusNames.Unauthorized) {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			setTodoItem(res);
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});

	useEffect(() => {
		const pId = Number(queryParams.get('id'));
		if (!pId) return;
		mutationGetTodoById.mutate(pId);
	}, []);

	const privateChange = async (data: ITodo) => {
		const todoData: ITodoReq = {
			id: data.id,
			private: !data.private,
		};
		mutationUpdateTodo.mutate(todoData);
	};

	const doneChange = async (data: ITodo) => {
		const todoData: ITodoReq = {
			id: data.id,
			done: !data.done,
		};
		mutationUpdateTodo.mutate(todoData);
	};

	const back = () => {
		history.push(APP_KEYS.ROUTER_KEYS.MAIN);
	};

	const deleteTodo = async (id: number) => {
		const todoData: ITodoReq = {
			id: id,
		};
		mutationDeleteTodo.mutate(todoData);
	};

	return (
		<MainPage>
			{todoItem && showForm && (
				<TodoformComponent
					setShowForm={setShowForm}
					todoItem={todoItem}
					isPC={window.innerWidth > THEME.numbers.PCSize}
					setNewData={setTodoItem}
				/>
			)}
			{todoItem && (
				<MainPanel>
					<Title>Todo {todoItem.name}</Title>
					<Details>
						<Description>Description:</Description>
						<DetailsBody>{todoItem.details}</DetailsBody>
					</Details>
					<Actions>
						<Action>
							<>Private</>
							<Switch checked={todoItem.private} onChange={() => privateChange(todoItem)} />
						</Action>
						<Action>
							<>Completed</>
							<Switch checked={todoItem.done} onChange={() => doneChange(todoItem)} />
						</Action>
					</Actions>
					<Buttons>
						<Button
							color={'primary'}
							variant={'outlined'}
							style={{ minWidth: THEME.width.v100px }}
							onClick={back}
						>
							Back
						</Button>
						<Button
							color={'primary'}
							variant={'contained'}
							style={{ minWidth: THEME.width.v100px }}
							onClick={() => setShowForm(true)}
						>
							Edit
						</Button>
						<Button
							color={'secondary'}
							variant={'contained'}
							style={{ minWidth: THEME.width.v100px }}
							onClick={() => deleteTodo(todoItem.id)}
						>
							Delete
						</Button>
					</Buttons>
				</MainPanel>
			)}
			{!todoItem && <>Missed TODO or ID!</>}
		</MainPage>
	);
};
