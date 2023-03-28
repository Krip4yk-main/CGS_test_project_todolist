import React from 'react';
import { Body, HButton, Header, MainPage } from './mainPage.styled';
import { TodolistComponent } from '../todolists';
import { CookieType, ROUTER_KEYS, setCookie } from '../../consts/app-keys.const';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

export const MainPageComponent = () => {
	const history = useHistory();

	const logout = () => {
		setCookie(CookieType.auth, '');
		setCookie(CookieType.userId, '');
		history.push(ROUTER_KEYS.ROOT);
	};

	return (
		<MainPage>
			<Header>
				<HButton>
					<Button onClick={logout} size={'small'} color="primary" variant="contained">
						Logout
					</Button>
				</HButton>

				<HButton>
					<Button size={'small'} color="primary" variant="contained">
						Profile
					</Button>
				</HButton>
			</Header>
			<Body>
				<TodolistComponent></TodolistComponent>
			</Body>
		</MainPage>
	);
};
