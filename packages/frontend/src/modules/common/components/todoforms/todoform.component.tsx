import React from 'react';
import { FButtons, Form, MainForm, MainPanel, Title } from './todoform.styled';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ITodo } from '../../types/entities.types';
import { ITodoReq } from '../../types/request.types';
import { APP_KEYS } from '../../consts';
import { ITodoForm } from '../../types/components.types';
import { THEME } from '../../consts/styles.const';
import axiosTodo from '../../utils/axiosClasses/axiosTodo';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object({
	name: yup.string().required(),
	details: yup.string(),
	private: yup.boolean().required(),
	done: yup.boolean().required(),
});

export const TodoformComponent = (props: {
	setShowForm: (value: boolean) => any;
	setNewData: (value: ITodo) => any;
	todoItem?: ITodo;
	isPC: boolean;
}) => {
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			name: props.todoItem ? props.todoItem.name : '',
			details: props.todoItem ? props.todoItem.details : '',
			private: props.todoItem ? props.todoItem.private : true,
			done: props.todoItem ? props.todoItem.done : false,
		},
		validationSchema: validationSchema,
		onSubmit: (values: ITodoForm) => {
			submit(values);
		},
	});

	const mutationCreateTodo = useMutation((todoData: ITodoReq) => axiosTodo.createTodo(todoData), {
		onSuccess: (res) => {
			if (!res) return;
			if (res == 'Unauthorized') {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			props.setNewData(res);
			back();
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});
	const mutationUpdateTodo = useMutation((todoData: ITodoReq) => axiosTodo.updateTodo(todoData), {
		onSuccess: (res) => {
			if (!res) return;
			if (res == 'Unauthorized') {
				history.push(APP_KEYS.ROUTER_KEYS.ROOT);
				return;
			}
			props.setNewData(res);
			back();
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});

	const back = () => {
		props.setShowForm(false);
	};

	const updateTodo = async (data: ITodoForm) => {
		const todoData: ITodoReq = {
			id: props.todoItem?.id,
			...data,
		};
		mutationUpdateTodo.mutate(todoData);
	};

	const addTodo = async (data: ITodoForm) => {
		const todoData: ITodoReq = data;
		mutationCreateTodo.mutate(todoData);
	};

	const submit = (values: ITodoForm) => {
		if (props.todoItem) {
			updateTodo(values);
		} else {
			addTodo(values);
		}
	};

	return (
		<MainForm onClick={(e: any) => e.stopPropagation()}>
			<MainPanel>
				<Box
					boxShadow={3}
					width={THEME.percentages.v100p}
					height={THEME.percentages.v100p}
					bgcolor={THEME.backgroundColor.white}
					borderRadius={THEME.borderRadius.v5px}
				>
					<Title>
						{props.todoItem ? 'Edit' : 'Add'} Todo{props.todoItem ? ` ${props.todoItem.name}` : ''}
					</Title>
					<Form onSubmit={formik.handleSubmit}>
						<TextField
							id={'name'}
							name={'name'}
							label={'Name'}
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							style={{ margin: THEME.margin.v16px }}
							size={props.isPC ? 'medium' : 'small'}
						/>
						<TextField
							id={'details'}
							name={'details'}
							label={'Details'}
							value={formik.values.details}
							onChange={formik.handleChange}
							error={formik.touched.details && Boolean(formik.errors.details)}
							helperText={formik.touched.details && formik.errors.details}
							style={{ margin: THEME.margin.v16px }}
							size={props.isPC ? 'medium' : 'small'}
						/>
						{!props.todoItem && (
							<>
								<FormControlLabel
									id={'private'}
									name={'private'}
									label={'Private'}
									value={formik.values.private}
									onChange={formik.handleChange}
									control={
										<Checkbox
											size={props.isPC ? 'medium' : 'small'}
											id={'private'}
											name={'private'}
											checked={formik.values.private}
										/>
									}
									style={{ margin: THEME.margin.v8px }}
								/>
								<FormControlLabel
									id={'done'}
									name={'done'}
									label={'Completed'}
									value={formik.values.done}
									onChange={formik.handleChange}
									control={
										<Checkbox
											size={props.isPC ? 'medium' : 'small'}
											id={'done'}
											name={'done'}
											checked={formik.values.done}
										/>
									}
									style={{ margin: THEME.margin.v8px }}
								/>
							</>
						)}
						<FButtons>
							<Button color="secondary" variant="outlined" type="button" onClick={back}>
								Cancel
							</Button>
							<Button color="primary" variant="contained" type="submit">
								Submit
							</Button>
						</FButtons>
					</Form>
				</Box>
			</MainPanel>
		</MainForm>
	);
};
