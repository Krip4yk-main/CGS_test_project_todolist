// Backend Routes
export const BACKEND_KEYS = {
	BASE_URL: `${process.env.REACT_APP_BASE_URL}`,
	USER_API: `${process.env.REACT_APP_BASE_URL}/api/user`,
	TODO_API: `${process.env.REACT_APP_BASE_URL}/api/todo`,
};

export const ROUTER_KEYS = {
	ROOT: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT: '/forgot',
	MAIN: '/main',
	TODOVIEW: '/todoview',
};

const Cookies = require('js-cookie');

export const getCookie = (name: string) => {
	return Cookies.get(name);
};

export const setCookie = (name: string, value: string) => {
	Cookies.set(name, value);
};

export const CookieType = {
	auth: 'Authorization',
	userId: 'userId',
};
