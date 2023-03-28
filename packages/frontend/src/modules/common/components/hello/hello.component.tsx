import React from 'react';
import { ButtonContainer, ForgotPass, Hello, HelloBox, HelloCaption } from './hello.styled';
import { useHistory } from 'react-router-dom';
import { APP_KEYS } from '../../../common/consts';
import { Button } from '@mui/material';

export const HelloComponent = () => {
	const history = useHistory();

	const forgot = () => {
		history.push(APP_KEYS.ROUTER_KEYS.FORGOT);
	};

	const login = () => {
		history.push(APP_KEYS.ROUTER_KEYS.LOGIN);
	};

	const register = () => {
		history.push(APP_KEYS.ROUTER_KEYS.REGISTER);
	};

	return (
		<Hello>
			<HelloCaption>Your ToDo App</HelloCaption>
			<HelloBox>
				<ButtonContainer>
					<Button color="primary" variant="contained" fullWidth onClick={login}>
						Log in
					</Button>
				</ButtonContainer>
				<ButtonContainer>
					<Button color="secondary" variant="contained" fullWidth onClick={register}>
						Register
					</Button>
				</ButtonContainer>
				<ForgotPass onClick={forgot}>Forgot password?</ForgotPass>
			</HelloBox>
		</Hello>
	);
};
