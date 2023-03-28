import React, { useEffect, useState } from 'react';
import { Caption, Form, FormButtons, FormPart, Login, RedText } from './login.styled';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../../../common/consts';
import { ILogin } from '../../types/form.types';
import { Button } from '@mui/material';
import { TextField } from '@mui/material/';
import * as yup from 'yup';
import { CookieType, setCookie } from '../../consts/app-keys.const';
import { IUserReq, StatusNames } from '../../types/request.types';
import { THEME } from '../../consts/styles.const';
import axiosUser from '../../utils/axiosClasses/axiosUser';
import { useMutation } from 'react-query';

const validationSchema = yup.object({
	email: yup.string().email('must be a valid email').required('* is a required field'),
	password: yup.string().required('* is a required field'),
});

export const LoginComponent = () => {
	const [unAuth, setUnAuth] = useState(false);
	const history = useHistory();
	const mutationLogin = useMutation((values: IUserReq) => axiosUser.login(values), {
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

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values: ILogin) => {
			submit(values);
		},
	});

	const back = () => {
		history.push(APP_KEYS.ROUTER_KEYS.ROOT);
	};

	const register = () => {
		history.push(APP_KEYS.ROUTER_KEYS.REGISTER);
	};

	const main = async () => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		history.push(APP_KEYS.ROUTER_KEYS.MAIN);
	};

	const submit = async (values: IUserReq) => {
		mutationLogin.mutate(values);
	};

	useEffect(() => {
		document.getElementById('email')?.focus();
	}, []);

	return (
		<Login>
			<Caption>Login</Caption>
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
						Bad credentials! Try to{' '}
						<span
							style={{ textDecoration: THEME.textDecoration.underline, cursor: THEME.cursor.pointer }}
							onClick={register}
						>
							register
						</span>
					</RedText>
				)}
			</Form>
		</Login>
	);
};
