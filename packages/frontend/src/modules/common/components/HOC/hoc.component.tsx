import React, { useEffect } from 'react';
import { CookieType, getCookie, ROUTER_KEYS } from '../../consts/app-keys.const';
import { useHistory } from 'react-router-dom';

const CookieAUTH = getCookie(CookieType.auth);
export const HocComponent = (props: { child: JSX.Element }) => {
	const history = useHistory();

	useEffect(() => {
		if (!CookieAUTH) history.push(ROUTER_KEYS.ROOT);
	}, []);

	return <>{CookieAUTH && props.child}</>;
};
