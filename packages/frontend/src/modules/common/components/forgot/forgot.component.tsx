import React, { useState } from 'react';
import { Forgot, Form, FormButtons, FormPart } from './forgot.styled';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../../../common/consts';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IRegister } from '../../types/form.types';
import { IUserReq, StatusNames } from '../../types/request.types';
import { RedText } from '../register/register.styled';
import { THEME } from '../../consts/styles.const';
import axiosUser from '../../utils/axiosClasses/axiosUser';
import { useMutation } from 'react-query';

const validationSchema = yup.object({
	email: yup.string().email('must be a valid email').required('* is a required field'),
	password: yup
		.string()
		.matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'), { message: 'hint: Password1' })
		.required('* is a required field'),
	applyPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must be same')
		.required('* is a required field'),
});

export const ForgotComponent = () => {
	const [unAuth, setUnAuth] = useState(false);
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			applyPassword: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values: IRegister) => {
			submit(values);
		},
	});

	const mutationForgot = useMutation((values: IUserReq) => axiosUser.forgot(values), {
		onSuccess: (result) => {
			if (!result || result == StatusNames.Unauthorized) {
				setUnAuth(true);
				return;
			}
			back();
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});

	const submit = async (values: IUserReq) => {
		mutationForgot.mutate(values);
	};

	const back = () => {
		history.push(APP_KEYS.ROUTER_KEYS.ROOT);
	};

	const register = () => {
		history.push(APP_KEYS.ROUTER_KEYS.REGISTER);
	};

	return (
		<Forgot>
			<Form onSubmit={formik.handleSubmit}>
				<FormPart>
					<TextField
						id={'email'}
						name={'email'}
						label={'Email'}
						type={'email'}
						value={formik.values.email}
						onChange={(event) => {
							setUnAuth(false);
							formik.handleChange(event);
						}}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						size={'medium'}
						placeholder={'jane@acme.com'}
						fullWidth
					/>
				</FormPart>
				<FormPart>
					<TextField
						id={'password'}
						name={'password'}
						label={'Password'}
						type={'password'}
						value={formik.values.password}
						onChange={(event) => {
							setUnAuth(false);
							formik.handleChange(event);
						}}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						size={'medium'}
						fullWidth
					/>
				</FormPart>
				<FormPart>
					<TextField
						id={'applyPassword'}
						name={'applyPassword'}
						label={'Apply Password'}
						type={'password'}
						value={formik.values.applyPassword}
						onChange={formik.handleChange}
						error={formik.touched.applyPassword && Boolean(formik.errors.applyPassword)}
						helperText={formik.touched.applyPassword && formik.errors.applyPassword}
						size={'medium'}
						fullWidth
					/>
				</FormPart>

				<FormButtons>
					<Button color="secondary" variant="outlined" type="button" onClick={back}>
						Cancel
					</Button>
					<Button color="primary" variant="contained" type="submit">
						Submit
					</Button>
				</FormButtons>
				{unAuth && (
					<RedText>
						Missed email! Try to{' '}
						<span
							style={{ textDecoration: THEME.textDecoration.underline, cursor: THEME.cursor.pointer }}
							onClick={register}
						>
							register
						</span>
					</RedText>
				)}
			</Form>
		</Forgot>
	);
};
