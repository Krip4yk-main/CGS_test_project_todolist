import React from 'react';
import { ActionsSwitch, IDescription, ITitle, MItem } from '../todolist.styled';
import { Box, Button, Switch } from '@mui/material';
import { BActions, BActionsButtons } from '../todolist.styled';
import { IParams } from '../../../types/list.types';
import { MainPage } from './tablet.styles';
import { THEME } from '../../../consts/styles.const';

export const TabletComponent = (props: IParams) => {
	return (
		<MainPage>
			{props.dataSource.map((value, index) => {
				return (
					<Box
						key={value.id}
						maxWidth={THEME.width.v60vw}
						minWidth={THEME.width.v325px}
						maxHeight={THEME.width.v300px}
						height={THEME.height.v300px}
						padding={THEME.padding.v16px}
						marginX={THEME.margin.v8px}
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
		</MainPage>
	);
};
