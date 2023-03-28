import React from 'react';
import { Box, Button, Pagination, Switch } from '@mui/material';
import { ActionsSwitch, IDescription, ITitle, MItem } from '../todolist.styled';
import { MainPage } from './phone.styles';
import { BActions, BActionsButtons } from '../todolist.styled';
import { IParams } from '../../../types/list.types';
import { THEME } from '../../../consts/styles.const';

export const PhoneComponent = (props: IParams) => {
	const pagiChange = (_event: any, page: number) => {
		props.setPage(page - 1);
	};

	return (
		<MainPage>
			<Pagination count={props.pages} onChange={pagiChange} />
			{props.dataSource.map((value, index) => {
				return (
					<Box
						key={value.id}
						maxHeight={THEME.height.v250px}
						height={THEME.height.v250px}
						padding={THEME.padding.v16px}
						marginY={THEME.margin.v8px}
						marginLeft={THEME.percentages.v2p}
						width={THEME.percentages.v96p}
						minWidth={THEME.width.v310px}
						boxShadow={3}
					>
						<MItem>
							<ITitle>{value.name}</ITitle>
							<IDescription>{value.details}</IDescription>
							<BActions>
								<BActionsButtons>
									<Button
										color={'primary'}
										variant={'contained'}
										size={'small'}
										onClick={() => props.viewTodo(value.id)}
									>
										View
									</Button>
								</BActionsButtons>
								<BActionsButtons>
									<Button
										color={'primary'}
										variant={'contained'}
										size={'small'}
										onClick={() => props.deleteTodo(index, value.id)}
									>
										Delete
									</Button>
								</BActionsButtons>
								<ActionsSwitch>
									<>isPrivate:</>
									<Switch
										checked={value.private}
										onChange={() => props.privateChange(index, value)}
										size={'small'}
									/>
								</ActionsSwitch>
								<ActionsSwitch>
									<>isDone:</>
									<Switch
										checked={value.done}
										onChange={() => props.doneChange(index, value)}
										size={'small'}
									/>
								</ActionsSwitch>
							</BActions>
						</MItem>
					</Box>
				);
			})}
			<Pagination count={props.pages} onChange={pagiChange} />
		</MainPage>
	);
};
