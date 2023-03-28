import React, { useEffect, useState } from 'react';
import { Caption, Form, FormButtons, FormPart, RedText, Register } from './register.styled';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../../../common/consts';
import { IRegister } from '../../types/form.types';
import { Button } from '@mui/material';
import { TextField } from '@mui/material/';
import * as yup from 'yup';
import { IUserReq, StatusNames } from '../../types/request.types';
import { CookieType, setCookie } from '../../consts/app-keys.const';
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

export const RegisterComponent = () => {
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

	const mutationRegister = useMutation((values: IUserReq) => axiosUser.register(values), {
		onSuccess: (result) => {
			if (!result || result == StatusNames.Unauthorized) {
				setUnAuth(true);
				return;
			}
			setCookie(CookieType.auth, result.bearer);
			setCookie(CookieType.userId, result.userId.toString());
			main();
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});

	const back = () => {
		history.push(APP_KEYS.ROUTER_KEYS.ROOT);
	};

	const login = () => {
		history.push(APP_KEYS.ROUTER_KEYS.LOGIN);
	};

	const main = async () => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		history.push(APP_KEYS.ROUTER_KEYS.MAIN);
	};

	const submit = async (values: IUserReq) => {
		mutationRegister.mutate(values);
	};

	useEffect(() => {
		document.getElementById('email')?.focus();
	}, []);

	return (
		<Register>
			<Caption>Register</Caption>
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
						Email exist! Try to{' '}
						<span
							style={{ textDecoration: THEME.textDecoration.underline, cursor: THEME.cursor.pointer }}
							onClick={login}
						>
							login
						</span>
					</RedText>
				)}
			</Form>
		</Register>
	);
};
