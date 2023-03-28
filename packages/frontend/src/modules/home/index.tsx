import React, { useEffect } from 'react';
import { HelloComponent } from '../common/components/hello';
import { CookieType, ROUTER_KEYS, setCookie } from '../common/consts/app-keys.const';
import { useHistory } from 'react-router-dom';
import axiosAuth from '../common/utils/axiosClasses/axiosAuth';
import { StatusNames } from '../common/types/request.types';
import { useMutation } from 'react-query';

const HomePageContainer = () => {
	const history = useHistory();
	const mutationBearer = useMutation(() => axiosAuth.bearerAuth(), {
		onSuccess: (res) => {
			if (!res || res == StatusNames.Unauthorized) {
				setCookie(CookieType.auth, '');
				return;
			}
			if (res && typeof res !== 'string' && res.data.data) setCookie(CookieType.userId, res.data.data.toString());
			history.push(ROUTER_KEYS.MAIN);
		},
		onError: (err: any) => {
			console.error(err.message);
		},
	});

	useEffect(() => {
		authCheck();
	}, []);

	const authCheck = async () => {
		mutationBearer.mutate();
	};

	return (
		<div>
			<HelloComponent />
		</div>
	);
};

export default HomePageContainer;
