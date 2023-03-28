import React, { useState } from 'react';
import {
	Box,
	Button,
	Pagination,
	Paper,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Tooltip,
	Typography,
} from '@mui/material';
import { BActions, BActionsButtons } from '../todolist.styled';
import { ITodo } from '../../../types/entities.types';
import { visuallyHidden } from '@mui/utils';
import { IParamsPC } from '../../../types/list.types';
import { TodoformComponent } from '../../todoforms';
import { EnhancedTableProps, HeadCell, Order, OrderBy } from '../../../types/components.types';
import { sort } from '../../../utils/duplicateMethods';
import { THEME } from '../../../consts/styles.const';
import { CookieType, getCookie } from '../../../consts/app-keys.const';

const headCells: readonly HeadCell[] = [
	{
		id: 'name',
		label: 'Todo Title',
	},
	{
		id: 'details',
		label: 'Description',
	},
];

const maxItems: number = 8;

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;

	const createSortHandler = (property: OrderBy) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead style={{ backgroundColor: THEME.backgroundColor.grayMask020 }}>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={'left'}
						padding={'normal'}
						sortDirection={orderBy === 'headCell.id' ? (order === 'ASC' ? 'asc' : 'desc') : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === 'headCell.id' ? (order === 'ASC' ? 'asc' : 'desc') : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'DESC' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell key={'actions'} align={'left'} padding={'normal'} width={THEME.width.v100px}>
					Actions
				</TableCell>
			</TableRow>
		</TableHead>
	);
}

export const PcComponent = (props: IParamsPC) => {
	const [showForm, setShowForm] = useState(false);

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: OrderBy) => {
		const isAsc = props.orderBy === property && props.order === 'ASC';
		const newOrder: Order = isAsc ? 'DESC' : 'ASC';
		props.setOrder(newOrder);
		props.setOrderBy(property);
		props.setDataSource(sort(props.dataSource, property, newOrder));
	};

	const addNewItem = (value: ITodo) => {
		props.setDataSource(sort([...props.dataSource, value], props.orderBy as keyof ITodo, props.order));
	};

	const getArr = (values: number): number[] => {
		const arr: number[] = [];
		for (let i = 0; i < values; i++) {
			arr.push(i);
		}
		return arr;
	};

	const pagiChange = (_event: any, page: number) => {
		props.setPage(page - 1);
	};

	return (
		<Box sx={{ width: `${THEME.percentages.v100p}`, height: `${THEME.percentages.v100p}` }}>
			{showForm && <TodoformComponent setShowForm={setShowForm} isPC={true} setNewData={addNewItem} />}
			<Paper sx={{ width: `${THEME.percentages.v100p}`, height: `${THEME.percentages.v100p}`, mb: 2 }}>
				<TableContainer sx={{ width: `${THEME.percentages.v100p}`, height: `${THEME.percentages.v100p}` }}>
					<Table
						sx={{
							height: `${THEME.percentages.v100p}`,
							maxHeight: `${THEME.percentages.v100p}`,
							minHeight: `${THEME.height.v60vh}`,
						}}
						aria-labelledby="tableTitle"
						size={'medium'}
					>
						<EnhancedTableHead
							order={props.order}
							orderBy={props.orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{props.dataSource.map((value, index) => {
								// console.log('value.id');
								// console.log(value.id);
								const labelId = `enhanced-table-checkbox-${value.id}`;

								return (
									<TableRow
										hover
										tabIndex={-1}
										key={value.id}
										style={{
											backgroundColor:
												index % 2 == 0
													? THEME.backgroundColor.grayMask010
													: THEME.backgroundColor.grayMask0,
											minHeight: THEME.height.v71,
											maxHeight: THEME.height.v71,
											height: THEME.height.v71,
										}}
									>
										<TableCell component="th" id={labelId} scope="row" width={'20%'}>
											{value.name}
										</TableCell>
										<TableCell
											scope="row"
											width={THEME.width.auto}
											height={THEME.percentages.v100p}
											style={{ padding: THEME.padding.v8px }}
										>
											<Typography
												style={{
													overflowY: 'scroll',
													height: `${THEME.percentages.v100p}`,
													width: `${THEME.percentages.v100p}`,
													resize: 'none',
												}}
											>
												{value.details}
											</Typography>
										</TableCell>
										<TableCell scope="row" align={'right'} width={THEME.width.v100px}>
											{getCookie(CookieType.userId) == value.userId && (
												<BActions>
													<BActionsButtons>
														<Button
															color="primary"
															variant="contained"
															onClick={() => props.viewTodo(value.id)}
														>
															View
														</Button>
													</BActionsButtons>
													<BActionsButtons>
														<Button
															color="primary"
															variant="contained"
															onClick={() => props.deleteTodo(index, value.id)}
														>
															Delete
														</Button>
													</BActionsButtons>
													<Tooltip
														title={value.private ? 'Private' : 'Public'}
														placement="left"
														style={{ margin: THEME.margin.zero }}
													>
														<Switch
															checked={value.private}
															onChange={() => props.privateChange(index, value)}
														/>
													</Tooltip>
													<Tooltip title={value.done ? 'Done' : 'Undone'} placement="right">
														<Switch
															checked={value.done}
															onChange={() => props.doneChange(index, value)}
														/>
													</Tooltip>
												</BActions>
											)}
										</TableCell>
									</TableRow>
								);
							})}
							{getArr(maxItems - props.dataSource.length).map((value) => {
								return (
									<TableRow
										style={{
											height: THEME.height.v71,
											backgroundColor:
												(props.dataSource.length + value) % 2 == 0
													? THEME.backgroundColor.grayMask010
													: THEME.backgroundColor.grayMask0,
										}}
										key={`ph-${value}`}
									>
										<TableCell colSpan={3} />
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<Pagination count={props.pages} onChange={pagiChange} />
			<Button onClick={() => setShowForm(true)}>Add</Button>
		</Box>
	);
};
