import React, { useEffect, useState } from 'react';
import { Body, Header, HSearch, TodoList } from './todolist.styled';
import { Button, ButtonGroup, TextField } from '@mui/material';
import { ITodoFilteredReq, ITodoReq, ITodoReqIndex, StatusNames } from '../../types/request.types';
import { ITodo } from '../../types/entities.types';
import { PcComponent } from './pc';
import { TabletComponent } from './tablet/tablet.component';
import { PhoneComponent } from './phone/phone.component';
import { APP_KEYS } from '../../consts';

import { useHistory } from 'react-router-dom';
import { TodoformComponent } from '../todoforms';
import { IType, Order, OrderBy, TFilter } from '../../types/components.types';
import axiosTodo from '../../utils/axiosClasses/axiosTodo';
import { useMutation } from 'react-query';
import { THEME } from '../../consts/styles.const';

export const TodolistComponent = () => {
	const [dataSource, setDataSource] = useState<ITodo[]>([]);
	const [type, setType] = useState<IType>(IType.INITIAL);
	const [showForm, setShowForm] = useState(false);
	const [chosenFilter, setChosenFilter] = useState<TFilter>('All');
	const [search, setSearch] = useState('');
	const [orderBy, setOrderBy] = useState<OrderBy>('name');
	const [order, setOrder] = useState<Order>('ASC');
	const [limit] = useState(10);
	const [page, setPage] = useState(0);
	const [pages, setPages] = useState(0);

	const mutationFilteredTodo = useMutation((todoData: ITodoFilteredReq) => axiosTodo.getFilteredTodos(todoData), {
		onSuccess: (res) => {
			if (!res) {
				console.error('Empty data');
				return;
			}
			if (res == StatusNames.Unauthorized) {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			setPages(Math.floor(res.size / limit) + 1);
			setDataSource(
				res.result.sort((a, b) => {
					if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
					if (a.name.toUpperCase() === b.name.toUpperCase()) return 0;
					return -1;
				})
			);
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});
	const mutationUpdatePrivateTodo = useMutation((data: ITodoReqIndex) => axiosTodo.updateTodoIndex(data), {
		onSuccess: (res) => {
			if (!res || !res.res) return;
			if (res.res == StatusNames.Unauthorized) {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			const tempData = [...dataSource];
			tempData[res.index].private = res.res.private;
			setDataSource(tempData);
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});
	const mutationUpdateDoneTodo = useMutation((data: ITodoReqIndex) => axiosTodo.updateTodoIndex(data), {
		onSuccess: (res) => {
			if (!res || !res.res) return;
			if (res.res == StatusNames.Unauthorized) {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			const tempData = [...dataSource];
			tempData[res.index].done = res.res.done;
			setDataSource(tempData);
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});
	const mutationDeleteTodo = useMutation((data: ITodoReqIndex) => axiosTodo.deleteTodoIndex(data), {
		onSuccess: (res) => {
			if (!res || !res.res) return;
			if (res.res == StatusNames.Unauthorized) {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			const tempData = [...dataSource];
			setDataSource([...tempData.slice(0, res.index), ...tempData.slice(res.index + 1)]);
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});

	const history = useHistory();

	useEffect(() => {
		const { innerWidth: width } = window;
		if (width > 768) {
			setType(IType.PC);
		} else if (width < 425) {
			setType(IType.PHONE);
		} else setType(IType.TABLET);
	}, []);

	const getFilteredTodos = async (todoData: ITodoFilteredReq) => {
		mutationFilteredTodo.mutate(todoData);
	};

	const privateChange = async (index: number, data: ITodo) => {
		const todoData: ITodoReq = {
			id: data.id,
			private: !data.private,
		};
		mutationUpdatePrivateTodo.mutate({
			todoData,
			index,
		});
	};

	const doneChange = async (index: number, data: ITodo) => {
		const todoData: ITodoReq = {
			id: data.id,
			done: !data.done,
		};
		mutationUpdateDoneTodo.mutate({
			todoData,
			index,
		});
	};

	const viewTodo = (id: number) => {
		history.push(`${APP_KEYS.ROUTER_KEYS.TODOVIEW}?id=${id}`);
	};

	const deleteTodo = async (index: number, id: number) => {
		const todoData: ITodoReq = {
			id: id,
		};
		mutationDeleteTodo.mutate({
			todoData,
			index,
		});
	};

	const addNewItem = (value: ITodo) => {
		setDataSource([value, ...dataSource]);
	};

	useEffect(() => {
		if (
			!chosenFilter ||
			search == undefined ||
			orderBy == undefined ||
			order == undefined ||
			limit == undefined ||
			page == undefined
		)
			return;
		const filterOptions: ITodoFilteredReq = {
			chosenFilter: chosenFilter,
			search: search,
			orderBy: orderBy,
			order: order,
			limit: limit,
			page: page,
		};
		getFilteredTodos(filterOptions);
	}, [search, chosenFilter, orderBy, order, limit, page]);

	return (
		<TodoList>
			{showForm && <TodoformComponent setShowForm={setShowForm} isPC={false} setNewData={addNewItem} />}
			<Header>
				{type !== IType.PC && (
					<Button
						variant={'contained'}
						onClick={() => setShowForm(true)}
						size={'small'}
						style={{ position: `absolute`, top: THEME.top.v8px, left: THEME.left.v8px }}
					>
						Add
					</Button>
				)}
				<ButtonGroup aria-label="outlined button group" size={type == IType.PC ? 'medium' : 'small'}>
					<Button
						variant={chosenFilter == 'All' ? 'contained' : 'outlined'}
						onClick={() => setChosenFilter('All')}
					>
						All
					</Button>
					<Button
						variant={chosenFilter == 'Private' ? 'contained' : 'outlined'}
						onClick={() => setChosenFilter('Private')}
					>
						Private
					</Button>
					<Button
						variant={chosenFilter == 'Public' ? 'contained' : 'outlined'}
						onClick={() => setChosenFilter('Public')}
					>
						Public
					</Button>
					<Button
						variant={chosenFilter == 'Completed' ? 'contained' : 'outlined'}
						onClick={() => setChosenFilter('Completed')}
					>
						Completed
					</Button>
				</ButtonGroup>
				{/* <HButtons>Filter buttons</HButtons> */}
				<HSearch>
					<TextField
						id="outlined-basic"
						label="Search"
						variant="standard"
						onChange={(event) => {
							if (event.target.value.length >= 3) setSearch(event.target.value);
							else {
								if (search.length > 0) setSearch('');
							}
						}}
					/>
				</HSearch>
			</Header>
			<Body>
				{type == IType.PC && (
					<PcComponent
						dataSource={dataSource}
						setDataSource={setDataSource}
						privateChange={privateChange}
						doneChange={doneChange}
						viewTodo={viewTodo}
						deleteTodo={deleteTodo}
						orderBy={orderBy}
						setOrderBy={setOrderBy}
						order={order}
						setOrder={setOrder}
						page={page}
						setPage={setPage}
						pages={pages}
					></PcComponent>
				)}
				{type == IType.TABLET && (
					<TabletComponent
						dataSource={dataSource}
						setDataSource={setDataSource}
						privateChange={privateChange}
						doneChange={doneChange}
						viewTodo={viewTodo}
						deleteTodo={deleteTodo}
						page={page}
						setPage={setPage}
						pages={pages}
					></TabletComponent>
				)}
				{type == IType.PHONE && (
					<PhoneComponent
						dataSource={dataSource}
						setDataSource={setDataSource}
						privateChange={privateChange}
						doneChange={doneChange}
						viewTodo={viewTodo}
						deleteTodo={deleteTodo}
						page={page}
						setPage={setPage}
						pages={pages}
					></PhoneComponent>
				)}
			</Body>
		</TodoList>
	);
};
